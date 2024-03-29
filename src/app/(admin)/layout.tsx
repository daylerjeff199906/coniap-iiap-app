'use client'
import { AdminLayout } from '@/components'
import { AuthProvider } from '@/providers'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <AdminLayout>{children}</AdminLayout>
      </AuthProvider>
    </>
  )
}
