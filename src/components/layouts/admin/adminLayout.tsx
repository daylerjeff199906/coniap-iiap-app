'use client'
import { usePathname } from 'next/navigation'
import {
  IconLayoutDashboard,
  IconCalendarEvent,
  IconCalendarMonth,
  IconUsers,
  IconFlag3,
  IconCategory2,
} from '@tabler/icons-react'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'

import { NavBar, AsideMenu } from '@/components'

import { IMenuAside } from '@/types'

const stroke = 1.5

export const menuAside: IMenuAside[] = [
  {
    id: '1',
    nameOption: 'Dashboard',
    titleOption: null,
    hrefLink: '/admin',
    icon: <IconLayoutDashboard stroke={stroke} />,
    subItems: null,
  },
  {
    id: '6',
    nameOption: 'Programas',
    titleOption: null,
    hrefLink: '/admin/programas',
    icon: <IconCalendarMonth stroke={stroke} />,
    subItems: null,
  },
  {
    id: '2',
    nameOption: 'Eventos',
    titleOption: null,
    hrefLink: '/admin/eventos',
    icon: <IconCalendarEvent stroke={stroke} />,
    subItems: null,
  },
  {
    id: '3',
    nameOption: 'Ponentes',
    titleOption: null,
    hrefLink: '/admin/ponentes',
    icon: <IconUsers stroke={stroke} />,
    subItems: null,
  },
  {
    id: '4',
    nameOption: 'Sponsors',
    titleOption: null,
    hrefLink: '/admin/sponsors',
    icon: <IconFlag3 stroke={stroke} />,
    subItems: null,
  },
  {
    id: '5',
    nameOption: 'Temáticas',
    titleOption: null,
    hrefLink: '/admin/tematicas',
    icon: <IconCategory2 stroke={stroke} />,
    subItems: null,
  },
]

const generateBreadcrumbItems = (pathname: string) => {
  const pathParts = pathname?.split('/').filter(Boolean)

  if (pathParts.length === 0) {
    return null
  }

  const capitalizeAndReplace = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ')
  }

  // Si la ruta actual es /admin, excluimos ese elemento y los siguientes
  const startIndex =
    pathParts.indexOf('admin') === -1 ? 0 : pathParts.indexOf('admin') + 1

  return pathParts.slice(startIndex).map((item, index) => (
    <BreadcrumbItem
      href={`/${pathParts.slice(0, startIndex + index + 1).join('/')}`}
      key={index}
      className="capitalize"
    >
      {capitalizeAndReplace(item)}
    </BreadcrumbItem>
  ))
}

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  return (
    <div className="flex gap-4">
      <aside className="w-80 bg-gray-100 h-screen sticky top-0 overflow-y-auto">
        <AsideMenu menuAside={menuAside} />
      </aside>
      <main className="w-full">
        <NavBar variant="admin" />
        <section className="px-6 py-4 sticky top-16 bg-white container z-30">
          {pathname !== null && (
            <Breadcrumbs
              className="text-sm"
              color="primary"
              size="sm"
            >
              <BreadcrumbItem
                href="/admin"
                key={'home'}
              >
                Inicio
              </BreadcrumbItem>
              {generateBreadcrumbItems(pathname)}
            </Breadcrumbs>
          )}
        </section>
        <section className="w-full container">{children}</section>
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
