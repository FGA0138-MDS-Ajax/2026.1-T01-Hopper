import { SupabaseClient } from '@supabase/supabase-js'
import { AppointmentRepository } from '../repositories/AppointmentRepository'

/** serviço responsável pelas regras de negócios dos agendamentos */
export class SchedulingService {
  private repository: AppointmentRepository

  constructor(supabaseClient: SupabaseClient) {
    this.repository = new AppointmentRepository(supabaseClient)
  }

  /** busca horários disponíveis de um fisioterapeuta por data */
  async getAvailableSlots(fisioterapeutaId: string, data: string) {
    return await this.repository.findAvailableSlots(fisioterapeutaId, data)
  }

  /** cria um novo agendamento aplicando as regras de negócios */
  async scheduleAppointment(appointment: {
    paciente_id: string
    fisioterapeuta_id: string
    servico_id: string
    data_hora: string
    tipo: string
    primeira_consulta: boolean
  }) {
    return await this.repository.createAppointment(appointment)
  }

  /** busca o historico de consultas do paciente */
  async getPatientHistory(pacienteId: string) {
    return await this.repository.findAppointmentsByPatient(pacienteId)
  }

  /** cancela uma consulta respeitando a regra de 24h de antecedência */
  async getCancelAppointment(consultaId: string, dataConsulta: string) {
    const agora = new Date()
    const consulta = new Date(dataConsulta)

    /** calcula a diferença em horas -- milissegundos para horas (1000ms * 60s * 60min) */
    const diferencaHoras = (consulta.getTime() - agora.getTime()) / (1000 * 60 * 60)

    if (diferencaHoras < 24) {
      throw new Error('Cancelamento deve ser feito com mínimo de 24h de antecedência!')
    }

    return await this.repository.cancelAppointment(consultaId)
  }
}