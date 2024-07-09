'use client'
import {
  IconLayoutDashboard,
  IconCalendarEvent,
  IconUsers,
  IconFlag3,
  IconPresentationAnalytics,
  IconStack3,
  IconUserCog,
} from '@tabler/icons-react'

import { NavBar } from '@/modules/core'
import { AsideMenu } from '@/modules/admin'

import { IMenuAside } from '@/types'

const stroke = 1.5
const size = 18

export const menuAside: IMenuAside[] = [
  {
    id: '1',
    nameOption: 'Dashboard',
    titleOption: null,
    hrefLink: '/admin',
    icon: (
      <IconLayoutDashboard
        stroke={stroke}
        size={size}
      />
    ),
    subItems: null,
  },
  {
    id: '6',
    nameOption: 'Programas',
    titleOption: null,
    hrefLink: '/admin/programas',
    icon: (
      <IconCalendarEvent
        stroke={stroke}
        size={size}
      />
    ),
    subItems: null,
  },
  {
    id: '2',
    nameOption: 'Eventos',
    titleOption: null,
    hrefLink: null,
    icon: (
      <IconPresentationAnalytics
        stroke={stroke}
        size={size}
      />
    ),
    subItems: [
      {
        id: 'all',
        nameOption: 'Lista',
        titleOption: null,
        url: '/admin/eventos',
      },
      {
        id: 'calendar',
        nameOption: 'Calendario',
        titleOption: null,
        url: '/admin/eventos/calendario',
      },
    ],
  },
  {
    id: '3',
    nameOption: 'Participantes',
    titleOption: null,
    hrefLink: null,
    icon: (
      <IconUsers
        stroke={stroke}
        size={size}
      />
    ),
    subItems: [
      {
        id: 'all',
        nameOption: 'Todos',
        titleOption: null,
        url: '/admin/participantes',
      },
      {
        id: 'speakers',
        nameOption: 'Ponentes',
        titleOption: null,
        url: '/admin/participantes/ponentes',
      },
      {
        id: 'asistens',
        nameOption: 'Asistentes',
        titleOption: null,
        url: '/admin/participantes/asistentes',
      },
      {
        id: 'summary',
        nameOption: 'Resúmenes',
        titleOption: null,
        url: '/admin/participantes/resumenes',
      },
    ],
  },
  {
    id: '4',
    nameOption: 'Sponsors',
    titleOption: null,
    hrefLink: '/admin/sponsors',
    icon: (
      <IconFlag3
        stroke={stroke}
        size={size}
      />
    ),
    subItems: null,
  },
  {
    id: '5',
    nameOption: 'Temáticas',
    titleOption: null,
    hrefLink: '/admin/tematicas',
    icon: (
      <IconStack3
        stroke={stroke}
        size={size}
      />
    ),
    subItems: null,
  },
  {
    id: '7',
    nameOption: 'Usuarios',
    titleOption: null,
    hrefLink: '/admin/users',
    icon: (
      <IconUserCog
        stroke={stroke}
        size={size}
      />
    ),
    subItems: null,
  },
]

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const handleCloseMenu = () => {
    const asideMenu = document.getElementById('aside-menu')
    const backdrop = document.getElementById('backdrop')
    if (asideMenu) {
      asideMenu.classList.add('hidden')
    }
    if (backdrop) {
      backdrop.classList.add('hidden')
    }
  }

  return (
    <div className="flex w-full">
      <div
        id="backdrop"
        className="bg-black/20 w-full h-full fixed top-0 left-0 z-50 bottom-0 hidden"
        onClick={handleCloseMenu}
      />
      <aside
        className="w-52 min-w-52 max-w-52 bg-gray-100 h-screen fixed z-50 lg:sticky top-0 overflow-y-auto hidden lg:block"
        id="aside-menu"
      >
        <AsideMenu menuAside={menuAside} />
      </aside>
      <main className="w-full">
        <NavBar variant="admin" />
        <main className="w-full max-w-[1920px] mx-auto p-4 sm:p-6">
          {children}
        </main>
        <footer className="w-full  p-4 text-center">
          <h3 className="text-sm">
            Realizado con ❤️ por el equipo de desarrollo de GESCON | Todos los
            derechos reservados © {new Date().getFullYear()}
          </h3>
        </footer>
      </main>
    </div>
  )
}
