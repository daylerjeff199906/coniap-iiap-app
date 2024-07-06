'use client'
import { useState } from 'react'
import { fetchUsers } from '@/api'
import { IUser } from '@/types'

export function useUsers() {
  const [loading, setLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<IUser[] | null>(null)

  const getListUsers = async () => {
    setLoading(true)
    const users = await fetchUsers()

    if (users) {
      setUsers(users)
    } else {
      setUsers(null)
    }

    setLoading(false)
  }

  return {
    loading,
    users,
    getListUsers,
  }
}
