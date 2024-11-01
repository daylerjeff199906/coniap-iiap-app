'use server'
import { IEventFilter, IEventRes } from '@/types'
import { createClient } from '@/utils/supabase/server'

export async function fetchEvents(props: IEventFilter) {
  const { query, date, isSumary, topic, isPagination, limit, page, programId } =
    props
  const supabase = createClient()

  let queryBuilder = supabase
    .from('events')
    .select('*,summary:summary_id(*, person:person_id(*))', { count: 'exact' })
    .eq('isActived', true)

  if (query) {
    queryBuilder = queryBuilder.ilike('name', `%${query}%`)
  }

  if (date) {
    queryBuilder = queryBuilder.eq('date', date)
  }

  if (topic) {
    queryBuilder = queryBuilder.eq('topic', topic)
  }

  if (programId) {
    queryBuilder = queryBuilder.eq('program_id', programId)
  }

  if (isSumary) {
    if (isSumary === 'true') {
      queryBuilder = queryBuilder.not('summary_id', 'is', null)
    } else if (isSumary === 'false') {
      queryBuilder = queryBuilder.is('summary_id', null)
    }
  }

  queryBuilder = queryBuilder.order('created_at', { ascending: false })

  if (isPagination && limit && page) {
    queryBuilder = queryBuilder.range((page - 1) * limit, page * limit - 1)
  }

  const { data: event, error, count } = await queryBuilder

  if (error) {
    console.error('error', error)
    return null
  } else {
    return { event, count }
  }
}

export async function fetchAllEvents(query: string, column?: string) {
  const supabase = createClient()
  const allSelect = column ? column : '*'
  const { data: event } = await supabase
    .from('events')
    .select(`${allSelect}, summary:summary_id(*, person:person_id(*))`)
    .ilike('name', `%${query}%`)
    .order('created_at', { ascending: false })

  return event
}

export async function fetchEventById(id: string) {
  const supabase = createClient()

  const { data: event, error } = await supabase
    .from('events')
    .select(
      '*,summary:summary_id(*, person:person_id(*), topic:topic_id(*)), program:program_id(*), sala:sala(*)'
    )
    .eq('id', id)
    .single()

  if (error) {
    console.error('error', error)
  } else {
    return event
  }
}

export async function createEvent(data: IEventRes) {
  const supabase = createClient()

  const { data: event, error } = await supabase
    .from('events')
    .insert([data])
    .select('*')

  if (error) {
    console.error('error', error)
    return error
  } else {
    return event
  }
}

export async function updateEvent(id: string, data: IEventRes) {
  const supabase = createClient()

  const { data: event, error } = await supabase
    .from('events')
    .update(data)
    .eq('id', id)
    .select('*')

  if (error) {
    console.error('error', error)
    return error
  } else {
    return event
  }
}
