import { AppointmentRepository } from '../../../../lib/repositories/AppointmentRepository'
import { NotificationService } from '../../../../lib/services/NotificationService'

const repository = new AppointmentRepository()
const notificationService = new NotificationService()

/**
 * Calcula a janela [início, fim) do dia seguinte em ISO string.
 *
 * TODO: confirmar timezone de `data_hora` no Supabase (lacuna 3). Esta janela
 * é calculada em UTC; se as consultas forem armazenadas em horário local sem
 * timezone, ajustar para evitar consultas perdidas/duplicadas nas bordas.
 */
function getTomorrowWindow(): { start: string; end: string } {
  const now = new Date()

  const start = new Date(now)
  start.setUTCDate(start.getUTCDate() + 1)
  start.setUTCHours(0, 0, 0, 0)

  const end = new Date(start)
  end.setUTCDate(end.getUTCDate() + 1)

  return { start: start.toISOString(), end: end.toISOString() }
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ message: 'Não autorizado' }, { status: 401 })
  }

  try {
    const { start, end } = getTomorrowWindow()

    // busca as consultas de amanhã ainda ativas, já com paciente/profissional/serviço
    const consultas = await repository.findUpcomingForReminder(start, end)

    // dispara um lembrete por consulta; envios individuais não lançam, então
    // um e-mail ruim não derruba o lote inteiro
    const resultados = await Promise.all(
      consultas.map((consulta) => {
        const email = consulta.paciente?.email

        // sem e-mail do paciente não há como notificar — registra como falha
        if (!email) {
          return Promise.resolve({
            to: '(sem e-mail)',
            success: false,
            error: `Consulta ${consulta.id} sem e-mail de paciente`,
          })
        }

        return notificationService.sendAppointmentReminder({
          to: email,
          pacienteNome: consulta.paciente?.nome ?? 'Paciente',
          dataHora: consulta.data_hora,
          profissionalNome: consulta.fisioterapeuta?.nome ?? 'Profissional',
          servicoNome: consulta.servico?.nome ?? undefined,
        })
      })
    )

    const enviados = resultados.filter((r) => r.success).length
    const falhas = resultados.filter((r) => !r.success)

    if (falhas.length > 0) {
      console.error('Cron lembretes — falhas de envio:', falhas)
    }

    return Response.json({
      message: 'Cron de lembretes executado com sucesso',
      total: consultas.length,
      enviados,
      falhas: falhas.length,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido'
    console.error('Cron lembretes — erro:', message)
    return Response.json(
      { message: 'Erro ao executar cron de lembretes', error: message },
      { status: 500 }
    )
  }
}
