import { Resend } from "resend";
import { Consulta } from "../../types";

const resend = new Resend(process.env.RESEND_API_KEY);

/** serviço responsável pelo envio de notificações por e-mail */
export class NotificationService {

  /**
   * Envia e-mail de confirmação de agendamento ao paciente (RF07)
   */
  async sendConfirmationEmail(
    consulta: Consulta & {
      paciente_nome: string;
      paciente_email: string;
      fisioterapeuta_nome: string;
      servico_nome: string;
    }
  ) {
    const dataFormatada = new Date(consulta.data_hora).toLocaleString("pt-BR", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "America/Sao_Paulo",
    });

    const { error } = await resend.emails.send({
      from: "UnBemEstar <noreply@unbemestar.com>",
      to: consulta.paciente_email,
      subject: `✅ Consulta confirmada — ${dataFormatada}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #1a7a4a;">Consulta confirmada!</h2>
          <p>Olá, <strong>${consulta.paciente_nome}</strong>. Seu agendamento foi realizado com sucesso.</p>
          <div style="background: #f0faf4; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #1a7a4a;">
            <p style="margin: 4px 0;"><strong>📅 Data e hora:</strong> ${dataFormatada}</p>
            <p style="margin: 4px 0;"><strong>👨‍⚕️ Profissional:</strong> ${consulta.fisioterapeuta_nome}</p>
            <p style="margin: 4px 0;"><strong>💆 Serviço:</strong> ${consulta.servico_nome}</p>
            <p style="margin: 4px 0;"><strong>📍 Tipo:</strong> ${consulta.tipo}</p>
            ${consulta.endereco ? `<p style="margin: 4px 0;"><strong>🏠 Endereço:</strong> ${consulta.endereco}</p>` : ""}
          </div>
          <p>Caso precise cancelar ou remarcar, acesse a plataforma com antecedência.</p>
          <p style="color: #888; font-size: 12px; margin-top: 24px;">UnBemEstar — Clínica de Fisioterapia</p>
        </div>
      `,
    });

    if (error) {
      console.error("Erro ao enviar e-mail de confirmação:", error.message);
    }
  }

  /**
   * Envia lembrete de consulta 24h antes (chamado pelo cron — RF07)
   */
  async enviarLembrete(dados: {
    emailPaciente: string;
    nomePaciente: string;
    nomeFisioterapeuta: string;
    dataHora: string;
  }) {
    const dataFormatada = new Date(dados.dataHora).toLocaleString("pt-BR", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "America/Sao_Paulo",
    });

    const { error } = await resend.emails.send({
      from: "UnBemEstar <noreply@unbemestar.com>",
      to: dados.emailPaciente,
      subject: `Lembrete: sua consulta é amanhã — ${dataFormatada}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #1a7a4a;">Olá, ${dados.nomePaciente}!</h2>
          <p>Este é um lembrete da sua consulta marcada para:</p>
          <div style="background: #f0faf4; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #1a7a4a;">
            <p style="margin: 4px 0;"><strong>📅 Data e hora:</strong> ${dataFormatada}</p>
            <p style="margin: 4px 0;"><strong>👨‍⚕️ Profissional:</strong> ${dados.nomeFisioterapeuta}</p>
          </div>
          <p>Caso precise cancelar ou remarcar, acesse a plataforma com antecedência.</p>
          <p style="color: #888; font-size: 12px; margin-top: 24px;">UnBemEstar — Clínica de Fisioterapia</p>
        </div>
      `,
    });

    if (error) throw new Error(`Erro ao enviar lembrete: ${error.message}`);
  }
}