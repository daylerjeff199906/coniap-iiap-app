import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { IUser } from './types'

const routePermissions: Record<string, string[]> = {
  '/admin': ['admin', 'editor'],
  '/dashboard': ['speaker', 'speaker_mg'],
}

const roleRedirects: Record<string, string> = {
  admin: '/admin',
  editor: '/admin',
  speaker: '/dashboard',
  speaker_mg: '/dashboard',
}

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('user')?.value

  const user: IUser = currentUser ? JSON.parse(currentUser) : undefined

  const isAuthenticated = currentUser !== undefined
  const { pathname } = request.nextUrl

  if (pathname === '/login' && isAuthenticated) {
    const userRole = user?.role || user?.person?.typePerson
    const redirectPath = roleRedirects[userRole as string]
    if (redirectPath) {
      return NextResponse.redirect(new URL(redirectPath, request.url))
    }
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  for (const route in routePermissions) {
    if (pathname.startsWith(route)) {
      if (
        !routePermissions[route].includes(
          (user.role as string) || (user?.person?.typePerson as string)
        )
      ) {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/login'],
}
