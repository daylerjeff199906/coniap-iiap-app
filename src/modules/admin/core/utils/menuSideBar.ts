import { IMenuSideBar } from '@/types'

export const menuSideBar: IMenuSideBar[] = [
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
        icon: 'cards',
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
        icon: 'text',
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
        icon: 'sponsors',
        title: 'Sponsors',
        href: '/admin/sponsors',
        moreItems: [],
      },
      {
        id: 'topics',
        icon: 'categories',
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
        icon: 'usersConfig',
        title: 'Usuarios',
        href: '/admin/users',
        moreItems: [],
      },
    ],
  },
]
