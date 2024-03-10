import { Banner } from '@/components'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Banner />
      <main className="container">{children}</main>
    </>
  )
}
