'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    telefone: '',
    dataNascimento: '',
    endereco: '',
    convenio: '',
  })

  const [focused, setFocused] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (res.ok) {
        setMessageType('success')
        setMessage('✅ Cadastro realizado! Redirecionando...')
        setTimeout(() => router.push('/login'), 2000)
      } else {
        setMessageType('error')
        setMessage(data.error || 'Erro ao cadastrar')
      }
    } catch (error) {
      setMessageType('error')
      setMessage('Erro de conexão com o servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(145deg, #eef2fa 0%, #e0e8f2 100%)',
      padding: '60px 20px'
    }}>
      <div style={{
        maxWidth: '720px',
        margin: '0 auto',
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(10px)',
        borderRadius: '32px',
        padding: '48px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.02)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
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
            📝
          </div>
          <h1 style={{
            fontSize: '28px',
            color: '#2c3e66',
            marginBottom: '10px',
            fontWeight: '700'
          }}>
            Criar conta
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>
            Preencha os dados abaixo para começar
          </p>
        </div>

        {message && (
          <div style={{
            padding: '14px',
            marginBottom: '28px',
            borderRadius: '16px',
            backgroundColor: messageType === 'success' ? '#e6f7e6' : '#fef2f2',
            color: messageType === 'success' ? '#2e7d32' : '#dc2626',
            border: `1px solid ${messageType === 'success' ? '#a5d6a7' : '#fecaca'}`,
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Nome completo</label>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                onFocus={() => setFocused('nome')}
                onBlur={() => setFocused('')}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: `2px solid ${focused === 'nome' ? '#3b5284' : '#e2e8f0'}`,
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
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
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: `2px solid ${focused === 'email' ? '#3b5284' : '#e2e8f0'}`,
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Senha (mínimo 6 caracteres)</label>
              <input
                type="password"
                name="senha"
                value={form.senha}
                onChange={handleChange}
                onFocus={() => setFocused('senha')}
                onBlur={() => setFocused('')}
                required
                minLength={6}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: `2px solid ${focused === 'senha' ? '#3b5284' : '#e2e8f0'}`,
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>CPF</label>
              <input
                type="text"
                name="cpf"
                value={form.cpf}
                onChange={handleChange}
                onFocus={() => setFocused('cpf')}
                onBlur={() => setFocused('')}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: `2px solid ${focused === 'cpf' ? '#3b5284' : '#e2e8f0'}`,
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Telefone</label>
              <input
                type="tel"
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                onFocus={() => setFocused('telefone')}
                onBlur={() => setFocused('')}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: `2px solid ${focused === 'telefone' ? '#3b5284' : '#e2e8f0'}`,
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Data de Nascimento</label>
              <input
                type="date"
                name="dataNascimento"
                value={form.dataNascimento}
                onChange={handleChange}
                onFocus={() => setFocused('dataNascimento')}
                onBlur={() => setFocused('')}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: `2px solid ${focused === 'dataNascimento' ? '#3b5284' : '#e2e8f0'}`,
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Convênio (opcional)</label>
              <input
                type="text"
                name="convenio"
                value={form.convenio}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Endereço (opcional)</label>
              <input
                type="text"
                name="endereco"
                value={form.endereco}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              marginTop: '36px',
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
            {loading ? 'Cadastrando...' : '✨ Criar conta'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '28px', fontSize: '14px', color: '#64748b' }}>
          Já tem conta? <Link href="/login" style={{ color: '#3b5284', textDecoration: 'none', fontWeight: '500' }}>Faça login</Link>
        </p>
      </div>
    </div>
  )
}