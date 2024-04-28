/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState } from 'react'
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

  if (user) {
    const person: IPerson = fetchPersonByEmail(user.email) as unknown as IPerson
    setMyPerson(person)
  }

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
