import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { IUser } from './types'

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('user')?.value
  const dataUser: IUser = currentUser ? JSON.parse(currentUser) : null

  const isAuthenticated = dataUser !== undefined

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const { pathname } = request.nextUrl

  if (dataUser.role === 'admin' && pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  if (
    dataUser.role !== 'participant' &&
    dataUser.role !== 'admin' &&
    pathname.startsWith('/dashboard')
  ) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  //   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}
