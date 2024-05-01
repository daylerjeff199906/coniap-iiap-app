'use server'
import { createClient } from '@/utils/supabase/server'
import { ITopic } from '@/types'

export async function createTopic(props: ITopic) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('topics')
    .insert([props])
    .select('*')

  if (error) {
    return error
  } else {
    return data
  }
}

export async function updateTopic(id: number, props: ITopic) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('topics')
    .update(props)
    .eq('id', id)
    .select('*')

  if (error) {
    return error
  } else {
    return data
  }
}

export async function fetchTopics(query: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .order('id', { ascending: true })
    .ilike('name', `%${query}%`)
  if (error) {
    return error
  } else {
    return data
  }
}

export async function fetchTopic(id: number) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .eq('id', id)
    .single()
  if (error) {
    return error
  } else {
    return data
  }
}
