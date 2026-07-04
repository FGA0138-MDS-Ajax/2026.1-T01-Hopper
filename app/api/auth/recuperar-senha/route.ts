import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'

/** schema de validação do pedido de recuperação de senha */
const recuperarSenhaSchema = z.object({
  email: z.string().email('E-mail inválido'),
})

/** rota que recebe o pedido de recuperação e dispara o e-mail com o código OTP */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = recuperarSenhaSchema.parse(body)

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

    // TODO: Supabase painel — configurar o template de e-mail "Reset Password" para
    //       enviar o código {{ .Token }} (fluxo OTP) e não o link; ajustar tempo de
    //       expiração do token de recovery e as Redirect URLs permitidas.
    await supabase.auth.resetPasswordForEmail(email)

    /**
     * retorno genérico: não revela se o e-mail está cadastrado.
     * eventuais erros do Supabase são ignorados de propósito para não vazar essa informação.
     */
    return NextResponse.json({
      success: true,
      message: 'Se o e-mail estiver cadastrado, enviamos um código de verificação.',
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
