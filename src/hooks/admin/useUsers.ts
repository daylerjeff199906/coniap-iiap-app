'use client'
import { useState } from 'react'
import { fetchUsers, fetchUserByEmail } from '@/api'
import { IUser } from '@/types'

interface IFilter {
  column?: 'userName' | 'email'
  query?: string
}

export function useUsers() {
  const [loading, setLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<IUser[] | null>(null)
  const [user, setUser] = useState<IUser | null>(null)

  const getListUsers = async (props: IFilter) => {
    const { query, column } = props
    setLoading(true)
    const users = await fetchUsers({
      column,
      query,
    })

    if (users) {
      setUsers(users)
    } else {
      setUsers(null)
    }

    setLoading(false)
  }

  const getUserByEmail = async (email: string) => {
    setLoading(true)
    const user = await fetchUserByEmail(email)

    if (user) {
      setUser(user)
    } else {
      setUser(null)
    }

    setLoading(false)
  }

  return {
    loading,
    users,
    user,
    getUserByEmail,
    getListUsers,
  }
}
