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
    return null
  }
  return data
}

export async function createUser(user: IUser): Promise<IUser | null> {
  const client = createClient()
  const { data, error } = await client.from('users').insert(user).single()
  if (error) {
    throw error
  }
  return data
}

export async function updateUser(user: IUser): Promise<IUser | null> {
  const client = createClient()
  const { data, error } = await client
    .from('users')
    .update(user)
    .eq('id', user.id)
    .single()

  if (error) {
    return null
  }
  return data
}
