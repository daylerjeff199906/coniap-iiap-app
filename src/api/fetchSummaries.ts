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

export async function fetchSummaries(
  query: string,
  filters?: {
    isApproved?: boolean
    isActived?: boolean
    person_id?: string
    topic_id?: string
    created_at?: string
  }
) {
  const supabase = createClient()

  let request = supabase
    .from('summaries')
    .select('*,person:person_id(*), topic:topic_id(*)')
    .ilike('title', `%${query}%`)

  if (filters?.isApproved) {
    request = request.eq('isApproved', filters.isApproved)
  }
  if (filters?.isActived) {
    request = request.eq('isActived', filters.isActived)
  }
  if (filters?.person_id) {
    request = request.eq('person_id', filters.person_id)
  }
  if (filters?.topic_id) {
    request = request.eq('topic_id', filters.topic_id)
  }
  if (filters?.created_at) {
    request = request.ilike('created_at', `${filters.created_at}%`)
  }

  const { data, error } = await request

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
    .select('*,person:person_id(*), topic:topic_id(*)')
    .order('title', { ascending: true })
    .eq('isApproved', isApproved)
    .ilike('title', `%${query}%`)
  if (error) {
    return error
  } else {
    return data
  }
}

export async function fetchSummaryByIdPerson(idPerson: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('summaries')
    .select('*,person:person_id(*), topic:topic_id(*)')
    .eq('person_id', idPerson)
    .order('title', { ascending: true })
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
    .select('*,person:person_id(*), topic:topic_id(*)')
    .eq('id', id)
    .single()

  if (error) {
    return error
  } else {
    return data
  }
}
