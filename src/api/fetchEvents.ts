'use server'
import { IEvent } from '@/types'
import { createClient } from '@/utils/supabase/server'

interface IProps {
  query?: string
  date?: string
}

export async function fetchEvents(props: IProps) {
  const { query, date } = props
  const supabase = createClient()

  const { data: event } = await supabase
    .from('events')
    .select('*, persons(*)')
    .eq('isActived', true)
    .ilike('name', `%${query}%`)
  return event
}

export async function fetchAllEvents(query: string, column?: string) {
  const supabase = createClient()
  const allSelect = column ? column : '*'
  const { data: event } = await supabase
    .from('events')
    .select(`${allSelect}, persons(*)`)
    .ilike('name', `%${query}%`)
  return event
}

export async function fetchEventById(id: string) {
  const supabase = createClient()

  const { data: event, error } = await supabase
    .from('events')
    .select('*, persons(*)')
    .eq('id', id)
    .single()

  if (error) {
    console.error('error', error)
  } else {
    return event
  }
}

export async function createEvent(data: IEvent) {
  const supabase = createClient()

  const { data: event, error } = await supabase
    .from('events')
    .insert([data])
    .select('*')

  if (error) {
    console.error('error', error)
  } else {
    return event
  }
}

export async function updateEvent(id: string, data: IEvent) {
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
