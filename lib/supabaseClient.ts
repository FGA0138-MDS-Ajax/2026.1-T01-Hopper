import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

/**
 * client anon (respeita RLS). criado sob demanda para que o módulo possa ser
 * importado durante o `next build` sem exigir as env vars de runtime.
 */
export function getSupabaseClient(): SupabaseClient {
  if (!client) {
    client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
  }
  return client
}
