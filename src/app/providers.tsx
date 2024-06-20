// app/providers.tsx
'use client'

import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <AuthProvider>
        <Toaster />
        {children}
      </AuthProvider>
    </NextUIProvider>
  )
}
