'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CalendarPage() {
  const [data, setData] = useState('')
  const [horarios, setHorarios] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null)

  const buscarHorarios = async () => {
    if (!data) {
      setMessage('Selecione uma data')
      return
    }

    setLoading(true)
    setMessage('')
    setHorarios([])
    setSelectedHorario(null)

    try {
      const res = await fetch(`/api/appointments/available?data=${data}`)
      const result = await res.json()

      if (res.ok) {
        setHorarios(result.horariosDisponiveis)
        if (result.horariosDisponiveis.length === 0) {
          setMessage('Nenhum horário disponível para esta data')
        }
      } else {
        setMessage(result.error || 'Erro ao buscar horários')
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
      padding: '60px 20px'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(10px)',
        borderRadius: '32px',
        padding: '48px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.02)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #3b5284 0%, #2c3e66 100%)',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              boxShadow: '0 4px 12px rgba(59,82,132,0.2)'
            }}>
              📅
            </div>
            <h1 style={{ fontSize: '28px', color: '#2c3e66', fontWeight: '700', margin: 0 }}>Calendário</h1>
          </div>
          <Link href="/">
            <button style={{
              padding: '10px 20px',
              backgroundColor: 'transparent',
              border: '1.5px solid #cbd5e1',
              borderRadius: '40px',
              cursor: 'pointer',
              fontSize: '13px',
              color: '#64748b',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f1f5f9'
              e.currentTarget.style.borderColor = '#3b5284'
              e.currentTarget.style.color = '#3b5284'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = '#cbd5e1'
              e.currentTarget.style.color = '#64748b'
            }}>
              ← Voltar
            </button>
          </Link>
        </div>

        <div style={{
          background: '#f8fafc',
          borderRadius: '20px',
          padding: '28px',
          marginBottom: '32px',
          border: '1px solid #e2e8f0'
        }}>
          <label style={{ display: 'block', marginBottom: '12px', fontSize: '14px', fontWeight: '600', color: '#334155' }}>Selecione uma data:</label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              style={{
                flex: 1,
                padding: '14px 18px',
                borderRadius: '48px',
                border: '1.5px solid #e2e8f0',
                fontSize: '14px',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
            />
            <button
              onClick={buscarHorarios}
              disabled={loading}
              style={{
                padding: '14px 32px',
                background: loading 
                  ? '#94a3b8' 
                  : 'linear-gradient(135deg, #3b5284 0%, #2c3e66 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '48px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: loading ? 'none' : '0 4px 12px rgba(59,82,132,0.2)'
              }}
            >
              {loading ? 'Buscando...' : '🔍 Buscar horários'}
            </button>
          </div>
        </div>

        {message && (
          <div style={{
            padding: '14px',
            marginBottom: '24px',
            borderRadius: '16px',
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            border: '1px solid #fecaca',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

        {horarios.length > 0 && (
          <div>
            <h3 style={{
              fontSize: '18px',
              marginBottom: '24px',
              color: '#2c3e66',
              fontWeight: '600'
            }}>
              📌 Horários disponíveis para <span style={{ color: '#3b5284' }}>{data}</span>:
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
              gap: '14px'
            }}>
              {horarios.map((horario) => (
                <button
                  key={horario}
                  style={{
                    padding: '12px',
                    backgroundColor: selectedHorario === horario ? '#3b5284' : '#ffffff',
                    color: selectedHorario === horario ? 'white' : '#334155',
                    border: selectedHorario === horario ? 'none' : '1.5px solid #e2e8f0',
                    borderRadius: '48px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    boxShadow: selectedHorario === horario ? '0 4px 12px rgba(59,82,132,0.3)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedHorario !== horario) {
                      e.currentTarget.style.backgroundColor = '#f1f5f9'
                      e.currentTarget.style.borderColor = '#cbd5e1'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedHorario !== horario) {
                      e.currentTarget.style.backgroundColor = '#ffffff'
                      e.currentTarget.style.borderColor = '#e2e8f0'
                    }
                  }}
                  onClick={() => {
                    setSelectedHorario(horario)
                    alert(`Horário ${horario} selecionado! Agendamento confirmado.`)
                  }}
                >
                  🕐 {horario}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}