import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

/**
 * client service-role para jobs de cron (sem usuário logado). criado sob
 * demanda — assim o módulo pode ser importado durante o `next build` sem
 * exigir as env vars, que só existem em runtime. ignora RLS: nunca expor
 * ao browser.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (!client) {
    client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    )
  }
  return client
}
