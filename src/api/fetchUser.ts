'use server'
import { createClient } from '@/utils/supabase/server'
import { IUser } from '@/types'

export async function fetchUserByEmail(email: string): Promise<IUser | null> {
  const client = createClient()
  const { data, error } = await client
    .from('users')
    .select('*')
    .eq('email', email)
    .single()
  if (error) {
    throw error
  }
  return data
}
