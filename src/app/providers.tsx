// app/providers.tsx
'use client'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/provider'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <AuthProvider>
        <ToastContainer />
        {children}
      </AuthProvider>
    </NextUIProvider>
  )
}
