"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Users } from "lucide-react";

const equipe = [
  {
    nome: "Dra. Ana Souza",
    especialidade: "Ortopedia · Esportes",
    foto: "/imagens/equipe/ana-souza.png",
  },
  {
    nome: "Dr. Carlos Lima",
    especialidade: "Neurologia · Reabilitação",
    foto: "/imagens/equipe/carlos-lima.png",
  },
  {
    nome: "Dra. Marina Costa",
    especialidade: "Respiratória · UTI",
    foto: "/imagens/equipe/marina-costa.png",
  },
  {
    nome: "Dra. Julia Ferreira",
    especialidade: "Pilates · Ortopedia",
    foto: "/imagens/equipe/julia-ferreira.png",
  },
  {
    nome: "Dr. Roberto Alves",
    especialidade: "RPG · Postura",
    foto: "/imagens/equipe/roberto-alves.png",
  },
  {
    nome: "Dra. Patricia Nunes",
    especialidade: "Acupuntura · Esportes",
    foto: "/imagens/equipe/patricia-nunes.png",
  },
];

export default function ContributorsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      {/* Header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: scrolled ? "white" : "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
          boxShadow: scrolled ? "0 2px 10px rgba(0,0,0,0.08)" : "none",
          transition: "all 0.3s ease",
          zIndex: 1000,
          padding: "16px 32px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  padding: "2px",
                  display: "flex",
                  boxShadow: scrolled ? "none" : "0 1px 4px rgba(0,0,0,0.08)",
                }}
              >
                <Image
                  src="/imagens/UnBemEstarLg1.png"
                  alt="Logo UnBemEstar"
                  width={32}
                  height={32}
                  style={{ borderRadius: "8px", objectFit: "contain" }}
                />
              </div>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#2B7A78",
                }}
              >
                Un<span style={{ fontWeight: "900" }}>Bem</span>Estar
              </span>
            </div>
          </Link>

          <nav
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {!isMobile && (
              <>
                <Link
                  href="/#home"
                  style={{
                    textDecoration: "none",
                    color: "#4a4a4a",
                    fontSize: "14px",
                  }}
                >
                  Início
                </Link>
                <Link
                  href="/#about"
                  style={{
                    textDecoration: "none",
                    color: "#4a4a4a",
                    fontSize: "14px",
                  }}
                >
                  Sobre
                </Link>
                <Link
                  href="/#features"
                  style={{
                    textDecoration: "none",
                    color: "#4a4a4a",
                    fontSize: "14px",
                  }}
                >
                  Funcionalidades
                </Link>
              </>
            )}

            <Link href="/contributors">
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#2B7A78",
                  color: "white",
                  border: "2px solid #2B7A78",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Users size={14} /> Time
              </button>
            </Link>

            {!isMobile && (
              <Link
                href="/login"
                style={{
                  textDecoration: "none",
                  color: "#4a4a4a",
                  fontSize: "14px",
                }}
              >
                Entrar
              </Link>
            )}

            <Link href="/register">
              <button
                style={{
                  padding: "10px 24px",
                  backgroundColor: "#2B7A78",
                  color: "white",
                  border: "none",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "14px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#3AAFA9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#2B7A78";
                }}
              >
                Cadastrar
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Seção Hero do Time */}
      <section
        style={{
          backgroundColor: "#e6f7f5",
          padding: isMobile ? "140px 24px 64px" : "160px 6% 80px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "#2B7A78",
              color: "white",
              padding: "6px 18px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "28px",
            }}
          >
            Conheça o time
          </span>

          <h1
            style={{
              fontSize: isMobile ? "34px" : "52px",
              color: "#2B7A78",
              fontWeight: 700,
              lineHeight: "1.15",
              marginBottom: "24px",
              maxWidth: "700px",
            }}
          >
            O coração do nosso serviço
          </h1>

          <p
            style={{
              color: "#3f6664",
              fontSize: "16px",
              lineHeight: "1.7",
              maxWidth: "620px",
              marginBottom: "64px",
            }}
          >
            Por trás de cada agendamento automatizado, existe um ser humano
            focado na sua reabilitação. Nosso corpo clínico é composto por
            fisioterapeutas criteriosamente validados, de especializações
            diversas e registro ativo. Livres do caos das marcações manuais,
            eles dedicam sua energia ao que realmente importa: a sua evolução
            terapêutica.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "32px",
            }}
          >
            {equipe.map((membro) => (
              <div key={membro.nome}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1 / 1",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 8px 24px rgba(43,122,120,0.15)",
                    marginBottom: "20px",
                  }}
                >
                  <Image
                    src={membro.foto}
                    alt={membro.nome}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3
                  style={{
                    color: "#2B7A78",
                    fontSize: "19px",
                    fontWeight: 700,
                    marginBottom: "4px",
                  }}
                >
                  {membro.nome}
                </h3>
                <p
                  style={{
                    color: "#3f6664",
                    fontSize: "14px",
                  }}
                >
                  {membro.especialidade}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer
        style={{
          backgroundColor: "#2B7A78",
          color: "white",
          padding: "48px 32px",
          textAlign: "center",
        }}
      >
        <p>&copy; 2026 UnBemEstar — Todos os direitos reservados</p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            marginTop: "16px",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/contributors"
            style={{
              color: "#cbd5e1",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            🌟 Conheça o time
          </Link>
          <Link
            href="/login"
            style={{
              color: "#cbd5e1",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Entrar
          </Link>
          <Link
            href="/register"
            style={{
              color: "#cbd5e1",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Cadastrar
          </Link>
        </div>

        <p
          style={{
            marginTop: "16px",
            fontSize: "14px",
            color: "#cbd5e1",
          }}
        >
          Desenvolvido por alunos da UnB — MDS 2026.1
        </p>
      </footer>
    </div>
  );
}
