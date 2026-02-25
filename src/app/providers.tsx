// app/providers.tsx
'use client'
import { AuthProvider } from '@/provider'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastContainer
        position="top-right"
        theme="colored"
      />
      {children}
    </AuthProvider>
  )
}
