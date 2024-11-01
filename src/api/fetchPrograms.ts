'use server'
import { createClient } from '@/utils/supabase/server'
import { IProgram, IProgramsFilter } from '@/types'

export async function fetchPrograms(
  query: string,
  column?: string,
  date?: string
) {
  const supabase = createClient()
  const allSelect = column ? column : '*'

  let request = supabase
    .from('programs')
    .select(allSelect)
    .ilike('title', `%${query}%`)
    .order('created_at', { ascending: false })

  if (date) {
    request = request.eq('date', date)
  }

  const { data, error } = await request

  if (error) {
    return error
  } else {
    return data
  }
}

//program by filter
export async function fetchProgramsFilter(filter: IProgramsFilter) {
  const { query, column, date, isPagination, limit, orderBy, page } = filter
  const supabase = createClient()
  const allSelect = column ? column : '*'

  let request = supabase
    .from('programs')
    .select(allSelect, { count: 'exact' })
    .ilike('title', `%${query}%`)

  if (orderBy) {
    request = request.order(orderBy.column, { ascending: orderBy.ascending })
  } else {
    request = request.order('created_at', { ascending: false })
  }

  if (date) {
    request = request.eq('date', date)
  }

  if (isPagination && limit && page) {
    request = request.range((page - 1) * limit, page * limit - 1)
  }

  const { data: programs, error, count } = await request

  if (error) {
    return null
  } else {
    return { programs, count }
  }
}

export async function fetchProgram(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('programs')
    .select()
    .eq('id', id)
    .single()

  if (error) {
    return error
  } else {
    return data
  }
}

export async function createProgram(props: IProgram) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('programs')
    .insert([props])
    .select('*')

  if (error) {
    return error
  } else {
    return data
  }
}

export async function updateProgram(id: string, props: IProgram) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('programs')
    .update(props)
    .eq('id', id)
    .select('*')

  if (error) {
    return error
  } else {
    return data
  }
}

export async function updateFieldProgram(
  id: string,
  field: string,
  value: any
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('programs')
    .update({ [field]: value })
    .eq('id', id)
    .select()

  if (error) {
    console.error('error', error)
    return error
  } else {
    return data
  }
}
