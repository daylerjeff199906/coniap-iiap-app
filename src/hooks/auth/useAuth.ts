// crea un hook para obtener el usuario del cookie y tambien que tenga para cerrar sesion

import { getCookie, deleteCookie, deleteLocalStorage } from '@/lib'
import { useEffect, useState } from 'react'
import { IResCookie, IUser } from '@/types'

export const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null)

  async function getUser() {
    const res: IResCookie = (await getCookie('user')) as IResCookie
    const value = JSON.parse(res.value)
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

  return { user, logout }
}
