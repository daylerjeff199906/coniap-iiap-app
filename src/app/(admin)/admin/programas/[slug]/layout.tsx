'use client'
import { EventToProgramProvider } from '@/providers'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EventToProgramProvider>{children}</EventToProgramProvider>
    </>
  )
}
