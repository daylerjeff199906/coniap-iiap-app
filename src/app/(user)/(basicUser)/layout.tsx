'use client'
import { Banner } from '@/components'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Banner />
      <main>{children}</main>
    </>
  )
}
