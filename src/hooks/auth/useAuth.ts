import { getCookie, deleteCookie, deleteLocalStorage } from '@/lib'
import { useEffect, useState } from 'react'
import { IResCookie, IUser } from '@/types'

export const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null)

  async function getUser() {
    const res: IResCookie = (await getCookie('user')) as IResCookie
    const value = res ? JSON.parse(res.value) : null
    if (res) {
      setUser(value)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const logout = () => {
    deleteCookie('user')
    deleteLocalStorage('user')
    setUser(null)
  }

  return { user, logout, setUser }
}
