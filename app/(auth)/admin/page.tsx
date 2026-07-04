"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  LogOut,
  ClipboardList,
} from "lucide-react";

interface Agendamento {
  id: string;
  data: string; // formato AAAA-MM-DD, igual ao resto do projeto
  hora: string;
  paciente: string;
  medico: string;
  servico: string;
  status: "confirmada" | "pendente" | "concluída" | "cancelada";
}

// 🔁 Login/sessão de admin ainda não existe, então usamos um objeto fixo
// pra conseguir testar a tela. Trocar quando o back tiver auth de verdade.
const SECRETARIA_TESTE = { nome: "Secretaria", email: "secretaria@teste.com" };

const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function dataParaString(date: Date) {
  return date.toISOString().split("T")[0];
}
function dataDeHoje() {
  return dataParaString(new Date());
}
function calcularDiasDoMes(ano: number, mes: number) {
  const primeiroDia = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();
  return { primeiroDia, totalDias };
}

// 🔁 Mock com agendamentos de TODOS os médicos da clínica (diferente do
// dashboard do paciente, que só mostra as consultas de uma pessoa).
// Substituir por algo tipo: GET /api/appointments?inicio=X&fim=Y
function gerarAgendamentosMock(): Agendamento[] {
  const hoje = new Date();
  const criarData = (offsetDias: number) => {
    const d = new Date(hoje);
    d.setDate(d.getDate() + offsetDias);
    return dataParaString(d);
  };

  return [
    { id: "1", data: criarData(0), hora: "08:00", paciente: "Maria Souza", medico: "Dra. Fernanda Lima", servico: "Fisioterapia Ortopédica", status: "confirmada" },
    { id: "2", data: criarData(0), hora: "09:00", paciente: "João Pereira", medico: "Dr. Carlos Mendes", servico: "Pilates", status: "confirmada" },
    { id: "3", data: criarData(0), hora: "10:00", paciente: "Ana Costa", medico: "Dra. Fernanda Lima", servico: "RPG", status: "pendente" },
    { id: "4", data: criarData(0), hora: "11:00", paciente: "Pedro Alves", medico: "Dr. Carlos Mendes", servico: "Fisioterapia", status: "cancelada" },
    { id: "5", data: criarData(0), hora: "14:30", paciente: "Juliana Ramos", medico: "Dra. Fernanda Lima", servico: "Pilates", status: "confirmada" },
    { id: "6", data: criarData(1), hora: "09:00", paciente: "Lucas Martins", medico: "Dr. Carlos Mendes", servico: "Fisioterapia", status: "pendente" },
    { id: "7", data: criarData(1), hora: "15:00", paciente: "Beatriz Nunes", medico: "Dra. Fernanda Lima", servico: "RPG", status: "confirmada" },
    { id: "8", data: criarData(2), hora: "10:30", paciente: "Rafael Dias", medico: "Dr. Carlos Mendes", servico: "Pilates", status: "confirmada" },
    { id: "9", data: criarData(3), hora: "08:30", paciente: "Camila Torres", medico: "Dra. Fernanda Lima", servico: "Fisioterapia", status: "pendente" },
    { id: "10", data: criarData(5), hora: "13:00", paciente: "Gustavo Lima", medico: "Dr. Carlos Mendes", servico: "RPG", status: "confirmada" },
  ];
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [secretaria, setSecretaria] = useState<{ nome: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Mock parado (useState sem setter) só pra ter dado consistente na tela toda
  const [agendamentos] = useState<Agendamento[]>(gerarAgendamentosMock());

  const agora = new Date();
  const [ano, setAno] = useState(agora.getFullYear());
  const [mes, setMes] = useState(agora.getMonth());
  const [dataSelecionada, setDataSelecionada] = useState<string>(dataDeHoje());
  const [filtroStatus, setFiltroStatus] = useState("todos");

  // Mesma lógica de responsividade usada no dashboard do paciente
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // 🔁 Aqui entraria a checagem real de sessão + se o usuário é admin/secretaria
    setSecretaria(SECRETARIA_TESTE);
    setLoading(false);
  }, [router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmada": return { bg: "#d4edda", color: "#155724", label: "Confirmada" };
      case "pendente": return { bg: "#fff3cd", color: "#856404", label: "Pendente" };
      case "concluída": return { bg: "#cce5ff", color: "#004085", label: "Concluída" };
      case "cancelada": return { bg: "#f8d7da", color: "#721c24", label: "Cancelada" };
      default: return { bg: "#e2e3e5", color: "#383d41", label: status };
    }
  };

  const getSaudacao = () => {
    const hora = new Date().getHours();
    if (hora < 12) return "Bom dia";
    if (hora < 18) return "Boa tarde";
    return "Boa noite";
  };

  // Datas que têm pelo menos 1 agendamento — vira a bolinha no calendário
  const diasComAgendamento = new Set(agendamentos.map((a) => a.data));

  const agendamentosDoDiaSelecionado = agendamentos
    .filter((a) => a.data === dataSelecionada)
    .filter((a) => filtroStatus === "todos" || a.status === filtroStatus)
    .sort((a, b) => a.hora.localeCompare(b.hora));

  const hojeISO = dataDeHoje();
  const agendamentosDeHoje = agendamentos.filter((a) => a.data === hojeISO);
  const totalHoje = agendamentosDeHoje.length;
  const confirmadasHoje = agendamentosDeHoje.filter((a) => a.status === "confirmada").length;
  const pendentesHoje = agendamentosDeHoje.filter((a) => a.status === "pendente").length;
  const canceladasHoje = agendamentosDeHoje.filter((a) => a.status === "cancelada").length;

  function mudarMes(direcao: number) {
    let novoMes = mes + direcao;
    let novoAno = ano;
    if (novoMes < 0) { novoMes = 11; novoAno--; }
    if (novoMes > 11) { novoMes = 0; novoAno++; }
    setMes(novoMes);
    setAno(novoAno);
  }

  const { primeiroDia, totalDias } = calcularDiasDoMes(ano, mes);
  const celulasVazias = Array.from({ length: primeiroDia });
  const dias = Array.from({ length: totalDias }, (_, i) => {
    const d = i + 1;
    const data = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    return {
      d,
      data,
      temAgendamento: diasComAgendamento.has(data),
      selecionado: data === dataSelecionada,
      ehHoje: data === hojeISO,
    };
  });

  const navLinkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 12px",
    borderRadius: "10px",
    textDecoration: "none",
    color: "rgba(255,255,255,0.75)",
    marginBottom: "4px",
    fontSize: "14px",
    transition: "all 0.2s",
  } as const;

  const botaoNavStyle = {
    background: "rgba(255,255,255,0.15)",
    border: "none",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    cursor: "pointer",
    color: "white",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as const;

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F0F7F9"
      }}>
        <div style={{ fontSize: "16px", color: "#2B7A78", fontWeight: 600 }}>
          Carregando...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#F0F7F9",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      fontFamily: "Arial, sans-serif"
    }}>
      {/* SIDEBAR — igual à área do paciente, só muda o rótulo e os links */}
      <aside style={{
        width: isMobile ? "100%" : "240px",
        minHeight: isMobile ? "auto" : "100vh",
        background: "linear-gradient(180deg, #3AAFA9 0%, #2B7A78 100%)",
        padding: "24px 16px",
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        alignItems: isMobile ? "center" : "stretch",
        justifyContent: isMobile ? "space-between" : "flex-start",
        position: isMobile ? "relative" : "sticky",
        top: 0,
        height: isMobile ? "auto" : "100vh",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: isMobile ? 0 : "32px" }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "4px",
            display: "flex",
          }}>
            <Image
              src="/imagens/UnBemEstarLg1.png"
              alt="Logo UnBemEstar"
              width={32}
              height={32}
              style={{ borderRadius: "8px", objectFit: "contain" }}
            />
          </div>
          {!isMobile && (
            <div>
              <h1 style={{ fontSize: "18px", fontWeight: "bold", color: "white", margin: 0 }}>
                Un<span style={{ fontWeight: "900" }}>Bem</span>Estar
              </h1>
              <p style={{ fontSize: "10px", color: "#cbd5e1", letterSpacing: "1px", margin: 0 }}>
                ÁREA DA SECRETARIA
              </p>
            </div>
          )}
        </div>

        {!isMobile && (
          <nav style={{ flex: 1 }}>
            <Link
              href="/admin"
              style={{ ...navLinkStyle, backgroundColor: "rgba(255,255,255,0.15)", color: "white", fontWeight: 600 }}
            >
              <LayoutDashboard size={18} /> Painel Principal
            </Link>


            <Link
              href="/equipe"
              style={navLinkStyle}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
            >
              <Users size={18} /> Equipe
            </Link>
          </nav>
        )}

        <Link
          href="/login"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 12px",
            borderRadius: "10px",
            textDecoration: "none",
            color: "rgba(255,255,255,0.55)",
            borderTop: isMobile ? "none" : "1px solid rgba(255,255,255,0.15)",
            paddingTop: isMobile ? "10px" : "16px",
            fontSize: "14px",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "white"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
        >
          <LogOut size={18} /> {!isMobile && "Sair"}
        </Link>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main style={{ flex: 1, padding: isMobile ? "20px" : "32px 40px", overflowY: "auto" }}>

        {/* Card "Bem-vindo" — mesmo estilo do paciente, mas com contagem de hoje */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: isMobile ? "20px" : "24px 32px",
          marginBottom: "24px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px"
        }}>
          <div>
            <h1 style={{ fontSize: isMobile ? "20px" : "24px", fontWeight: "bold", color: "#2B7A78", margin: 0 }}>
              {getSaudacao()}!
            </h1>
            <p style={{ color: "#718096", fontSize: "14px", margin: "4px 0 0" }}>
              Painel de agendamentos da clínica
            </p>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#e6f7f5",
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "13px",
            color: "#2B7A78",
            fontWeight: 600,
          }}>
            <CalendarDays size={16} /> {totalHoje} agendamentos hoje
          </div>
        </div>

        {/* Calendário + agenda do dia lado a lado (empilha no mobile) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "minmax(320px, 420px) 1fr",
          gap: "24px",
          marginBottom: "32px",
          alignItems: "start",
        }}>

          {/* CALENDÁRIO — adaptado do componente Calendar.tsx que já existe pro
              paciente marcar consulta. Aqui a bolinha embaixo do número não
              indica "horário livre pra agendar", indica "esse dia já tem
              agendamento". Clicar no dia atualiza a lista ao lado. */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "20px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            overflow: "hidden",
          }}>
            <div style={{
              background: "linear-gradient(135deg, #2B7A78 0%, #3AAFA9 100%)",
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <button onClick={() => mudarMes(-1)} aria-label="Mês anterior" style={botaoNavStyle}>‹</button>
              <p style={{ color: "white", fontWeight: "bold", fontSize: "16px", margin: 0 }}>
                {meses[mes]} {ano}
              </p>
              <button onClick={() => mudarMes(1)} aria-label="Próximo mês" style={botaoNavStyle}>›</button>
            </div>

            <div style={{ padding: "20px 24px 24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "8px" }}>
                {diasDaSemana.map((dia) => (
                  <div key={dia} style={{ textAlign: "center", fontSize: "11px", fontWeight: 600, color: "#a0aec0", padding: "4px 0" }}>
                    {dia}
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
                {celulasVazias.map((_, i) => <div key={`vazio-${i}`} />)}
                {dias.map(({ d, data, temAgendamento, selecionado, ehHoje }) => {
                  let bg = "transparent";
                  let cor = "#2d3748";
                  let border = "1px solid transparent";
                  let fontWeight: string | number = "400";

                  if (selecionado) {
                    bg = "#3AAFA9"; cor = "white"; fontWeight = "700"; border = "1px solid #3AAFA9";
                  } else if (ehHoje) {
                    border = "1px solid #3AAFA9"; cor = "#2B7A78"; fontWeight = "600";
                  }

                  return (
                    <button
                      key={data}
                      onClick={() => setDataSelecionada(data)}
                      style={{
                        background: bg,
                        color: cor,
                        border,
                        borderRadius: "10px",
                        padding: "8px 4px",
                        fontSize: "13px",
                        fontWeight,
                        cursor: "pointer",
                        textAlign: "center",
                        lineHeight: 1,
                        transition: "all 0.15s",
                      }}
                    >
                      {d}
                      {temAgendamento && !selecionado && (
                        <span style={{ display: "block", width: "4px", height: "4px", borderRadius: "50%", background: "#3AAFA9", margin: "3px auto 0" }} />
                      )}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: "flex", gap: "16px", marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #f0f4f7", flexWrap: "wrap" }}>
                <ItemLegenda cor="#3AAFA9" label="Tem agendamento" tipo="dot" />
                <ItemLegenda cor="#3AAFA9" label="Selecionado" tipo="fill" />
              </div>
            </div>
          </div>

          {/* AGENDA DO DIA SELECIONADO NO CALENDÁRIO */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            overflow: "hidden",
          }}>
            <div style={{
              padding: "16px 24px",
              borderBottom: "1px solid #e2e8f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}>
              <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "#2B7A78", margin: 0 }}>
                📋 Agenda de {new Date(dataSelecionada + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })}
                {dataSelecionada === hojeISO && " (hoje)"}
              </h2>

              {/* Filtro por status — só front por enquanto, não bate em nenhuma API */}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {[
                  { valor: "todos", label: "Todos" },
                  { valor: "confirmada", label: "Confirmadas" },
                  { valor: "pendente", label: "Pendentes" },
                  { valor: "cancelada", label: "Canceladas" },
                ].map((opcao) => (
                  <button
                    key={opcao.valor}
                    onClick={() => setFiltroStatus(opcao.valor)}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "20px",
                      border: "1px solid #3AAFA9",
                      backgroundColor: filtroStatus === opcao.valor ? "#3AAFA9" : "white",
                      color: filtroStatus === opcao.valor ? "white" : "#3AAFA9",
                      fontSize: "11px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {opcao.label}
                  </button>
                ))}
              </div>
            </div>

            {agendamentosDoDiaSelecionado.length === 0 ? (
              <div style={{ padding: "40px 24px", textAlign: "center", color: "#718096" }}>
                Nenhum agendamento para esse dia/filtro.
              </div>
            ) : (
              agendamentosDoDiaSelecionado.map((agendamento, index) => {
                const status = getStatusColor(agendamento.status);
                return (
                  <div key={agendamento.id} style={{
                    padding: "14px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: index < agendamentosDoDiaSelecionado.length - 1 ? "1px solid #f0f4f8" : "none",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}>
                    {/* paciente + médico, que era o pedido principal dessa tela */}
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ minWidth: "56px", fontSize: "14px", fontWeight: 700, color: "#2B7A78" }}>
                        {agendamento.hora}
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: "14px", color: "#2d3748", margin: 0 }}>
                          {agendamento.paciente}
                        </p>
                        <p style={{ fontSize: "13px", color: "#718096", margin: "2px 0 0" }}>
                          {agendamento.medico} — {agendamento.servico}
                        </p>
                      </div>
                    </div>
                    <span style={{ backgroundColor: status.bg, color: status.color, padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600 }}>
                      {status.label}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Cards de resumo — sempre do dia de HOJE, independente do dia clicado no calendário */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          {[
            { label: "Hoje", value: totalHoje, color: "#2B7A78" },
            { label: "Confirmadas", value: confirmadasHoje, color: "#155724" },
            { label: "Pendentes", value: pendentesHoje, color: "#856404" },
            { label: "Canceladas", value: canceladasHoje, color: "#721c24" },
          ].map((card) => (
            <div key={card.label} style={{ backgroundColor: "white", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: "26px", fontWeight: "bold", color: card.color }}>{card.value}</div>
              <div style={{ fontSize: "13px", color: "#718096", marginTop: "4px" }}>{card.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "32px", textAlign: "center", fontSize: "12px", color: "#a0aec0", borderTop: "1px solid #e2e8f0", paddingTop: "16px" }}>
          © 2026 UnBemEstar — Todos os direitos reservados
        </div>
      </main>
    </div>
  );
}

function ItemLegenda({ cor, label, tipo }: { cor: string; label: string; tipo: "dot" | "fill" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <div style={{
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        background: tipo === "fill" ? cor : "transparent",
        border: tipo === "dot" ? `2px solid ${cor}` : "none",
      }} />
      <span style={{ fontSize: "11px", color: "#a0aec0" }}>{label}</span>
    </div>
  );
}