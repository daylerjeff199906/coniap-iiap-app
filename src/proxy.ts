// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { IUser } from './types'

// const routePermissions: Record<string, string[]> = {
//   '/admin': ['admin', 'editor'],
//   '/dashboard': ['speaker', 'user'],
// }

// export function proxy(request: NextRequest) {
//   const currentUser = request.cookies.get('user')?.value

//   const user: IUser = currentUser ? JSON.parse(currentUser) : undefined

//   const isAuthenticated = currentUser !== undefined
//   const { pathname } = request.nextUrl

//   if (!isAuthenticated) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   for (const route in routePermissions) {
//     if (pathname.startsWith(route)) {
//       // if (!routePermissions[route].includes(user.role)) {
//       //   return NextResponse.redirect(new URL('/unauthorized', request.url))
//       // }
//       const userHasPermission = user?.role?.some((userRole) =>
//         routePermissions[route].includes(userRole)
//       )

//       // Redirigir a /unauthorized si el usuario no tiene el rol necesario
//       if (!userHasPermission) {
//         return NextResponse.redirect(new URL('/unauthorized', request.url))
//       }
//     }
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/admin/:path*', '/dashboard/:path*'],
// }

import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';
import { updateSession } from './utils/supabase/supabase/middleware';

const handleI18nRouting = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  // Handle i18n routing
  const response = handleI18nRouting(request);

  // Update Supabase session
  // Note: we pass the request to updateSession, which might modify the response cookies
  return await updateSession(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match root
    '/',
    // Match locales
    '/(es|en)/:path*',
    // Match all except static files
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)'
  ]
};
