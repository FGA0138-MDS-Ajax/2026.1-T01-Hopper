import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { SchedulingService } from "@/lib/services/SchedulingService";
import { NotificationService } from "@/lib/services/NotificationService";

const criarConsultaSchema = z
  .object({
    paciente_id:       z.string().min(1),
    fisioterapeuta_id: z.string().min(1),
    servico_id:        z.string().min(1),
    data_hora:         z.string().datetime(),
    tipo:              z.enum(["presencial", "domiciliar", "online"]),
    primeira_consulta: z.boolean(),
    endereco:          z.string().optional(),
  })
  .refine(
    (data) =>
      data.tipo !== "domiciliar" ||
      (data.endereco && data.endereco.trim().length > 0),
    {
      message: "Endereço é obrigatório para consultas domiciliares",
      path: ["endereco"],
    }
  );

const notificationService = new NotificationService();

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "Token de autenticação não fornecido." },
        { status: 401 }
      );
    }

    const supabaseAuth = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: { Authorization: `Bearer ${token}` },
        },
      }
    );

    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Sessão inválida ou expirada." }, { status: 401 });
    }

    const body = await request.json();
    const parseResult = criarConsultaSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Dados inválidos",
          detalhes: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const input = parseResult.data;

    if (user.id !== input.paciente_id) {
      return NextResponse.json(
        { error: "Você só pode agendar consultas para a sua própria conta." },
        { status: 403 }
      );
    }

    const schedulingService = new SchedulingService(supabaseAuth);

    let reserva;
    try {
      reserva = await schedulingService.criarReservaTemporaria(
        input.fisioterapeuta_id,
        input.paciente_id,
        input.data_hora
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg === "HORARIO_INDISPONIVEL") {
        return NextResponse.json(
          { error: "Horário não está mais disponível. Por favor, escolha outro." },
          { status: 409 }
        );
      }
      throw err;
    }

    let consulta;
    try {
      consulta = await schedulingService.scheduleAppointment(input, reserva.id);
    } catch (error) {
      /* EXTREMA IMPORTÂNCIA: Garante o rollback da reserva caso a inserção da consulta falhe */
      await supabaseAuth.from("reservas_temporarias").delete().eq("id", reserva.id);
      throw error;
    }

    const [{ data: perfil }, { data: fisio }, { data: servico }] =
      await Promise.all([
        supabaseAuth.from("profiles").select("nome, email").eq("id", input.paciente_id).single(),
        supabaseAuth.from("fisioterapeutas").select("nome").eq("id", input.fisioterapeuta_id).single(),
        supabaseAuth.from("servicos").select("nome").eq("id", input.servico_id).single(),
      ]);

    if (perfil && fisio && servico && perfil.email) {
      await notificationService.sendConfirmationEmail({
        ...consulta,
        paciente_nome:       perfil.nome,
        paciente_email:      perfil.email,
        fisioterapeuta_nome: fisio.nome,
        servico_nome:        servico.nome,
      });
    }

    return NextResponse.json(consulta, { status: 201 });

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao criar agendamento:", msg);
    return NextResponse.json(
      { error: "Erro interno ao criar agendamento." },
      { status: 500 }
    );
  }
}