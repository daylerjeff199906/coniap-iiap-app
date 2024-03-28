'use server'
import { createClient } from '@/utils/supabase/server'

interface IProps {
  query?: string
  date?: string
}

export async function fetchEvents(props: IProps) {
  console.log('query', props.query)
  const { query, date } = props
  const supabase = createClient()

  const { data: event } = await supabase
    .from('events')
    .select()
    .eq('isActived', true)
    .eq('date', date)
    .ilike('name', `%${query}%`)

  return event
}
