import { SupabaseClient } from '@supabase/supabase-js'
import { supabaseAdmin } from '../supabaseAdmin'

/** consulta futura, já com os dados de paciente/profissional/serviço resolvidos */
export interface UpcomingAppointmentForReminder {
  id: string
  data_hora: string
  status: string
  paciente: { nome: string | null; email: string | null } | null
  fisioterapeuta: { nome: string | null } | null
  servico: { nome: string | null } | null
}

  

/** Repositório responsável pelas operações de agendamento no banco de dados */
export class AppointmentRepository {
  private supabase: SupabaseClient

  constructor(supabaseClient: SupabaseClient) {
    this.supabase = supabaseClient
  }

  /** busca horários disponíveis de um fisioterapeuta por data */
  async findAvailableSlots(fisioterapeutaId: string, data: string) {
    const { data: slots, error } = await this.supabase
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
    const { data, error } = await this.supabase
      .from('consultas')
      .insert(appointment)
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  }

  /** busca todas as consultas de um paciente, com dados do fisioterapeuta e serviço */
  
  
  
  async findAppointmentsByPatient(pacienteId: string) {
    const { data, error } = await this.supabase
      .from('consultas')
      .select(`
        id,
        data_hora,
        tipo,
        status,
        primeira_consulta,
        fisioterapeutas ( nome, crefito ),
        servicos ( nome )
      `)
      .eq('paciente_id', pacienteId)
      .order('data_hora', { ascending: false })

    if (error) throw new Error(error.message)
    return data
  }

  /** busca consultas numa janela de tempo para lembretes (RF07) */
  async findUpcomingForReminder(
    start: string,
    end: string
  ): Promise<UpcomingAppointmentForReminder[]> {
    const { data, error } = await supabaseAdmin
      .from('consultas')
      .select(`
        id,
        data_hora,
        status,
        paciente:profiles!consultas_paciente_id_fkey ( nome, email ),
        fisioterapeuta:profiles!consultas_fisioterapeuta_id_fkey ( nome ),
        servico:servicos ( nome )
      `)
      .gte('data_hora', start)
      .lt('data_hora', end)
      .neq('status', 'cancelada')
      .order('data_hora', { ascending: true })

    if (error) throw new Error(error.message)
    return (data ?? []) as unknown as UpcomingAppointmentForReminder[]
  }

  /** cancela uma consulta pelo ID */
  async cancelAppointment(consultaId: string) {
    const { data, error } = await this.supabase
      .from('consultas')
      .update({ status: 'cancelada' })
      .eq('id', consultaId)
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  }

  /** cancela reservas temporárias expiradas em lote */
  async cancelExpiredReservations(limite: string) {
    const { data, error } = await supabaseAdmin
      .from('consultas')
      .update({ status: 'cancelada' })
      .eq('status', 'reservada')
      .lt('created_at', limite)
      .select()

    if (error) throw new Error(error.message)
    return data
  }
}