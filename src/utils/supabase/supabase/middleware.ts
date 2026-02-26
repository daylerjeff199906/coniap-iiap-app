import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest, response?: NextResponse) {
    let supabaseResponse = response || NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const pathname = request.nextUrl.pathname;
    const isAuthPath = pathname.split('/').some(segment =>
        ['login', 'auth', 'signup', 'reset-password'].includes(segment)
    );

    if (!user && !isAuthPath) {
        const url = request.nextUrl.clone()
        // If we want to preserve the locale, we should be careful.
        // For now, let's just let next-intl handle the locale if we redirect to a plain path,
        // or check if there's a locale prefix.
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    return supabaseResponse
}
