import { deleteCookie, getCookie } from '@/lib'
import { useState } from 'react'
import { IUser } from '@/types'
import { useRouter } from 'next/navigation'
import { IResCookie } from '@/types'

export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<IUser | null>(null)
  const router = useRouter()

  async function getUser() {
    setLoading(true)
    const resCookie: IResCookie = (await getCookie('user')) as IResCookie
    const user: IUser = resCookie ? await JSON.parse(resCookie.value) : null
    const value = user ? user : null
    setUser(value)
    setLoading(false)
  }

  const logout = async () => {
    await deleteCookie('user')
    setUser(null)
    router.push('/')
  }

  return { user, logout, getUser, loading, setUser }
}
