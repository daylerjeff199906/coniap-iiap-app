'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/supabase/server'
import { cookies, headers } from 'next/headers'
import { getExternalLoginUrl, PLATFORM_URL } from '@/utils/constants'

type LoginResponse = {
    error?: string
    redirectUrl?: string
}

export async function login(formData: FormData, locale: string = 'es', nextPath?: string): Promise<LoginResponse> {
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

    // Verificar el rol del usuario para redirigir basado en la estructura de user_roles y roles
    if (data.user) {
        // Consultar el perfil para obtener el profile.id usando el auth_id
        const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('auth_id', data.user.id)
            .single()

        if (!profile) {
            console.error('No profile found for user:', data.user.id)
            // Proceder con fallback o error según convenga
        }

        // Consultar los roles del usuario asignados en user_roles usando el ID del perfil
        const { data: userRolesData, error: rolesError } = await supabase
            .from('user_roles')
            .select(`*, roles(*)`)
            .eq('profile_id', profile?.id || '')

        if (rolesError) {
            console.error('Error fetching user roles:', rolesError)
        }
        // Supabase retorna las relaciones foreign keys como un objeto "roles" por cada "user_roles" encontrado.
        const roles: string[] = userRolesData?.map((ur: any) => ur.roles?.name).filter(Boolean) || []

        // Mapa de roles internos de la aplicación y sus redirecciones
        const roleRedirects: Record<string, string> = {
            'admin': `/${locale}/admin`,
            'reviewer': `/${locale}/reviewer`, // Ejemplo adicional de tu esquema
            // Puedes agregar más roles fácilmente en el futuro...
        }

        // 1. Buscamos si el usuario tiene algún rol (ej. 'admin') que esté mapeado a la app interna
        for (const role of roles) {
            if (roleRedirects[role]) {
                revalidatePath('/', 'layout')
                return { redirectUrl: roleRedirects[role] }
            }
        }

        // 2. Si tiene el rol 'client', 'user', o si no tiene roles (por defecto lo consideramos un usuario normal)
        // lo mandamos hacia la otra plataforma
        if (roles.includes('client') || roles.includes('user') || roles.length === 0) {
            const nextParam = nextPath ? `?next=${encodeURIComponent(nextPath)}` : ''
            const redirectUrl = `${PLATFORM_URL}/${locale}/dashboard${nextParam}`

            revalidatePath('/', 'layout')
            return { redirectUrl }
        }

        // Fallback genérico para cualquier otro escenario
        revalidatePath('/', 'layout')
        return { redirectUrl: `/${locale}/admin` }
    }

    // Fallback absoluto por si data.user fuese nulo
    revalidatePath('/', 'layout')
    return { redirectUrl: `/${locale}/admin` }
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
