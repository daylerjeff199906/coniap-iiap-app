'use server'
import { createClient } from '@/utils/supabase/server'
import { IPerson } from '@/types'

export async function createPerson(props: IPerson) {
  const supabase = createClient()

  const { data, error } = await supabase.from('persons').insert([props])
  if (error) {
    return error
  } else {
    return data
  }
}

export async function updatePerson(id: string, props: IPerson) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('persons')
    .update(props)
    .eq('id', id)
    .select('*')

  if (error) {
    return error
  } else {
    return data
  }
}

export async function fetchPerson(query: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('persons')
    .select('*')
    .ilike('name', `%${query}%`)
  if (error) {
    return error
  } else {
    return data
  }
}

export async function fetchSpeakers(query: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('persons')
    .select('*')
    .order('name', { ascending: true })
    .not('typePerson', 'eq', 'participant')
    .ilike('name', `%${query}%`)

  if (error) {
    return error
  } else {
    return data
  }
}

export async function fetchPersonById(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('persons')
    .select('*')
    .eq('id', id)
  if (error) {
    return error
  } else {
    return data
  }
}
