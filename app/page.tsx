'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [isHoverSignup, setIsHoverSignup] = useState(false)
  const [isHoverLogin, setIsHoverLogin] = useState(false)
  const [isHoverCalendar, setIsHoverCalendar] = useState(false)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(145deg, #eef2fa 0%, #e0e8f2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,82,132,0.08) 0%, rgba(59,82,132,0) 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '-10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(44,62,102,0.06) 0%, rgba(44,62,102,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(10px)',
        borderRadius: '32px',
        padding: '56px 48px',
        maxWidth: '520px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.02)',
        transition: 'transform 0.3s ease',
        animation: 'fadeInUp 0.6s ease-out'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #3b5284 0%, #2c3e66 100%)',
          borderRadius: '40px',
          margin: '0 auto 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '36px',
          boxShadow: '0 8px 20px rgba(59,82,132,0.3)'
        }}>
          🩺
        </div>

        <h1 style={{
          fontSize: '36px',
          background: 'linear-gradient(135deg, #2c3e66 0%, #3b5284 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          marginBottom: '12px',
          fontWeight: '700',
          letterSpacing: '-0.5px'
        }}>
          UnBemEstar
        </h1>
        <p style={{
          fontSize: '15px',
          color: '#64748b',
          marginBottom: '40px',
          maxWidth: '320px',
          margin: '0 auto 40px',
          lineHeight: '1.6'
        }}>
          Gestão inteligente para clínicas de fisioterapia
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Link href="/signup" style={{ textDecoration: 'none' }}>
            <button
              style={{
                width: '100%',
                padding: '16px',
                background: isHoverSignup 
                  ? 'linear-gradient(135deg, #2c3e66 0%, #3b5284 100%)'
                  : 'linear-gradient(135deg, #3b5284 0%, #4a6a9e 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '48px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: isHoverSignup ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: isHoverSignup 
                  ? '0 12px 24px -8px rgba(59,82,132,0.4)' 
                  : '0 4px 12px rgba(59,82,132,0.2)'
              }}
              onMouseEnter={() => setIsHoverSignup(true)}
              onMouseLeave={() => setIsHoverSignup(false)}
            >
              ✨ Criar minha conta
            </button>
          </Link>

          <Link href="/login" style={{ textDecoration: 'none' }}>
            <button
              style={{
                width: '100%',
                padding: '16px',
                background: 'transparent',
                color: isHoverLogin ? '#3b5284' : '#4a6a9e',
                border: '1.5px solid #cbd5e1',
                borderRadius: '48px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: isHoverLogin ? 'translateY(-2px)' : 'translateY(0)',
                backgroundColor: isHoverLogin ? '#f8fafc' : 'transparent'
              }}
              onMouseEnter={() => setIsHoverLogin(true)}
              onMouseLeave={() => setIsHoverLogin(false)}
            >
              🔐 Já tenho conta
            </button>
          </Link>

          <Link href="/calendar" style={{ textDecoration: 'none' }}>
            <button
              style={{
                width: '100%',
                padding: '16px',
                background: 'transparent',
                color: '#64748b',
                border: '1px solid #e2e8f0',
                borderRadius: '48px',
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f1f5f9'
                e.currentTarget.style.borderColor = '#cbd5e1'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.borderColor = '#e2e8f0'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              📅 Ver calendário
            </button>
          </Link>
        </div>

        <p style={{
          fontSize: '12px',
          color: '#94a3b8',
          marginTop: '32px',
          borderTop: '1px solid #ecfdf5',
          paddingTop: '20px'
        }}>
          Plataforma segura · Dados protegidos
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}