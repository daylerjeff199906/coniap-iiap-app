import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { IUser } from './types'

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('user')?.value
  const dataUser: IUser = currentUser ? JSON.parse(currentUser) : null

  if (!currentUser && dataUser && dataUser?.role !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (
    dataUser &&
    dataUser?.role === 'admin' &&
    request.nextUrl.pathname === '/admin'
  ) {
    return NextResponse.next()
  }
  // return NextResponse.redirect(new URL('/login', request.url))
  return NextResponse.next()
}

export const config = {
  //   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  matcher: ['/admin/:path*'],
}
