import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthenticatedUser, getAuthenticatedClient } from "@/lib/services/AuthService";
import { SchedulingService } from "@/lib/services/SchedulingService";

const criarConsultaSchema = z.object({
  fisioterapeuta_id: z.string().min(1),
  servico_id: z.string().min(1),
  data_hora: z.string(),
  tipo: z.enum(["presencial", "domiciliar"]),
  primeira_consulta: z.boolean(),
  endereco: z.string().optional(),
})

export async function POST(request: Request) {
  console.log("DEBUG - POST /api/appointments chamado")

  const user = await getAuthenticatedUser()
  console.log("DEBUG - user:", user)

  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
  }

  try {
    const body = await request.json()
    console.log("DEBUG - body recebido:", body)

    const parseResult = criarConsultaSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Dados inválidos", detalhes: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const input = parseResult.data
    const supabaseClient = await getAuthenticatedClient()
    const schedulingService = new SchedulingService(supabaseClient)

    const consulta = await schedulingService.scheduleAppointment({
      paciente_id: user.id,
      fisioterapeuta_id: input.fisioterapeuta_id,
      servico_id: input.servico_id,
      data_hora: input.data_hora,
      tipo: input.tipo,
      primeira_consulta: input.primeira_consulta,
    })

    return NextResponse.json(consulta, { status: 201 })

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Erro desconhecido"
    console.error("Erro ao criar agendamento:", msg)
    return NextResponse.json(
      { error: "Erro interno ao criar agendamento." },
      { status: 500 }
    )
  }
}