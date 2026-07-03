export type TipoConsulta = 'presencial' | 'domiciliar' | 'online'
export type StatusConsulta = 'agendada' | 'cancelada' | 'realizada' | 'reservada'

export interface Consulta {
  id: string
  paciente_id: string
  fisioterapeuta_id: string
  servico_id: string
  data_hora: string
  tipo: TipoConsulta
  status: StatusConsulta
  primeira_consulta: boolean
  endereco?: string
  created_at: string
}

export interface CriarConsultaInput {
  paciente_id: string
  fisioterapeuta_id: string
  servico_id: string
  data_hora: string
  tipo: TipoConsulta
  primeira_consulta: boolean
  endereco?: string
}