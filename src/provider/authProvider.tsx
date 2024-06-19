'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { IUser } from '@/types'

export const AuthContext = createContext({
  user: null as IUser | null,
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth()
  const [auth, setAuth] = useState({ user, logout })

  useEffect(() => {
    setAuth({ user, logout })
  }, [user])

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)
