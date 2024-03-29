'use server'
import { createClient } from '@/utils/supabase/server'
import { ITopic } from '@/types'

export async function createTopic(props: ITopic) {
  const supabase = createClient()

  const { data, error } = await supabase.from('topics').insert([props])
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
    .ilike('name', `%${query}%`)
  if (error) {
    return error
  } else {
    return data
  }
}
