import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/supabase/server'
import { cookies } from 'next/headers'
import { PLATFORM_URL, getExternalLoginUrl } from '@/utils/constants'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ locale: string }> }
) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/dashboard'

    // Get locale from params
    const resolvedParams = await params
    const locale = resolvedParams.locale

    if (code) {
        const cookieStore = await cookies()
        const supabase = createClient(cookieStore)

        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // Verificar si el usuario ha completado el onboarding
            const { data } = await supabase.auth.getUser()

            if (data?.user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('id, onboarding_completed')
                    .eq('auth_id', data.user.id)
                    .single()
 
                if (profile) {
                    // Verificar rol del usuario
                    const { data: userRoles } = await supabase
                        .from('user_roles')
                        .select(`
                            role_id,
                            roles ( name )
                        `)
                        .eq('profile_id', profile.id)
 
                    // @ts-ignore
                    const rolesList = userRoles?.map((ur: any) => ur.roles?.name) || []
                    const isAdmin = rolesList.includes('admin')
 
                    const isProd = process.env.NEXT_PUBLIC_APP_URL?.includes('iiap.gob.pe') || process.env.NODE_ENV === 'production';
                    const adminBaseUrl = isProd ? 'https://coniap.iiap.gob.pe' : 'http://localhost:3004';
 
                    if (isAdmin) {
                        return NextResponse.redirect(`${adminBaseUrl}/${locale}/admin`)
                    }
 
                    // Si no ha completado el onboarding y es cliente/general, redirigimos a la app local
                    if (!profile?.onboarding_completed) {
                        return NextResponse.redirect(`${origin}/${locale}/onboarding`)
                    }
                }
            }
 
            // Para usuarios tipo cliente, se queda en la misma aplicación y respeta el locale
            // Check if next URL already contains a locale (fallback general)
            const nextUrl = next.startsWith(`/${locale}`) ? next : `/${locale}${next.startsWith('/') ? next : `/${next}`}`
            return NextResponse.redirect(`${origin}${nextUrl}`)
        }
    }

    // return the user to an error page with instructions or back to login
    return NextResponse.redirect(`${origin}/${locale}/login?error=auth-code-error`)
}
