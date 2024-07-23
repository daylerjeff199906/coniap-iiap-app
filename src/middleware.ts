import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { IUser } from './types'

const routePermissions: Record<string, string[]> = {
  '/admin': ['admin', 'editor'],
  '/dashboard': ['speaker'],
}

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('user')?.value

  const user: IUser = currentUser ? JSON.parse(currentUser) : undefined

  const isAuthenticated = currentUser !== undefined
  const { pathname } = request.nextUrl

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  for (const route in routePermissions) {
    if (pathname.startsWith(route)) {
      // if (!routePermissions[route].includes(user.role)) {
      //   return NextResponse.redirect(new URL('/unauthorized', request.url))
      // }
      const userHasPermission = user?.role?.some((userRole) =>
        routePermissions[route].includes(userRole)
      )

      // Redirigir a /unauthorized si el usuario no tiene el rol necesario
      if (!userHasPermission) {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}
