'use server'
import { createClient } from '@/utils/supabase/server'

export async function updateField(
  table: string,
  id: string,
  field: string,
  value: any
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from(`${table}`)
    .update({ [field]: value })
    .eq('id', id)
    .select()

  if (error) {
    console.error('error', error)
    return error
  } else {
    return data
  }
}
