/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react'
import { fetchPersonByEmail } from '@/api'
import { IPerson, IUser } from '@/types'
import { getCookie } from '@/lib'

export const AuthContext = createContext<{
  myPerson: IPerson | null
}>({
  myPerson: null,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [myPerson, setMyPerson] = useState<IPerson | null>(null)
  const user: IUser = getCookie('user') as unknown as IUser

  const getPerson = async () => {
    const res = await fetchPersonByEmail(user.email)
    if (res) {
      setMyPerson(res)
    }
  }

  useEffect(() => {
    getPerson()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        myPerson,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
