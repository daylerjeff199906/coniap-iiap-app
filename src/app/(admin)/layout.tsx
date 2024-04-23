// 'use client'
import { AdminLayout } from '@/components'

export default function Layout({
  admin,
  children,
}: {
  admin: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <>
      <AdminLayout>
        {admin}
        {children}
      </AdminLayout>
    </>
  )
}
