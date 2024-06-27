'use server'
import { createClient } from '@/utils/supabase/server'
import { IProgram } from '@/types'

export async function fetchPrograms(
  query: string,
  column?: string,
  date?: string
) {
  const supabase = createClient()
  const allSelect = column ? column : '*'

  let request = supabase
    .from('programs')
    .select(allSelect)
    .ilike('title', `%${query}%`)

  if (date) {
    request = request.eq('date', date)
  }

  const { data, error } = await request

  if (error) {
    return error
  } else {
    return data
  }
}

export async function fetchProgram(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('programs')
    .select()
    .eq('id', id)
    .single()

  if (error) {
    return error
  } else {
    return data
  }
}

export async function createProgram(props: IProgram) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('programs')
    .insert([props])
    .select('*')

  if (error) {
    return error
  } else {
    console.log('data', data)
    return data
  }
}

export async function updateProgram(id: string, props: IProgram) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('programs')
    .update(props)
    .eq('id', id)
    .select('*')

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
    return data
  }
}
