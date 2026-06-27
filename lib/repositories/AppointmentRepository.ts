import { getSupabaseClient } from '../supabaseClient'
import { getSupabaseAdmin } from '../supabaseAdmin'

export class AppointmentRepository {

    /** busca horários disponíveis de um fisioterapeuta por data */
  async findAvailableSlots(fisioterapeutaId: string, data: string) {
    const { data: slots, error } = await getSupabaseClient()
      .from('horarios_disponiveis')
      .select('*')
      .eq('fisioterapeuta_id', fisioterapeutaId)
      .eq('data', data)

    if (error) throw new Error(error.message)
    return slots
  }

    /** esse irá criar um novo agendamento de consulta no banco de dados */
  async createAppointment(appointment: {
    paciente_id: string
    fisioterapeuta_id: string
    servico_id: string
    data_hora: string
    tipo: string
    primeira_consulta: boolean
  }) {
    const { data, error } = await getSupabaseClient()
      .from('consultas')
      .insert(appointment)
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  }

    /** busca todas as consultas de um paciente */
  async findAppointmentsByPatient(pacienteId: string) {
    const { data, error } = await getSupabaseClient()
      .from('consultas')
      .select('*')
      .eq('paciente_id', pacienteId)
      .order('data_hora', { ascending: false })

    if (error) throw new Error(error.message)
    return data
  }


  /** cancela uma consulta pelo id do paciente */
  async cancelAppointment(consultaId: string) {
    const { data, error } = await getSupabaseClient()
      .from('consultas')
      .update({ status: 'cancelada' })
      .eq('id', consultaId)
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  }

  /**
   * cancela em lote as reservas temporárias que expiraram (criadas antes de
   * `limite`, sem confirmação). UPDATE atômico — não busca-depois-cancela —
   * e retorna as linhas afetadas para log. usa o client service-role porque
   * roda no cron, sem usuário logado.
   */
  async cancelExpiredReservations(limite: string) {
    const { data, error } = await getSupabaseAdmin()
      .from('consultas')
      .update({ status: 'cancelada' })
      // TODO: confirmar no Supabase o status que representa a reserva temporária ('reservada'? 'pendente'? default do insert?)
      .eq('status', 'reservada')
      // TODO: confirmar no Supabase o nome da coluna de timestamp de criação/expiração da reserva ('created_at'? 'reservado_em'?)
      .lt('created_at', limite)
      .select()

    if (error) throw new Error(error.message)
    return data
  }
}