/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { IUser } from '@/types'

export const AuthContext = createContext({
  user: null as IUser | null,
  logout: () => {},
  loading: false,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, logout, loading, getUser } = useAuth()

  useEffect(() => {
    getUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: user,
        logout: logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
