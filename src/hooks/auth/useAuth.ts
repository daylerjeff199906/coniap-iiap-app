import { getLocalStorage, deleteCookie, deleteLocalStorage } from '@/lib'
import { useEffect, useState } from 'react'
import { IUser } from '@/types'

export const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null)

  async function getUser() {
    const user = await getLocalStorage('user')
    const value = user ? user : null
    setUser(value)
  }

  useEffect(() => {
    getUser()
  }, [])

  const logout = () => {
    deleteCookie('user')
    deleteLocalStorage('user')
    setUser(null)
  }

  return { user, logout, getUser }
}
