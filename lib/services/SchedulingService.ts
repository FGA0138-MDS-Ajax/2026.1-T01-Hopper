import { SupabaseClient } from "@supabase/supabase-js";
import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { CriarConsultaInput, Consulta } from "../../types";

/** serviço responsável pelas regras de negócios dos agendamentos */
export class SchedulingService {
  private supabase: SupabaseClient;
  private repository: AppointmentRepository;

  constructor(supabaseClient: SupabaseClient) {
    this.supabase = supabaseClient;
    this.repository = new AppointmentRepository(supabaseClient);
  }

  /** busca horários disponíveis de um fisioterapeuta por data */
  async getAvailableSlots(fisioterapeutaId: string, data: string) {
    return await this.repository.findAvailableSlots(fisioterapeutaId, data);
  }

  /** busca o historico de consultas do paciente */
  async getPatientHistory(pacienteId: string) {
    return await this.repository.findAppointmentsByPatient(pacienteId);
  }

  /** cancela uma consulta respeitando a regra de 24h de antecedência */
  async getCancelAppointment(consultaId: string, dataConsulta: string) {
    const agora = new Date();
    const consulta = new Date(dataConsulta);
    const diferencaHoras =
      (consulta.getTime() - agora.getTime()) / (1000 * 60 * 60);

    if (diferencaHoras < 24) {
      throw new Error("Cancelamento deve ser feito com mínimo de 24h de antecedência!");
    }

    return await this.repository.cancelAppointment(consultaId);
  }

  /**
   * Cria uma reserva temporária de 5 minutos (RF16)
   * Impede que dois pacientes agendem o mesmo horário ao mesmo tempo
   */
  async criarReservaTemporaria(
    fisioterapeutaId: string,
    pacienteId: string,
    dataHora: string
  ) {
    // Expira reservas antigas antes de checar disponibilidade
    await this.supabase
      .from("reservas_temporarias")
      .update({ status: "expirada" })
      .eq("fisioterapeuta_id", fisioterapeutaId)
      .eq("data_hora", dataHora)
      .eq("status", "ativa")
      .lt("created_at", new Date(Date.now() - 5 * 60 * 1000).toISOString());

    // Verifica se ainda há reserva ativa para esse horário
    const { data: reservaExistente } = await this.supabase
      .from("reservas_temporarias")
      .select("id")
      .eq("fisioterapeuta_id", fisioterapeutaId)
      .eq("data_hora", dataHora)
      .eq("status", "ativa")
      .single();

    if (reservaExistente) {
      throw new Error("HORARIO_INDISPONIVEL");
    }

    const { data, error } = await this.supabase
      .from("reservas_temporarias")
      .insert({
        fisioterapeuta_id: fisioterapeutaId,
        paciente_id: pacienteId,
        data_hora: dataHora,
        status: "ativa",
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async scheduleAppointment(
    input: CriarConsultaInput,
    reservaId: string
  ): Promise<Consulta> {
    // Cria a consulta
    const consulta = await this.repository.createAppointment({
      paciente_id: input.paciente_id,
      fisioterapeuta_id: input.fisioterapeuta_id,
      servico_id: input.servico_id,
      data_hora: input.data_hora,
      tipo: input.tipo,
      primeira_consulta: input.primeira_consulta,
    });

    // Marca o horário como indisponível
    const dataHora = new Date(input.data_hora);
    const data = dataHora.toISOString().split("T")[0];
    const hora = dataHora.toTimeString().slice(0, 5);

    await this.supabase
      .from("horarios_disponiveis")
      .update({ disponivel: false })
      .eq("fisioterapeuta_id", input.fisioterapeuta_id)
      .eq("data", data)
      .eq("hora", hora);

    // Confirma a reserva temporária
    await this.supabase
      .from("reservas_temporarias")
      .update({ status: "confirmada" })
      .eq("id", reservaId);

    return consulta as Consulta;
  }
}