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

export async function fetchSalaById(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('salas')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return error
  } else {
    return data
  }
}

export async function createSala(data: any) {
  const supabase = createClient()
  const { data: newData, error } = await supabase
    .from('salas')
    .insert([data])
    .select('*')
    .single()

  if (error) {
    return error
  } else {
    return newData
  }
}

export async function updateSala(id: string, data: any) {
  const supabase = createClient()
  const { data: newData, error } = await supabase
    .from('salas')
    .update(data)
    .eq('id', id)
    .select('*')
    .single()

  if (error) {
    return error
  } else {
    return newData
  }
}
