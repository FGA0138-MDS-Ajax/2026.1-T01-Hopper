"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  FileText,
  Mail,
  Users,
  ArrowRight,
  Star,
} from "lucide-react";

function useFadeInOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export default function HomePage() {
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
                <a
                  href="#home"
                  style={{
                    textDecoration: "none",
                    color: "#4a4a4a",
                    fontSize: "14px",
                  }}
                >
                  Início
                </a>
                <a
                  href="#about"
                  style={{
                    textDecoration: "none",
                    color: "#4a4a4a",
                    fontSize: "14px",
                  }}
                >
                  Sobre
                </a>
                <a
                  href="#features"
                  style={{
                    textDecoration: "none",
                    color: "#4a4a4a",
                    fontSize: "14px",
                  }}
                >
                  Funcionalidades
                </a>
              </>
            )}

            <Link href="/contributors">
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "transparent",
                  color: "#2B7A78",
                  border: "2px solid #2B7A78",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "500",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2B7A78";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#2B7A78";
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

      {/* Seção Principal (Hero) com layout no estilo da imagem */}
      <section
        id="home"
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: isMobile ? "120px 20px 40px" : "100px 6% 40px",
          overflow: "hidden",
          backgroundColor: "#f0f7f9", // Cor de fallback caso a imagem demore a carregar
        }}
      >
        {/* Espaço para a sua Imagem de Fundo em Tela Cheia */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        >
          <Image
            src="/imagens/hero-fisio.png" // Substitua pelo caminho da sua nova imagem de fundo
            alt="Atendimento de fisioterapia"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center 5%" }}
          />
          {/* Película sutil para garantir que o menu superior fique legível se a imagem for muito clara/escura */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>

        {/* Card Flutuante à Esquerda */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: isMobile ? "100%" : "480px",
            backgroundColor: "#e6f7f5", // Mantida a cor original da UnBemEstar
            borderRadius: "36px",
            padding: isMobile ? "32px 24px" : "56px 48px",
            boxShadow: "0 20px 40px rgba(43,122,120,0.15)",
          }}
        >
          <h1
            style={{
              fontSize: isMobile ? "32px" : "44px",
              color: "#2B7A78",
              marginBottom: "20px",
              lineHeight: "1.15",
              fontWeight: 700,
            }}
          >
            Cuidando de você com dedicação e carinho
          </h1>
          <p
            style={{
              fontSize: isMobile ? "15px" : "16px",
              color: "#3f6664",
              marginBottom: "36px",
              lineHeight: "1.6",
            }}
          >
            Agende sua consulta de forma simples e rápida. Atendimento
            presencial ou domiciliar, com profissionais especializados.
          </p>

          <Link href="/register" style={{ textDecoration: "none" }}>
            <button
              style={{
                padding: "14px 32px",
                backgroundColor: "transparent",
                color: "#2B7A78",
                border: "1.5px solid #2B7A78",
                borderRadius: "30px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2B7A78";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#2B7A78";
              }}
            >
              Começar agora <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>

      {/* Seção Sobre o UnBemEstar */}
      <section
        id="about"
        style={{
          padding: "96px 32px",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "48px",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: isMobile ? "center" : "left" }}>
            <h2
              style={{
                fontSize: isMobile ? "28px" : "36px",
                color: "#2B7A78",
                marginBottom: "24px",
                fontWeight: 700,
                lineHeight: "1.3",
              }}
            >
              Reabilitação movida por dedicação
            </h2>
            <p
              style={{
                color: "#64748b",
                lineHeight: "1.8",
                fontSize: "17px",
                marginBottom: "0",
              }}
            >
              O UnBemEstar nasceu para provar que a organização digital e o calor
              humano caminham juntos. Transformamos a antiga burocracia de marcar
              consultas em uma experiência de pura clareza: nosso sistema mapeia
              as disponibilidades da clínica em tempo real para que nossos
              profissionais foquem 100% no que importa: a sua recuperação.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                height: "260px",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(43,122,120,0.12)",
              }}
            >
              <Image
                src="/imagens/sobre-1.png"
                alt="Atendimento humanizado"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "150px",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(43,122,120,0.12)",
                }}
              >
                <Image
                  src="/imagens/sobre-2.png"
                  alt="Cuidado e dedicação"
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>
              <div
                style={{
                  position: "relative",
                  height: "150px",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(43,122,120,0.12)",
                }}
              >
                <Image
                  src="/imagens/sobre-3.png"
                  alt="Recuperação e bem-estar"
                  fill
                  style={{ objectFit: "cover", objectPosition: "bottom" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Funcionalidades */}
      <section
        id="features"
        style={{
          padding: "80px 32px",
          backgroundColor: "#f0f7f9",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}
        >
          <h2
            style={{ fontSize: "32px", color: "#2B7A78", marginBottom: "16px" }}
          >
            Funcionalidades
          </h2>
          <p style={{ color: "#64748b", marginBottom: "48px" }}>
            Tudo que sua clínica precisa em um só lugar
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "32px",
            }}
          >
            {[
              {
                Icon: Calendar,
                title: "Agendamento Online",
                desc: "Pacientes agendam consultas 24/7",
              },
              {
                Icon: FileText,
                title: "Prontuário Digital",
                desc: "Histórico clínico completo e seguro",
              },
              {
                Icon: Mail,
                title: "Lembretes Automáticos",
                desc: "Notificações por e-mail 24h antes",
              },
              {
                Icon: Users,
                title: "Multi-perfis",
                desc: "Pacientes, fisioterapeutas e secretárias",
              },
            ].map(({ Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  padding: "24px",
                  backgroundColor: "white",
                  borderRadius: "16px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.04)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    backgroundColor: "#e6f7f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  <Icon size={26} color="#2B7A78" strokeWidth={1.8} />
                </div>
                <h3
                  style={{
                    marginTop: "16px",
                    color: "#2B7A78",
                    fontSize: "18px",
                  }}
                >
                  {title}
                </h3>
                <p style={{ color: "#64748b", fontSize: "14px" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos */}
      <section style={{ padding: "80px 32px" }}>
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}
        >
          <h2
            style={{ fontSize: "32px", color: "#2B7A78", marginBottom: "48px" }}
          >
            O que dizem nossos pacientes
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {[
              {
                nome: "Maria S.",
                texto:
                  "Agendar minhas sessões ficou muito mais fácil, sem precisar mandar mensagem pra clínica.",
              },
              {
                nome: "João P.",
                texto:
                  "O acompanhamento do histórico me ajudou a entender minha evolução no tratamento.",
              },
              {
                nome: "Ana C.",
                texto:
                  "Os lembretes por e-mail evitaram que eu esquecesse consultas importantes.",
              },
            ].map((dep) => (
              <div
                key={dep.nome}
                style={{
                  padding: "28px",
                  backgroundColor: "#f8fafc",
                  borderRadius: "16px",
                  textAlign: "left",
                }}
              >
                <div
                  style={{ display: "flex", gap: "2px", marginBottom: "12px" }}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} color="#3AAFA9" fill="#3AAFA9" />
                  ))}
                </div>
                <p
                  style={{
                    color: "#475569",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    marginBottom: "16px",
                  }}
                >
                  “{dep.texto}”
                </p>
                <p
                  style={{
                    color: "#2B7A78",
                    fontWeight: "600",
                    fontSize: "14px",
                    margin: 0,
                  }}
                >
                  {dep.nome}
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
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#cbd5e1";
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
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#cbd5e1";
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
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#cbd5e1";
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
