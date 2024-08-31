'use server'
import { createClient } from '@/utils/supabase/server'
import { ISummary, ISummaryFilter } from '@/types'

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

export async function fetchSummaries(filters?: ISummaryFilter) {
  const supabase = createClient()

  let request = supabase
    .from('summaries')
    .select('*,person:person_id(*), topic:topic_id(*)', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (filters?.query) {
    request = request.eq('title', `%${filters.query}%`)
  }
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
  if (
    filters?.created_at &&
    !filters?.created_at_start &&
    !filters?.created_at_end
  ) {
    const startOfDay = new Date(filters.created_at)
    const endOfDay = new Date(startOfDay)
    endOfDay.setDate(startOfDay.getDate() + 1)

    request = request
      .gte('created_at', startOfDay.toISOString())
      .lt('created_at', endOfDay.toISOString())
  }
  if (filters?.created_at_start && filters?.created_at_end) {
    const startOfDay = new Date(filters.created_at_start)
    const endOfDay = new Date(filters.created_at_end)

    request = request
      .gte('created_at', startOfDay.toISOString())
      .lt('created_at', endOfDay.toISOString())
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
  if (filters?.isPagination && filters?.params) {
    request = request.range(
      (filters.params.page - 1) * filters.params.limit,
      filters.params.page * filters.params.limit - 1
    )
  }

  const { data, error, count } = await request

  if (error) {
    return error
  } else {
    return { data, count }
  }
}

export async function fetchSummaryByIdPerson(idPerson: string) {
  const supabase = createClient()

  const { data, error, count } = await supabase
    .from('summaries')
    .select('*,person:person_id(*), topic:topic_id(*)', { count: 'exact' })
    .eq('person_id', idPerson)
    .order('title', { ascending: true })

  if (error) {
    return error
  } else {
    return { data, count }
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

  // console.log(data)
  // console.log(error)

  if (error) {
    return error
  } else {
    return data
  }
}
