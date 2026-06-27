import { Resend } from 'resend'
import {
  APPOINTMENT_REMINDER_SUBJECT,
  buildAppointmentReminderHtml,
  type AppointmentReminderData,
} from '../emails/appointmentReminderTemplate'

/** parâmetros da primitiva de envio de e-mail */
export interface SendEmailParams {
  to: string
  subject: string
  html: string
}

/** resultado de um envio individual — nunca lança, sempre retorna o status */
export interface SendResult {
  to: string
  success: boolean
  /** id retornado pelo Resend em caso de sucesso */
  id?: string
  /** mensagem de erro em caso de falha */
  error?: string
}

const resendApiKey = process.env.RESEND_API_KEY!
const emailFrom = process.env.EMAIL_FROM!

/**
 * Serviço responsável pelo envio de notificações por e-mail (RF07).
 *
 * É um wrapper fino sobre o Resend e é agnóstico de cron: expõe uma primitiva
 * genérica (`sendEmail`) e helpers de alto nível por tipo de notificação
 * (`sendAppointmentReminder`).
 */
export class NotificationService {
  private readonly apiKey: string
  private readonly from: string
  /**
   * Cliente Resend criado de forma lazy: instanciar `new Resend()` no construtor
   * faria o `next build` lançar "Missing API key" ao importar o route (que cria
   * o service no topo do módulo) sem as variáveis de ambiente. A key só é
   * necessária em runtime, quando um e-mail é de fato enviado.
   */
  private resend: Resend | null = null

  constructor(apiKey: string = resendApiKey, from: string = emailFrom) {
    this.apiKey = apiKey
    this.from = from
  }

  private getResend(): Resend {
    if (!this.resend) {
      this.resend = new Resend(this.apiKey)
    }
    return this.resend
  }

  /**
   * Primitiva base de envio de e-mail. Não lança em falha de envio individual:
   * retorna um `SendResult` para que um e-mail ruim não derrube um lote inteiro.
   */
  async sendEmail({ to, subject, html }: SendEmailParams): Promise<SendResult> {
    try {
      const { data, error } = await this.getResend().emails.send({
        from: this.from,
        to,
        subject,
        html,
      })

      if (error) {
        return { to, success: false, error: error.message }
      }

      return { to, success: true, id: data?.id }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido ao enviar e-mail'
      return { to, success: false, error: message }
    }
  }

  /**
   * Monta e envia o lembrete de consulta para um paciente.
   * Reaproveita `sendEmail`, então também não lança em falha individual.
   */
  async sendAppointmentReminder(
    params: { to: string } & AppointmentReminderData
  ): Promise<SendResult> {
    const { to, ...reminderData } = params

    return this.sendEmail({
      to,
      subject: APPOINTMENT_REMINDER_SUBJECT,
      html: buildAppointmentReminderHtml(reminderData),
    })
  }
}
