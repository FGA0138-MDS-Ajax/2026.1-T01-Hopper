// RF01 - Cadastro de Paciente
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const signupSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  cpf: z.string().regex(/^\d{11}$/, 'CPF deve ter 11 dígitos'),
  telefone: z.string().min(10, 'Telefone inválido'),
  dataNascimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida (YYYY-MM-DD)'),
  endereco: z.string().optional(),
  convenio: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = signupSchema.parse(body)
    
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )
    
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.senha,
      options: {
        data: {
          nome: validatedData.nome,
          perfil: 'paciente',
        }
      }
    })
    
    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }
    
    const { error: pacienteError } = await supabase
      .from('pacientes')
      .insert({
        id: authData.user?.id,
        nome: validatedData.nome,
        email: validatedData.email,
        cpf: validatedData.cpf,
        telefone: validatedData.telefone,
        data_nascimento: validatedData.dataNascimento,
        endereco: validatedData.endereco || null,
        convenio: validatedData.convenio || null,
        created_at: new Date().toISOString(),
      })
    
    if (pacienteError) {
      console.error('Erro ao inserir paciente:', pacienteError)
      return NextResponse.json({ error: 'Erro ao salvar dados do paciente' }, { status: 500 })
    }
    
    return NextResponse.json(
      { success: true, message: 'Paciente cadastrado com sucesso', userId: authData.user?.id },
      { status: 201 }
    )
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.issues.map((issue: any) => ({
        campo: issue.path.join('.'),
        mensagem: issue.message
      }))
      return NextResponse.json(
        { error: 'Dados inválidos', details: formattedErrors }, 
        { status: 400 }
      )
    }
    console.error('Erro interno:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}