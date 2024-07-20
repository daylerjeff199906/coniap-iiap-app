import { PanelLayout } from '@/modules/admin'
import { IMenuSideBar } from '@/types'

const menu: IMenuSideBar[] = [
  {
    id: '1',
    section: 'Inicio',
    items: [
      {
        id: '1',
        icon: 'home',
        title: 'Dashboard',
        href: '/admin',
      },
    ],
  },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PanelLayout menuAside={menu}>{children}</PanelLayout>
    </>
  )
}
