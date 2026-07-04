import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Client administrativo do Supabase usando a service-role key.
 *
 * Diferente do `supabaseClient` (anon key), este client ignora as políticas
 * de RLS — é o necessário para jobs de cron, que rodam sem um usuário logado
 * e precisam ler/escrever dados de todos os usuários.
 *
 * NUNCA importe este módulo em código que roda no browser: a service-role key
 * dá acesso total ao banco e só pode existir no servidor.
 *
 * A instância é criada de forma lazy (na primeira utilização) e não no topo do
 * módulo: assim o `next build` consegue importar os routes para coletar dados
 * sem exigir as variáveis de ambiente, que só precisam existir em runtime.
 */
let client: SupabaseClient | null = null

function getSupabaseAdmin(): SupabaseClient {
  if (!client) {
    client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )
  }
  return client
}

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const instance = getSupabaseAdmin()
    const value = Reflect.get(instance, prop)
    return typeof value === 'function' ? value.bind(instance) : value
  },
})
