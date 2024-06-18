'use server'
import { createClient } from '@/utils/supabase/server'
// import { ISala } from '@/types'

export async function fetchSalas(query: string, column?: string) {
  const supabase = createClient()
  const allSelect = column ? column : '*'
  const { data, error } = await supabase
    .from('salas')
    .select(allSelect)
    .ilike('name', `%${query}%`)
  if (error) {
    return error
  } else {
    return data
  }
}
