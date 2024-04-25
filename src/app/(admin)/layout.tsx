import { AdminLayout } from '@/components'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminLayout>{children}</AdminLayout>
    </>
  )
}
