'use server'
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

export async function fetchAllEvents(query: string) {
  const supabase = createClient()

  const { data: event } = await supabase
    .from('events')
    .select('*, persons(*)')
    .ilike('name', `%${query}%`)
  return event
}

export async function fetchEventById(id: string) {
  const supabase = createClient()

  const { data: event, error } = await supabase
    .from('events')
    .select('*, persons(*)')
    .eq('isActived', true)
    .eq('id', id)
    .single()

  if (error) {
    console.error('error', error)
  } else {
    return event
  }
}
