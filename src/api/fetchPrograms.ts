'use server'
import { createClient } from '@/utils/supabase/server'
import { IProgram } from '@/types'

export async function fetchPrograms(query: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('programs')
    .select()
    .ilike('title', `%${query}%`)

  if (error) {
    return error
  } else {
    return data
  }
}

export async function createProgram(props: IProgram) {
  const supabase = createClient()

  const { data, error } = await supabase.from('programs').insert([props])
  if (error) {
    return error
  } else {
    return data
  }
}

export async function updateProgram(id: string, props: IProgram) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('programs')
    .update(props)
    .eq('id', id)
  if (error) {
    return error
  } else {
    return data
  }
}

export async function updateFieldProgram(
  id: string,
  field: string,
  value: any
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('programs')
    .update({ [field]: value })
    .eq('id', id)
    .select()

  if (error) {
    console.error('error', error)
    return error
  } else {
    console.log('data', data)
    return data
  }
}
