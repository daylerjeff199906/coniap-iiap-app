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
    .single()

  if (error) {
    return error
  } else {
    return data
  }
}

export async function fetchPersons(
  query: string,
  typePerson: string,
  isNot?: string,
  status?: string
) {
  const supabase = createClient()

  // Comenzamos construyendo la consulta básica
  let queryBuilder = supabase
    .from('persons')
    .select('*')
    .order('name', { ascending: true })
    .ilike('surName', `%${query}%`)

  // Agregamos la condición solo si typePerson no está vacío
  if (typePerson) {
    queryBuilder = queryBuilder.eq('typePerson', typePerson)
  }

  // Agregamos la condición solo si isNot no está vacío
  if (isNot) {
    queryBuilder = queryBuilder.not('typePerson', 'eq', isNot)
  }

  if (status) {
    queryBuilder = queryBuilder.eq('isActived', status)
  }

  // Ejecutamos la consulta
  const { data, error } = await queryBuilder

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

export async function fetchPersonsNotInEvent(query: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('persons')
    .select('*')
    .eq('typePerson', 'participant')
    .order('name', { ascending: true })
    .ilike('name', `%${query}%`)

  if (error) {
    console.error('Error fetching persons:', error.message)
    return null
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

//find person by email
export async function fetchPersonByEmail(email: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('persons')
    .select('*')
    .eq('email', email)
    .single()

  if (error) {
    return null
  } else {
    return data
  }
}
