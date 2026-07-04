import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

/** rota pública que retorna todos os fisioterapeutas da clínica */
export const revalidate = 3600

export async function GET() {
  const { data: profissionais, error } = await supabase
    .from('fisioterapeutas')
    .select('id, nome, crefito, especialidades, foto_url, bio')
    .order('nome', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(profissionais ?? [])
}