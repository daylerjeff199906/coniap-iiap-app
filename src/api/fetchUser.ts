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
  const { data, error } = await client
    .from('users')
    .insert(user)
    .select('*')
    .single()

  if (error) {
    return null
  }
  return data
}

export async function updateUser(user: IUserCreated): Promise<IUser | null> {
  const client = createClient()
  const { data, error } = await client
    .from('users')
    .update(user)
    .eq('id', user.id)
    .select('*')
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

export async function updateFieldUser(
  id: string,
  field: string,
  value: any
): Promise<boolean> {
  const client = createClient()
  const { error } = await client
    .from('users')
    .update({ [field]: value })
    .eq('id', id)

  if (error) {
    return false
  }
  return true
}

interface IFilter {
  query?: string
  column?: 'userName' | 'email'
  page?: number
  limit?: number
}

export async function fetchUsers(
  props: IFilter
): Promise<{ data: IUser[] | null; count: number | null } | null> {
  const { query, column, page, limit } = props
  const client = createClient()

  let users = client
    .from('users')
    .select('*, person(*)', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (column === 'userName') {
    users = users.ilike('userName', `%${query}%`)
  } else if (column === 'email') {
    users = users.ilike('email', `%${query}%`)
  }

  if (page && limit) {
    users = users.range((page - 1) * limit, page * limit - 1)
  }

  const { data, error, count } = await users

  if (error) {
    return null
  }
  return { data, count }
}
