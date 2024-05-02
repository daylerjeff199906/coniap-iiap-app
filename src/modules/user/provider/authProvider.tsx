/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { fetchPersonByEmail } from '@/api'
import { IPerson, IUser } from '@/types'
import { getCookie } from '@/lib'

interface ICookieRes {
  name: string
  path: string
  value: string
}

export const AuthContext = createContext<{
  myPerson: IPerson | null
  getUser: () => void
}>({
  myPerson: null,
  getUser: () => null,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [myPerson, setMyPerson] = useState<IPerson | null>(null)
  const [user, setUser] = useState<IUser | null>(null)

  const getUser = async () => {
    const user: ICookieRes = (await getCookie('user')) as unknown as ICookieRes
    const dataParse = await JSON.parse(user.value as unknown as string)
    setUser(dataParse)
  }

  const getPerson = async () => {
    if (user) {
      const res = await fetchPersonByEmail(user.email)
      if (res) {
        setMyPerson(res)
      }
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    getPerson()
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        myPerson,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
