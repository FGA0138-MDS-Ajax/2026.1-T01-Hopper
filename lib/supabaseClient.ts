import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Client público do Supabase (anon key).
 *
 * A instância é criada de forma lazy (na primeira utilização) e não no topo do
 * módulo: assim o `next build` consegue importar os routes para coletar dados
 * sem exigir as variáveis de ambiente, que só precisam existir em runtime.
 * O Proxy mantém a API de uso inalterada (`supabase.from(...)`, etc.).
 */
let client: SupabaseClient | null = null

function getSupabaseClient(): SupabaseClient {
  if (!client) {
    client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    )
  }
  return client
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const instance = getSupabaseClient()
    const value = Reflect.get(instance, prop)
    return typeof value === 'function' ? value.bind(instance) : value
  },
})