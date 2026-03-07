import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const handleI18nRouting = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
    // 1. Aplicar enrutamiento de Next-intl primero
    let response = handleI18nRouting(request);

    // 2. Integrar Supabase SSR Cliente interceptando cookies
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    response = handleI18nRouting(request)
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // 3. Revisamos el estado de autenticación
    const { data: { user } } = await supabase.auth.getUser()

    const url = request.nextUrl.clone()
    const pathname = url.pathname

    // Determinamos patrones de ruta ignorando prefijos de idioma explícitos
    const isLoginPage = /^\/(es|en)\/login(?:\/|$)/.test(pathname) || /^\/login(?:\/|$)/.test(pathname)
    const isAdminRoute = /^\/(es|en)\/admin(?:\/|$)/.test(pathname) || /^\/admin(?:\/|$)/.test(pathname)

    // Redirecciones seguras para usuarios autenticados y no autenticados
    if (user && isLoginPage) {
        url.pathname = pathname.replace('/login', '/admin') || '/admin'
        return NextResponse.redirect(url)
    }

    if (!user && isAdminRoute) {
        url.pathname = pathname.replace('/admin', '/login') || '/login'
        return NextResponse.redirect(url)
    }

    return response;
}

export const config = {
    // Match only internationalized pathnames
    matcher: [
        // Match root
        '/',
        // Match locales
        '/(es|en)/:path*',
        // Match all except static files, api, etc.
        '/((?!api|_next|_static|_vercel|.*\\..*).*)'
    ]
};
