import { PanelLayout } from '@/modules/admin'
import { IMenuSideBar } from '@/types'

const menu: IMenuSideBar[] = [
  {
    id: '1',
    section: 'Inicio',
    items: [
      {
        id: 'home',
        icon: 'home',
        title: 'Dashboard',
        href: '/admin',
      },
    ],
  },
  {
    id: '2',
    section: 'Programación',
    items: [
      {
        id: 'programs',
        icon: 'calendar',
        title: 'Programas',
        href: '/admin/programas',
      },
      {
        id: 'events',
        icon: 'presentation-analytics',
        title: 'Eventos',
        moreItems: [
          {
            id: 'all',
            title: 'Lista',
            href: '/admin/eventos',
          },
          {
            id: 'calendar',
            title: 'Calendario',
            href: '/admin/eventos/calendario',
          },
        ],
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
