import { NavBar } from '@/components'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}
