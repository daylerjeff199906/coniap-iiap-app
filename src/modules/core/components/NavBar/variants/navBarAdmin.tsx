'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

import { useAuthContext } from '@/provider'
import { ProfilePopover } from '@/modules/core'
import { usePathname } from 'next/navigation'
import { IconMenu2 } from '@tabler/icons-react'
import React from 'react'

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

  return pathParts.slice(startIndex).map((item, index, array) => {
    const isLast = index === array.length - 1
    const href = `/${pathParts.slice(0, startIndex + index + 1).join('/')}`

    return (
      <React.Fragment key={index}>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage>{capitalizeAndReplace(item)}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href={href}>{capitalizeAndReplace(item)}</BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </React.Fragment>
    )
  })
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
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={handleOpenMenu}
            className="lg:hidden"
          >
            <IconMenu2 size={24} />
          </Button>

          <div className="hidden lg:block">
            {pathname !== null && (
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/admin">Inicio</BreadcrumbLink>
                  </BreadcrumbItem>
                  {generateBreadcrumbItems(pathname)}
                </BreadcrumbList>
              </Breadcrumb>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ProfilePopover
            user={user}
            logout={handleLogout}
            loading={loading}
            isAdmin
          />
        </div>
      </div>
    </header>
  )
}
