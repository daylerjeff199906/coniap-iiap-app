'use client'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Navbar,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'

import { useAuthContext } from '@/provider'
import { ProfilePopover } from '@/modules/core'
import { usePathname } from 'next/navigation'

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

  return (
    <Navbar
      maxWidth="full"
      isBlurred
      isBordered
      // height={64}
    >
      {/* <NavbarBrand>Admin</NavbarBrand> */}
      <NavbarContent justify="start">
        <section className="py-4 sticky top-16 bg-white z-30 w-full max-w-[1920px] mx-auto px-4 sm:px-6">
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
