import { NextResponse } from 'next/server'
import { getAuthenticatedUser, getAuthenticatedClient } from '@/lib/services/AuthService'
import { SchedulingService } from '@/lib/services/SchedulingService'
import { supabaseAdmin } from '@/lib/supabaseAdminClient'

interface RouteParams {
  params: Promise<{ id: string }>
}

/** rota que cancela uma consulta pelo ID */
export async function DELETE(request: Request, { params }: RouteParams) {
  const user = await getAuthenticatedUser()

  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { id } = await params

  /** busca a consulta para verificar o dono e a data */
  const { data: consulta, error: erroConsulta } = await supabaseAdmin
    .from('consultas')
    .select('paciente_id, data_hora')
    .eq('id', id)
    .single()

  if (erroConsulta || !consulta) {
    return NextResponse.json({ error: 'Consulta não encontrada' }, { status: 404 })
  }

  /** garante que só o dono da consulta pode cancelar */
  if (consulta.paciente_id !== user.id) {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
  }

  /** valida antecedência mínima de 24h */
  const agora = new Date()
  const dataConsulta = new Date(consulta.data_hora)
  const diferencaHoras = (dataConsulta.getTime() - agora.getTime()) / (1000 * 60 * 60)

  if (diferencaHoras < 24) {
    return NextResponse.json(
      { error: 'Cancelamento deve ser feito com mínimo de 24h de antecedência' },
      { status: 400 }
    )
  }

  try {
    const supabaseClient = await getAuthenticatedClient()
    const schedulingService = new SchedulingService(supabaseClient)
    await schedulingService.getCancelAppointment(id, consulta.data_hora)

    return NextResponse.json({ success: true, message: 'Consulta cancelada com sucesso' })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro interno'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}