'use server'
import { createClient } from '@/utils/supabase/server'
import { ISummary } from '@/types'

export async function createSummary(props: ISummary) {
  const supabase = createClient()

  const { data: summary, error } = await supabase
    .from('summaries')
    .insert([props])
    .select('*')
  if (error) {
    return error
  } else {
    return summary
  }
}

export async function updateSummary(id: string, props: ISummary) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('summaries')
    .update(props)
    .eq('id', id)
    .select('*')
  if (error) {
    return error
  } else {
    return data
  }
}

export async function fetchSummaries(query: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('summaries')
    .select('*, person:person_id(*)')
    .order('title', { ascending: true })
    .ilike('title', `%${query}%`)
  if (error) {
    return error
  } else {
    return data
  }
}

export async function fetchSummaryStatus(query: string, isApproved: boolean) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('summaries')
    .select('*,person:person_id(*)')
    .order('title', { ascending: true })
    .eq('isApproved', isApproved)
    .ilike('title', `%${query}%`)
  if (error) {
    return error
  } else {
    return data
  }
}

export async function fetchSummaryById(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('summaries')
    .select('*,person:person_id(*)')
    .eq('id', id)
    .single()
    
  if (error) {
    return error
  } else {
    return data
  }
}
