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
                    const isIiapDomain = request.nextUrl.hostname.endsWith('iiap.gob.pe')
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, {
                            ...options,
                            domain: isIiapDomain ? '.iiap.gob.pe' : undefined,
                            path: '/',
                        })
                    )
                },
            },
        }
    )

    // 3. Revisamos el estado de autenticación
    const { data: { user } } = await supabase.auth.getUser()

    const url = request.nextUrl.clone()
    const pathname = url.pathname

    const isDev = request.nextUrl.hostname === 'localhost' || request.nextUrl.hostname === '127.0.0.1';
    const loginBaseUrl = isDev ? 'http://localhost:3003' : 'https://auth.iiap.gob.pe';

    // Determinamos patrones de ruta ignorando prefijos de idioma explícitos
    const isLoginPage = /^\/(es|en)\/login(?:\/|$)/.test(pathname) || /^\/login(?:\/|$)/.test(pathname);
    const isAdminRoute = /^\/(es|en)\/admin(?:\/|$)/.test(pathname) || /^\/admin(?:\/|$)/.test(pathname);

    // Si intenta ir a login localmente, redirigir al centralizado
    if (isLoginPage) {
        const locale = pathname.split('/')[1] === 'en' ? 'en' : 'es';
        return NextResponse.redirect(new URL(`${loginBaseUrl}/${locale}/login`, request.url));
    }

    // Redirecciones seguras para usuarios no autenticados en rutas protegidas
    if (!user && isAdminRoute) {
        const locale = pathname.split('/')[1] === 'en' ? 'en' : 'es';
        return NextResponse.redirect(new URL(`${loginBaseUrl}/${locale}/login`, request.url));
    }

    if (user && isAdminRoute) {
        // Consultar el perfil para obtener el profile.id usando el auth_id
        const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('auth_id', user.id)
            .single()

        if (profile) {
            // Consultar los roles del usuario asignados en user_roles usando el ID del perfil
            const { data: userRolesData } = await supabase
                .from('user_roles')
                .select(`*, roles:role_id(*)`)
                .eq('profile_id', profile.id)

            const roles: string[] = userRolesData?.map((ur: any) => ur.roles?.name).filter(Boolean) || []
            const hasAdminRole = roles.map(r => r.toLowerCase()).includes('admin')

            if (!hasAdminRole) {
                const locale = pathname.split('/')[1] === 'en' ? 'en' : 'es';
                return NextResponse.redirect(new URL(`/${locale}/not-authorized`, request.url));
            }
        } else {
            // Fallback si no hay perfil en este sistema
            const locale = pathname.split('/')[1] === 'en' ? 'en' : 'es';
            return NextResponse.redirect(new URL(`/${locale}/not-authorized`, request.url));
        }
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
