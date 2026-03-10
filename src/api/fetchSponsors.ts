'use server'
import { createClient } from "@/utils/supabase/supabase/client"
import { ISponsor } from '@/types'

export async function createSponsor(props: ISponsor) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('sponsors')
    .insert([props])
    .select('*')
  if (error) {
    return error
  } else {
    return data
  }
}

export async function updateSponsor(id: string, props: ISponsor) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('sponsors')
    .update(props)
    .eq('id', id)
    .select('*')
  if (error) {
    return error
  } else {
    return data
  }
}

export async function fetchSponsors(query: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('sponsors')
    .select('*')
    .order('name', { ascending: true })
    .ilike('name', `%${query}%`)
  if (error) {
    return error
  } else {
    return data
  }
}

export async function fetchSponsor(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('sponsors')
    .select('*')
    .eq('id', id)
    .single()
  if (error) {
    return error
  } else {
    return data
  }
}
export async function fetchCurrentEditionSponsors() {
  const supabase = await createClient()

  // 1. Get current edition
  let { data: edition } = await supabase
    .from('editions')
    .select('id')
    .eq('is_current', true)
    .maybeSingle()

  if (!edition) {
    const { data: latestEdition } = await supabase
      .from('editions')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()
    edition = latestEdition
  }

  if (!edition) return []

  // 2. Get sponsors linked to this edition
  const { data, error } = await supabase
    .from('event_sponsors')
    .select(`
      sponsors!inner(*)
    `)
    .eq('edition_id', edition.id)
    .eq('sponsors.isActived', true)
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching edition sponsors:', error)
    return []
  }

  const sponsors = (data || []).map(item => item.sponsors) as unknown as ISponsor[]
  return sponsors
}

