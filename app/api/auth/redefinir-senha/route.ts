import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'

/** schema de validação da redefinição de senha via código OTP */
const redefinirSenhaSchema = z.object({
  email: z.string().email('E-mail inválido'),
  codigo: z.string().regex(/^\d{6}$/, 'Código inválido'),
  novaSenha: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})

/** rota que valida o código OTP e efetiva a troca de senha */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, codigo, novaSenha } = redefinirSenhaSchema.parse(body)

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: object) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: object) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )

    // TODO: Supabase painel — a validade/expiração do código é controlada na config de
    //       recovery do Auth; garantir que o template de recovery usa o token OTP.
    const { error: otpError } = await supabase.auth.verifyOtp({
      email,
      token: codigo,
      type: 'recovery',
    })

    if (otpError) {
      return NextResponse.json(
        { error: 'Código inválido ou expirado' },
        { status: 400 }
      )
    }

    /** com a sessão estabelecida pelo verifyOtp, efetiva a troca de senha */
    const { error: updateError } = await supabase.auth.updateUser({
      password: novaSenha,
    })

    if (updateError) {
      return NextResponse.json(
        { error: 'Não foi possível redefinir a senha' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Senha redefinida com sucesso.',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.issues.map((issue) => ({
        campo: issue.path.join('.'),
        mensagem: issue.message,
      }))
      return NextResponse.json(
        { error: 'Dados inválidos', details: formattedErrors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
