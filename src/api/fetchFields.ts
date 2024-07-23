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

export async function addFileToBucket(file: File, path: string) {
  const supabase = createClient()
  const { data, error } = await supabase.storage
    .from(`coniap-2024/${path}`)
    .upload(file.name, file)

  if (error) {
    return error
  } else {
    return data
  }
}
