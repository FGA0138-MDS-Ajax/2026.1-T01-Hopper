/** dados necessários para montar o e-mail de lembrete de consulta */
export interface AppointmentReminderData {
  pacienteNome: string
  /** data/hora da consulta — ISO string vinda da coluna `data_hora` */
  dataHora: string
  profissionalNome: string
  servicoNome?: string
}

/** formata uma data ISO para o padrão pt-BR (ex.: "27 de junho de 2026 às 14:30") */
function formatarDataHora(dataHora: string): string {
  const data = new Date(dataHora)

  // TODO: confirmar no Supabase o tipo/timezone real de `data_hora` (lacuna 3).
  // Se a coluna for `timestamptz`, o `Date` já vem em UTC e o timeZone abaixo
  // ajusta para o horário de Brasília. Se for um timestamp "naive", revisar.
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(data)
}

/** monta o HTML do lembrete de consulta */
export function buildAppointmentReminderHtml(data: AppointmentReminderData): string {
  const { pacienteNome, dataHora, profissionalNome, servicoNome } = data
  const dataFormatada = formatarDataHora(dataHora)

  const linhaServico = servicoNome
    ? `<p style="margin: 0 0 8px;"><strong>Serviço:</strong> ${servicoNome}</p>`
    : ''

  return `<!DOCTYPE html>
<html lang="pt-BR">
  <body style="margin: 0; padding: 24px; background-color: #f4f4f5; font-family: Arial, Helvetica, sans-serif; color: #18181b;">
    <table role="presentation" width="100%" style="max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 32px;">
      <tr>
        <td>
          <h1 style="font-size: 20px; margin: 0 0 16px;">Lembrete de consulta</h1>
          <p style="margin: 0 0 16px;">Olá, ${pacienteNome}!</p>
          <p style="margin: 0 0 16px;">Este é um lembrete da sua consulta agendada:</p>
          <div style="background: #f4f4f5; border-radius: 6px; padding: 16px; margin: 0 0 16px;">
            <p style="margin: 0 0 8px;"><strong>Data:</strong> ${dataFormatada}</p>
            <p style="margin: 0 0 8px;"><strong>Profissional:</strong> ${profissionalNome}</p>
            ${linhaServico}
          </div>
          <p style="margin: 0; font-size: 13px; color: #71717a;">
            Caso precise remarcar ou cancelar, lembre-se de fazê-lo com no mínimo 24h de antecedência.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

/** assunto padrão do e-mail de lembrete */
export const APPOINTMENT_REMINDER_SUBJECT = 'Lembrete: você tem uma consulta amanhã'
