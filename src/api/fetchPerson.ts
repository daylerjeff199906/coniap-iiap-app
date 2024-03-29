'use server'
import { createClient } from '@/utils/supabase/server'
import { IPerson } from '@/types'

export async function createPerson(props: IPerson) {
  const supabase = createClient()

  const { data, error } = await supabase.from('persons').insert([props])
  if (error) {
    return error
  } else {
    return data
  }
}
