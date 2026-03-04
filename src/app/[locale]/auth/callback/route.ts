import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/supabase/server'
import { cookies } from 'next/headers'

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
                    .select('onboarding_completed')
                    .eq('id', data.user.id)
                    .single()

                // Si no ha completado el onboarding, redirigimos a la app local
                if (!profile?.onboarding_completed) {
                    return NextResponse.redirect(`${origin}/${locale}/onboarding`)
                }
            }

            // Si ha terminado onboarding y el destino es el dashboard
            if (next.includes('/dashboard')) {
                const platformUrl = 'https://herp-science-platform-bio-intranet.vercel.app'
                const trackingParams = '?source=coniap&event=CONIAP_2024&edition=3&type=convocatoria'
                return NextResponse.redirect(`${platformUrl}/${locale}/dashboard${trackingParams}`)
            }

            // Check if next URL already contains a locale (fallback general)
            const nextUrl = next.startsWith(`/${locale}`) ? next : `/${locale}${next.startsWith('/') ? next : `/${next}`}`
            return NextResponse.redirect(`${origin}${nextUrl}`)
        }
    }

    // return the user to an error page with instructions or back to login
    return NextResponse.redirect(`${origin}/${locale}/login?error=auth-code-error`)
}
