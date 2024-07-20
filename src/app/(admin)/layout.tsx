import { PanelLayout } from '@/modules/admin'
import { menuSideBar as menu } from '@/modules/admin'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PanelLayout menuAside={menu}>{children}</PanelLayout>
    </>
  )
}
