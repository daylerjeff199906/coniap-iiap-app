/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { createContext, useContext, useEffect } from 'react'
import { useAuth } from '@/hooks/auth'
import { IUser } from '@/types'
import { createCookie } from '@/lib'

export const AuthContext = createContext({
  user: null as IUser | null,
  logout: () => {},
  loading: false,
  setUserData: (user: IUser | null) => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, logout, loading, getUser, setUser } = useAuth()

  useEffect(() => {
    getUser()
  }, [])

  const setUserData = async (user: IUser | null) => {
    setUser(user)
    if (user) {
      await createCookie('user', JSON.stringify(user))
    } else {
      await createCookie('user', '')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: user,
        logout: logout,
        loading,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
