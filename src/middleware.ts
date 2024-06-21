import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { IUser } from './types'

// Define las rutas permitidas para cada rol
const rolePaths: { [key: string]: RegExp[] } = {
  admin: [/^\/admin(\/.*)?$/], // Admin puede acceder a cualquier ruta que empiece por /admin
  speaker: [/^\/dashboard(\/.*)?$/], // Speaker puede acceder a cualquier ruta que empiece por /dashboard
  speaker_mg: [/^\/dashboard(\/.*)?$/], // Speaker Manager tiene el mismo acceso que speaker
}

function getAllowedPathsForRole(role: string): RegExp[] {
  return rolePaths[role] || []
}

function getUrlByRole(role: string): string {
  switch (role) {
    case 'admin':
      return '/admin'
    case 'speaker':
    case 'speaker_mg':
      return '/dashboard'
    default:
      return '/'
  }
}

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('user')?.value
  const dataUser: IUser = currentUser ? JSON.parse(currentUser) : null

  const isAuthenticated = dataUser !== null

  const { pathname } = request.nextUrl

  // Verificar si la ruta solicitada es /admin o /dashboard
  const isProtectedPath =
    /^\/admin(\/.*)?$/.test(pathname) || /^\/dashboard(\/.*)?$/.test(pathname)

  if (isProtectedPath) {
    // Si no está autenticado, redirigir al login
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Si está autenticado, verificar que el rol tenga acceso a la ruta solicitada
    if (dataUser && dataUser.role) {
      const allowedPaths = getAllowedPathsForRole(dataUser.role)

      // Verifica si la ruta solicitada está permitida para el rol del usuario
      const isPathAllowed = allowedPaths.some((regex) => regex.test(pathname))

      if (isPathAllowed) {
        // Permite la navegación si la ruta es permitida
        return NextResponse.next()
      } else {
        // Redirige a la página correspondiente al rol si la ruta no está permitida
        const defaultUrlByRole = getUrlByRole(dataUser.role)
        return NextResponse.redirect(new URL(defaultUrlByRole, request.url))
      }
    }
  }

  // Si la ruta no está protegida o el usuario no tiene un rol válido, permite la navegación normal
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/admin/:path*', '/dashboard/:path*'], // Aplica el middleware a estas rutas
}
