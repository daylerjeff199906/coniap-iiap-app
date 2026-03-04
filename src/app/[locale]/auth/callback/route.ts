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
            // Check if next URL already contains a locale
            const nextUrl = next.startsWith(`/${locale}`) ? next : `/${locale}${next.startsWith('/') ? next : `/${next}`}`
            return NextResponse.redirect(`${origin}${nextUrl}`)
        }
    }

    // return the user to an error page with instructions or back to login
    return NextResponse.redirect(`${origin}/${locale}/login?error=auth-code-error`)
}
