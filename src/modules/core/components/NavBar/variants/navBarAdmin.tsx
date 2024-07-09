'use client'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Navbar,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'

import { useAuthContext } from '@/provider'
import { ProfilePopover } from '@/modules/core'
import { usePathname } from 'next/navigation'
import { IconMenu2 } from '@tabler/icons-react'

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

export const NavBarAdmin = () => {
  const { user, logout, loading } = useAuthContext()

  const handleLogout = async () => {
    logout()
  }
  const pathname = usePathname()

  const handleOpenMenu = () => {
    const asideMenu = document.getElementById('aside-menu')
    const asideMenuBackdrop = document.getElementById('backdrop')
    if (asideMenu) {
      asideMenu.classList.toggle('hidden')
    }
    if (asideMenuBackdrop) {
      asideMenuBackdrop.classList.toggle('hidden')
    }
  }

  return (
    <Navbar
      maxWidth="full"
      isBlurred
      isBordered
      // height={64}
    >
      <NavbarContent
        justify="start"
        className="flex lg:hidden"
      >
        <Button
          isIconOnly
          size="sm"
          radius="sm"
          variant="light"
          onPress={handleOpenMenu}
        >
          <IconMenu2 size={24} />
        </Button>
      </NavbarContent>
      <NavbarContent
        justify="start"
        className="hidden lg:flex"
      >
        <section className="py-4 sticky top-16 z-30 w-full max-w-[1920px] mx-auto px-4 sm:px-6">
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
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ProfilePopover
            user={user}
            logout={handleLogout}
            loading={loading}
            isAdmin
          />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
