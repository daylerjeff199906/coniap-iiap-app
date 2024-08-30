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

export async function fetchSummaries(filters?: {
  query?: string
  isApproved?: boolean
  isActived?: boolean
  isMagistral?: boolean
  person_id?: string
  topic_id?: string
  created_at?: string
  isFile?: boolean
}) {
  const supabase = createClient()

  let request = supabase
    .from('summaries')
    .select('*,person:person_id(*), topic:topic_id(*)')
    .ilike('title', `%${filters?.query}%`)
    .order('created_at', { ascending: false })

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
  if (filters?.isFile !== undefined) {
    if (filters.isFile) {
      request = request.not('file', 'eq', '')
    } else {
      request = request.eq('file', '')
    }
  }
  if (filters?.isMagistral) {
    request = request.eq('isMagistral', filters.isMagistral)
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

export async function fetchPersonsIsNotSummaryFile() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('persons')
    .select('summaries(file)')
    .neq('typePerson', 'participant')
    .is('summaries.file', null) // Para agregar el chequeo de NULL correctamente
  // .or('summaries.file.is.null, summaries.file.eq.""')

  console.log(data)
  console.log(error)

  if (error) {
    return error
  } else {
    return data
  }
}
