import { supabase } from '../supabaseClient'
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

  /** busca todas as consultas de um paciente, com dados do fisioterapeuta e serviço */
  async findAppointmentsByPatient(pacienteId: string) {
    const { data, error } = await getSupabaseClient()
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


  /**
   * Busca consultas dentro de uma janela de tempo (ex.: o dia de amanhã) que
   * ainda estão ativas, já trazendo os dados de paciente, profissional e serviço
   * para o e-mail de lembrete (RF07).
   *
   * Usa o client `supabaseAdmin` (service-role) porque roda em um cron, sem
   * usuário logado — a anon key seria bloqueada por RLS.
   *
   * @param start ISO string — início da janela (inclusivo)
   * @param end   ISO string — fim da janela (exclusivo)
   */
  async findUpcomingForReminder(
    start: string,
    end: string
  ): Promise<UpcomingAppointmentForReminder[]> {
    // TODO: confirmar no Supabase (lacuna 1) os relacionamentos abaixo:
    //  - paciente/fisioterapeuta apontam para `profiles` via FKs distintas; o hint
    //    `profiles!<constraint>` precisa do nome real da FK para o Supabase
    //    desambiguar as duas junções na mesma tabela.
    //  - existência e nome da tabela `servicos` e da coluna `nome`.
    // TODO: confirmar (lacuna 2) o valor de status "ativo" — aqui filtramos por
    //   "diferente de cancelada"; se houver outros status finais (ex.: 'concluida'),
    //   trocar por `.eq('status', '<ativo>')`.
    // TODO: confirmar (lacuna 3) tipo/timezone de `data_hora` para a comparação
    //   de janela funcionar como esperado.
    const { data, error } = await supabaseAdmin
      .from('consultas')
      .select(
        `
        id,
        data_hora,
        status,
        paciente:profiles!consultas_paciente_id_fkey ( nome, email ),
        fisioterapeuta:profiles!consultas_fisioterapeuta_id_fkey ( nome ),
        servico:servicos ( nome )
      `
      )
      .gte('data_hora', start)
      .lt('data_hora', end)
      .neq('status', 'cancelada')
      .order('data_hora', { ascending: true })

    if (error) throw new Error(error.message)
    return (data ?? []) as unknown as UpcomingAppointmentForReminder[]
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