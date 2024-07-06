'use server'
import { createClient } from '@/utils/supabase/server'
import { IUser } from '@/types'

export async function fetchUserByEmail(email: string): Promise<IUser | null> {
  const client = createClient()
  const { data, error } = await client
    .from('users')
    .select('*, person(*)')
    .eq('email', email)
    .single()

  if (error) {
    return null
  }
  return data
}

interface IUserCreated {
  id?: string
  userName: string
  email: string
  photo: string
  role: string[] | null
  person: number
}

export async function createUser(user: IUserCreated): Promise<IUser | null> {
  const client = createClient()
  const { data, error } = await client.from('users').insert(user).single()

  console.log(data)
  console.log(error)
  if (error) {
    return null
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

export async function deleteUser(id: string): Promise<boolean> {
  const client = createClient()
  const { error } = await client.from('users').delete().eq('id', id)

  if (error) {
    return false
  }
  return true
}

export async function fetchUsers(): Promise<IUser[] | null> {
  const client = createClient()
  const { data, error } = await client
    .from('users')
    .select('*, person(*)')
    .order('id', { ascending: true })

  if (error) {
    return null
  }
  return data
}
