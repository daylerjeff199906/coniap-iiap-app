'use server'
import { createClient } from '@/utils/supabase/server'
import { IPerson } from '@/types'

export async function createPerson(props: IPerson) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('persons')
    .insert([props])
    .select('*')
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
    .order('name', { ascending: true })
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
    .single()

  if (error) {
    return null
  } else {
    return data
  }
}

export async function fetchPersonsInEvent() {
  const supabase = createClient()

  const { data, error } = await supabase.from('events').select('persons(*)')

  if (error) {
    return null
  } else {
    return data
  }
}

export async function fetchPersonsNotInEvent(query: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('persons')
    .select('*')
    .eq('typePerson', 'participant')
    .ilike('name', `%${query}%`)

  if (error) {
    console.error('Error fetching persons:', error.message)
    return null
  } else {
    return data
  }
}
