'use client'
import { usePathname } from 'next/navigation'
import { NavBar } from '@/components'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'

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
      <aside className="w-80"></aside>
      <main className="w-full">
        <NavBar variant="admin" />
        <section className="px-6 py-1 sticky top-16 bg-white container z-30">
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
        <section className="w-full container py-6">{children}</section>
      </main>
    </div>
  )
}
