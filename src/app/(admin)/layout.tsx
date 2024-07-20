import { PanelLayout } from '@/modules/admin'
import { IMenuSideBar } from '@/types'

const menu: IMenuSideBar[] = [
  {
    id: '1',
    section: 'Inicio',
    items: [
      {
        id: 'home',
        icon: 'dashboard',
        title: 'Dashboard',
        href: '/admin',
        moreItems: [],
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
        moreItems: [],
      },
      {
        id: 'events',
        icon: 'presentation-analytics',
        title: 'Eventos',
        moreItems: [
          {
            id: 'all-events',
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
  {
    id: '3',
    section: 'Participantes',
    items: [
      {
        id: 'participants',
        icon: 'users',
        title: 'Participantes',
        moreItems: [
          {
            id: 'all-participants',
            title: 'Todos',
            href: '/admin/participantes',
          },
          {
            id: 'speakers',
            title: 'Ponentes',
            href: '/admin/participantes/ponentes',
          },
          {
            id: 'asistens',
            title: 'Asistentes',
            href: '/admin/participantes/asistentes',
          },
        ],
      },
      {
        id: 'summary',
        icon: 'users',
        title: 'Resúmenes',
        href: '/admin/participantes/resumenes',
        moreItems: [],
      },
    ],
  },
  {
    id: '4',
    section: 'Información General',
    items: [
      {
        id: 'sponsors',
        icon: 'flag-3',
        title: 'Sponsors',
        href: '/admin/sponsors',
        moreItems: [],
      },
      {
        id: 'topics',
        icon: 'stack-3',
        title: 'Temáticas',
        href: '/admin/tematicas',
        moreItems: [],
      },
    ],
  },
  {
    id: '5',
    section: 'Configuración',
    items: [
      {
        id: 'users',
        icon: 'user-cog',
        title: 'Usuarios',
        href: '/admin/users',
        moreItems: [],
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
