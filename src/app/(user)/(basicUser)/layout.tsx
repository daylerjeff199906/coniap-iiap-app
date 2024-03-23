'use client'
import { usePathname } from 'next/navigation'
import { Banner } from '@/components'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isUser = pathname.includes('eventos')
  const contaiterClass = !isUser && 'container'

  return (
    <>
      <Banner />
      <main className={`${contaiterClass}`}>{children}</main>
    </>
  )
}
