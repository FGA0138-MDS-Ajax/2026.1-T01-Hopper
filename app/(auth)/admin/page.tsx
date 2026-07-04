"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, CalendarDays, Users, LogOut, RefreshCw } from "lucide-react";

// Paleta baseada na landing page do UnBemEstar
const cores = {
  tealEscuro: "#123832",
  tealTexto: "#1F5F55",
  tealAcento: "#2BA89D",
  mintClaro: "#EAF7F4",
  fundoPagina: "#F7FBFA",
  cinzaTexto: "#5B6B68",
  cinzaClaro: "#E4EEEC",
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [secretaria, setSecretaria] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [visao, setVisao] = useState<"dia" | "semana">("dia");

  // Mock local dos agendamentos da clínica.
  // TODO (back): trocar por chamada real à API quando a rota estiver pronta
  // e criar o arquivo lib/agendamentos.ts com as funções de acesso aos dados.
  const hojeISO = new Date().toISOString().slice(0, 10);

  const gerarDataRelativa = (offsetDias: number) => {
    const data = new Date();
    data.setDate(data.getDate() + offsetDias);
    return data.toISOString().slice(0, 10);
  };

  const [agendamentos] = useState([
    { id: 1, data: hojeISO, hora: "08:00", paciente: "Maria Souza", medico: "Dra. Fernanda Lima", status: "confirmada" },
    { id: 2, data: hojeISO, hora: "09:00", paciente: "João Pereira", medico: "Dr. Carlos Mendes", status: "confirmada" },
    { id: 3, data: hojeISO, hora: "10:00", paciente: "Ana Costa", medico: "Dra. Fernanda Lima", status: "pendente" },
    { id: 4, data: hojeISO, hora: "11:00", paciente: "Pedro Alves", medico: "Dr. Carlos Mendes", status: "cancelada" },
    { id: 5, data: hojeISO, hora: "14:30", paciente: "Juliana Ramos", medico: "Dra. Fernanda Lima", status: "confirmada" },
    { id: 6, data: gerarDataRelativa(1), hora: "09:00", paciente: "Lucas Martins", medico: "Dr. Carlos Mendes", status: "pendente" },
    { id: 7, data: gerarDataRelativa(1), hora: "15:00", paciente: "Beatriz Nunes", medico: "Dra. Fernanda Lima", status: "confirmada" },
    { id: 8, data: gerarDataRelativa(2), hora: "10:30", paciente: "Rafael Dias", medico: "Dr. Carlos Mendes", status: "confirmada" },
    { id: 9, data: gerarDataRelativa(3), hora: "08:30", paciente: "Camila Torres", medico: "Dra. Fernanda Lima", status: "pendente" },
    { id: 10, data: gerarDataRelativa(4), hora: "13:00", paciente: "Gustavo Lima", medico: "Dr. Carlos Mendes", status: "confirmada" },
  ]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // TODO: validar sessão real da secretaria quando o backend estiver pronto
        setSecretaria({ nome: "Secretaria" });
        setLoading(false);
      } catch (error) {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmada": return { bg: "#DCF3EC", color: "#1F7A5C", label: "Confirmada" };
      case "pendente": return { bg: "#FBF0DA", color: "#9A6B14", label: "Pendente" };
      case "concluída": return { bg: "#E4EEFB", color: "#2A5FA5", label: "Concluída" };
      case "cancelada": return { bg: "#FBE4E4", color: "#B23A3A", label: "Cancelada" };
      default: return { bg: "#EEEEEE", color: "#666666", label: status };
    }
  };

  const agendamentosDoDia = agendamentos.filter((item) => item.data === hojeISO);

  const diasDaSemana = Array.from({ length: 7 }, (_, i) => gerarDataRelativa(i));
  const agendamentosDaSemana = diasDaSemana.map((data) => ({
    data,
    itens: agendamentos.filter((item) => item.data === data),
  }));

  const aplicarFiltro = (lista: typeof agendamentos) =>
    filtroStatus === "todos" ? lista : lista.filter((item) => item.status === filtroStatus);

  const totalConfirmadas = agendamentosDoDia.filter((item) => item.status === "confirmada").length;
  const totalPendentes = agendamentosDoDia.filter((item) => item.status === "pendente").length;
  const totalCanceladas = agendamentosDoDia.filter((item) => item.status === "cancelada").length;

  const formatarData = (dataISO: string) =>
    new Date(dataISO + "T00:00:00").toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "short",
    });

  const hojeExtenso = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: cores.fundoPagina,
        fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif"
      }}>
        <div style={{ fontSize: "16px", color: cores.tealTexto }}>Carregando...</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: cores.fundoPagina,
      fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif"
    }}>
      {/* NAVBAR */}
      <header style={{
        backgroundColor: "white",
        borderBottom: `1px solid ${cores.cinzaClaro}`,
        padding: "16px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "34px",
            height: "34px",
            borderRadius: "10px",
            backgroundColor: cores.tealEscuro,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <LayoutDashboard size={18} color="white" />
          </div>
          <span style={{ fontSize: "18px", fontWeight: 700, color: cores.tealEscuro }}>
            Un<span style={{ fontWeight: 900 }}>Bem</span>Estar
          </span>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Link href="/admin" style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 16px",
            borderRadius: "999px",
            textDecoration: "none",
            backgroundColor: cores.mintClaro,
            color: cores.tealTexto,
            fontSize: "14px",
            fontWeight: 600
          }}>
            <LayoutDashboard size={16} /> Painel
          </Link>
          <Link href="/admin/agendamentos" style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 16px",
            borderRadius: "999px",
            textDecoration: "none",
            color: cores.cinzaTexto,
            fontSize: "14px",
            fontWeight: 500
          }}>
            <CalendarDays size={16} /> Agendamentos
          </Link>
          <Link href="/admin/equipe" style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 16px",
            borderRadius: "999px",
            textDecoration: "none",
            color: cores.cinzaTexto,
            fontSize: "14px",
            fontWeight: 500
          }}>
            <Users size={16} /> Equipe
          </Link>
        </nav>

        <Link href="/login" style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 18px",
          borderRadius: "999px",
          textDecoration: "none",
          border: `1px solid ${cores.tealAcento}`,
          color: cores.tealTexto,
          fontSize: "14px",
          fontWeight: 600
        }}>
          <LogOut size={16} /> Sair
        </Link>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main style={{ padding: "32px 40px" }}>
        <div style={{
          marginBottom: "28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "16px"
        }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: cores.tealEscuro, margin: 0 }}>
              Olá, {secretaria?.nome} 👋
            </h1>
            <p style={{ color: cores.cinzaTexto, fontSize: "14px", margin: "4px 0 0", textTransform: "capitalize" }}>
              {hojeExtenso}
            </p>
          </div>

          {/* Toggle Dia / Semana */}
          <div style={{
            display: "flex",
            backgroundColor: "white",
            border: `1px solid ${cores.cinzaClaro}`,
            borderRadius: "999px",
            padding: "4px"
          }}>
            {[
              { valor: "dia", label: "Hoje" },
              { valor: "semana", label: "Semana" },
            ].map((opcao) => (
              <button
                key={opcao.valor}
                onClick={() => setVisao(opcao.valor as "dia" | "semana")}
                style={{
                  padding: "8px 20px",
                  borderRadius: "999px",
                  border: "none",
                  backgroundColor: visao === opcao.valor ? cores.tealEscuro : "transparent",
                  color: visao === opcao.valor ? "white" : cores.cinzaTexto,
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                {opcao.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards de resumo (sempre referentes ao dia de hoje) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginBottom: "28px"
        }}>
          {[
            { label: "Hoje", value: String(agendamentosDoDia.length), color: cores.tealEscuro },
            { label: "Confirmadas", value: String(totalConfirmadas), color: "#1F7A5C" },
            { label: "Pendentes", value: String(totalPendentes), color: "#9A6B14" },
            { label: "Canceladas", value: String(totalCanceladas), color: "#B23A3A" },
          ].map((card) => (
            <div key={card.label} style={{
              backgroundColor: cores.mintClaro,
              borderRadius: "18px",
              padding: "20px 22px",
            }}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: card.color }}>
                {card.value}
              </div>
              <div style={{ fontSize: "13px", color: cores.cinzaTexto, marginTop: "4px" }}>{card.label}</div>
            </div>
          ))}
        </div>

        {/* Filtros de status */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
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
                padding: "6px 16px",
                borderRadius: "999px",
                border: `1px solid ${cores.tealAcento}`,
                backgroundColor: filtroStatus === opcao.valor ? cores.tealAcento : "white",
                color: filtroStatus === opcao.valor ? "white" : cores.tealAcento,
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              {opcao.label}
            </button>
          ))}
        </div>

        {/* VISÃO DIA */}
        {visao === "dia" && (
          <div style={{
            backgroundColor: "white",
            borderRadius: "20px",
            border: `1px solid ${cores.cinzaClaro}`,
            overflow: "hidden"
          }}>
            {aplicarFiltro(agendamentosDoDia).length === 0 ? (
              <div style={{ padding: "40px 24px", textAlign: "center", color: cores.cinzaTexto }}>
                Nenhum agendamento encontrado para esse filtro.
              </div>
            ) : (
              aplicarFiltro(agendamentosDoDia).map((agendamento, index, lista) => {
                const status = getStatusColor(agendamento.status);
                return (
                  <div key={agendamento.id} style={{
                    padding: "16px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: index < lista.length - 1 ? `1px solid ${cores.cinzaClaro}` : "none",
                    flexWrap: "wrap",
                    gap: "8px"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                      <div style={{ minWidth: "56px", fontSize: "14px", fontWeight: 700, color: cores.tealEscuro }}>
                        {agendamento.hora}
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: "14px", color: "#2d3748", margin: 0 }}>
                          {agendamento.paciente}
                        </p>
                        <p style={{ fontSize: "13px", color: cores.cinzaTexto, margin: "2px 0 0" }}>
                          {agendamento.medico}
                        </p>
                      </div>
                    </div>
                    <span style={{
                      backgroundColor: status.bg,
                      color: status.color,
                      padding: "4px 14px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: 600
                    }}>
                      {status.label}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* VISÃO SEMANA */}
        {visao === "semana" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {agendamentosDaSemana.map((dia) => {
              const itensFiltrados = aplicarFiltro(dia.itens);
              return (
                <div key={dia.data} style={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  border: `1px solid ${cores.cinzaClaro}`,
                  overflow: "hidden"
                }}>
                  <div style={{
                    padding: "12px 24px",
                    backgroundColor: cores.mintClaro,
                    fontSize: "13px",
                    fontWeight: 700,
                    color: cores.tealTexto,
                    textTransform: "capitalize"
                  }}>
                    {formatarData(dia.data)} {dia.data === hojeISO ? "· Hoje" : ""}
                  </div>

                  {itensFiltrados.length === 0 ? (
                    <div style={{ padding: "20px 24px", color: cores.cinzaTexto, fontSize: "13px" }}>
                      Nenhum agendamento.
                    </div>
                  ) : (
                    itensFiltrados.map((agendamento, index) => {
                      const status = getStatusColor(agendamento.status);
                      return (
                        <div key={agendamento.id} style={{
                          padding: "14px 24px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderTop: `1px solid ${cores.cinzaClaro}`,
                          flexWrap: "wrap",
                          gap: "8px"
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                            <div style={{ minWidth: "56px", fontSize: "14px", fontWeight: 700, color: cores.tealEscuro }}>
                              {agendamento.hora}
                            </div>
                            <div>
                              <p style={{ fontWeight: 600, fontSize: "14px", color: "#2d3748", margin: 0 }}>
                                {agendamento.paciente}
                              </p>
                              <p style={{ fontSize: "13px", color: cores.cinzaTexto, margin: "2px 0 0" }}>
                                {agendamento.medico}
                              </p>
                            </div>
                          </div>
                          <span style={{
                            backgroundColor: status.bg,
                            color: status.color,
                            padding: "4px 14px",
                            borderRadius: "999px",
                            fontSize: "12px",
                            fontWeight: 600
                          }}>
                            {status.label}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div style={{
          marginTop: "32px",
          textAlign: "center",
          fontSize: "12px",
          color: "#a0aec0"
        }}>
          © 2026 UnBemEstar — Todos os direitos reservados
        </div>
      </main>
    </div>
  );
}