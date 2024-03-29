/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react'

import { usePrograms, useEvents, useFiles } from '@/hooks/admin'
import { IEvent, IProgram } from '@/types'

import { getCurrentUser } from '@/auth/supaBaseAuth'

export const authProvider = createContext<{}>({})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser()
      setUser(user)
    }
    getUser()
  }, [])
  console.log('user', user)

  return <authProvider.Provider value={{}}>{children}</authProvider.Provider>
}

export const useAuth = () => useContext(authProvider)
