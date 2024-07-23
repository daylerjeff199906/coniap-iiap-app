'use server'
import { createClient } from '@/utils/supabase/server'

const table = 'information'

export async function fetchInformation() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from(`${table}}`)
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    return null
  } else {
    data
  }
}

export async function fetchInformationById(id: number) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from(`${table}`)
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return null
  } else {
    return data
  }
}

export async function updateRowInformation(
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
    .single()

  console.log(data)

  if (error) {
    return error
  } else {
    return data
  }
}
