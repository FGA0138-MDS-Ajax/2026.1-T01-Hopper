'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [focused, setFocused] = useState<string>('')
  
  const [form, setForm] = useState({
    email: '',
    senha: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage('✅ Login realizado! Redirecionando...')
        setTimeout(() => router.push('/dashboard'), 2000)
      } else {
        setMessage(data.error || 'E-mail ou senha inválidos')
      }
    } catch (error) {
      setMessage('Erro de conexão com o servidor')
    } finally {
      setLoading(false)
    }
  }

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
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,82,132,0.08) 0%, rgba(59,82,132,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '440px',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(10px)',
        borderRadius: '32px',
        padding: '48px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.02)',
        animation: 'fadeInUp 0.6s ease-out'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'linear-gradient(135deg, #3b5284 0%, #2c3e66 100%)',
            borderRadius: '32px',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            boxShadow: '0 8px 20px rgba(59,82,132,0.25)'
          }}>
            🔐
          </div>
          <h1 style={{
            fontSize: '28px',
            color: '#2c3e66',
            marginBottom: '10px',
            fontWeight: '700'
          }}>
            Bem-vindo
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>
            Faça login para acessar sua conta
          </p>
        </div>

        {message && (
          <div style={{
            padding: '14px',
            marginBottom: '28px',
            borderRadius: '16px',
            backgroundColor: message.includes('✅') ? '#e6f7e6' : '#fef2f2',
            color: message.includes('✅') ? '#2e7d32' : '#dc2626',
            border: `1px solid ${message.includes('✅') ? '#a5d6a7' : '#fecaca'}`,
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused('')}
              required
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: '12px',
                border: `2px solid ${focused === 'email' ? '#3b5284' : '#e2e8f0'}`,
                fontSize: '14px',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Senha</label>
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              onFocus={() => setFocused('senha')}
              onBlur={() => setFocused('')}
              required
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: '12px',
                border: `2px solid ${focused === 'senha' ? '#3b5284' : '#e2e8f0'}`,
                fontSize: '14px',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: loading 
                ? '#94a3b8' 
                : 'linear-gradient(135deg, #3b5284 0%, #2c3e66 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '48px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: loading ? 'none' : '0 8px 20px rgba(59,82,132,0.3)'
            }}
          >
            {loading ? 'Entrando...' : '🔓 Entrar'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '28px', fontSize: '14px', color: '#64748b' }}>
          Não tem conta? <Link href="/signup" style={{ color: '#3b5284', textDecoration: 'none', fontWeight: '500' }}>Cadastre-se</Link>
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