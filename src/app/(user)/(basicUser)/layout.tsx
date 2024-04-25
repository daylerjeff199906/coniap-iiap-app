'use client'
import { usePathname } from 'next/navigation'
import { Banner } from '@/components'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      <Banner />
      <main>{children}</main>
    </>
  )
}
