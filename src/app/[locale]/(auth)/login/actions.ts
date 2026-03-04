'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/supabase/server'
import { cookies, headers } from 'next/headers'
import { PLATFORM_URL, getTrackingParamsString } from '@/utils/constants'

type LoginResponse = {
    error?: string
    redirectUrl?: string
}

export async function login(formData: FormData, locale: string = 'es'): Promise<LoginResponse> {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    // Verificar si el usuario ha completado el onboarding
    if (data.user) {
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('onboarding_completed')
            .eq('id', data.user.id)
            .single()

        if (profileError) {
            console.error('Error fetching profile:', profileError)
            revalidatePath('/', 'layout')
            return { redirectUrl: `/${locale}/dashboard` }
        }


        // Si no ha completado el onboarding, redirigir a onboarding
        if (!profile?.onboarding_completed) {
            revalidatePath('/', 'layout')
            return { redirectUrl: `/${locale}/onboarding` }
        }
    }


    // Preparar la redirección a la plataforma externa
    // Enviamos al login de la otra plataforma con el parámetro 'next' apuntando al dashboard + tracking params
    const nextPath = `/${locale}/dashboard${getTrackingParamsString()}`
    const redirectUrl = `${PLATFORM_URL}/${locale}/login?next=${encodeURIComponent(nextPath)}`

    revalidatePath('/', 'layout')
    return { redirectUrl }
}

export async function signup(formData: FormData) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signout() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.signOut()

    revalidatePath('/', 'layout')
    redirect('/login')
}

export async function loginWithGoogle(locale: string = 'es') {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    // Construct the absolute URL for the callback
    const headerList = await headers()
    const host = headerList.get('host')
    const protocol = host?.includes('localhost') ? 'http' : 'https'
    const origin = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${origin}/${locale}/auth/callback`,
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
        },
    })

    if (error) {
        console.error('Error signing in with Google:', error)
        return { error: error.message }
    }

    if (data.url) {
        redirect(data.url)
    }
}
