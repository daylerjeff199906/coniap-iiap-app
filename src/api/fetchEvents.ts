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
