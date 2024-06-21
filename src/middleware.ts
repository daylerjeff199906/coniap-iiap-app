import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { IUser } from './types'

function getUrlByRole(role: string) {
  switch (role) {
    case 'admin':
      return '/admin'
    case 'speaker':
      return '/dashboard'
    case 'speaker_mg':
      return '/dashboard'
    case 'participant':
      return '/'
    default:
      return '/login'
  }
}

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('user')?.value
  const dataUser: IUser = currentUser ? JSON.parse(currentUser) : null

  const isAuthenticated = dataUser !== undefined

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const { pathname } = request.nextUrl

  if (dataUser && dataUser.role) {
    const urlByRole = getUrlByRole(dataUser.role)
    if (pathname === urlByRole) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL(urlByRole, request.url))
  }

  return NextResponse.next()
}

export const config = {
  //   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}
