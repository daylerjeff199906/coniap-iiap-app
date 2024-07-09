'use server'
import { createClient } from '@/utils/supabase/server'
import { IUser, IUserCreated } from '@/types'

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

export async function fetchUserById(id: number): Promise<IUser | null> {
  const client = createClient()
  const { data, error } = await client
    .from('users')
    .select('*, person(*)')
    .eq('id', id)
    .single()

  if (error) {
    return null
  }
  return data
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

export async function fetchUsers(query?: string): Promise<IUser[] | null> {
  const client = createClient()

  let users = client.from('users').select('*, person(*)')

  if (query) {
    users = users.textSearch('userName', query)
  }

  const { data, error } = await users

  if (error) {
    return null
  }
  return data
}
