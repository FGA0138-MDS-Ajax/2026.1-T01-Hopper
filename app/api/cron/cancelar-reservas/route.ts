import { AppointmentRepository } from '../../../../lib/repositories/AppointmentRepository'

/** janela de expiração: reservas sem confirmação há mais de 5 minutos */
const EXPIRACAO_MS = 5 * 60 * 1000

const repository = new AppointmentRepository()

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ message: 'Não autorizado' }, { status: 401 })
  }

  try {
    const limite = new Date(Date.now() - EXPIRACAO_MS).toISOString()
    const canceladas = await repository.cancelExpiredReservations(limite)

    return Response.json({
      message: 'Cron de cancelamento executado com sucesso',
      canceladas: canceladas?.length ?? 0,
      ids: canceladas?.map((c) => c.id) ?? [],
    })
  } catch (error) {
    const mensagem = error instanceof Error ? error.message : 'Erro desconhecido'
    return Response.json(
      { message: 'Falha ao cancelar reservas', error: mensagem },
      { status: 500 }
    )
  }
}
