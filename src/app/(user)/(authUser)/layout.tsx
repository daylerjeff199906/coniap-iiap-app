'use client'
import { BannerStatic } from '@/components'
import { TabsSections, AuthProvider } from '@/modules/user'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TabsSections />
      <section className="container flex flex-col gap-4 py-4">
        <main className="w-full sm:p-4 lg:p-6 min-h-72">{children}</main>
      </section>
    </AuthProvider>
  )
}
