'use server'
import { createClient } from '@/utils/supabase/server'
import { ISponsor } from '@/types'

export async function createSponsor(props: ISponsor) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('sponsors')
    .insert([props])
    .select('*')
  if (error) {
    return error
  } else {
    return data
  }
}

export async function updateSponsor(id: string, props: ISponsor) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('sponsors')
    .update(props)
    .eq('id', id)
    .select('*')
  if (error) {
    return error
  } else {
    return data
  }
}

export async function fetchSponsors(query: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('sponsors')
    .select('*')
    .order('name', { ascending: true })
    .ilike('name', `%${query}%`)
  if (error) {
    return error
  } else {
    return data
  }
}

export async function fetchSponsor(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('sponsors')
    .select('*')
    .eq('id', id)
    .single()
  if (error) {
    return error
  } else {
    return data
  }
}
