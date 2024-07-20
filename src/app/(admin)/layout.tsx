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
            id: 'all',
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

//   id: '3',
//   nameOption: 'Participantes',
//   titleOption: null,
//   hrefLink: null,
//   icon: (
//     <IconUsers
//       stroke={stroke}
//       size={size}
//     />
//   ),
//   subItems: [
//     {
//       id: 'all',
//       nameOption: 'Todos',
//       titleOption: null,
//       url: '/admin/participantes',
//     },
//     {
//       id: 'speakers',
//       nameOption: 'Ponentes',
//       titleOption: null,
//       url: '/admin/participantes/ponentes',
//     },
//     {
//       id: 'asistens',
//       nameOption: 'Asistentes',
//       titleOption: null,
//       url: '/admin/participantes/asistentes',
//     },
//     {
//       id: 'summary',
//       nameOption: 'Resúmenes',
//       titleOption: null,
//       url: '/admin/participantes/resumenes',
//     },
//   ],
// },
