'use server'

import { createClient } from '@/utils/supabase/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { IProfile } from '@/types/profile'

export async function getProfiles(page: number = 1, pageSize: number = 30, query?: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let supabaseQuery = supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })

    if (query) {
        supabaseQuery = supabaseQuery.or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%,institution.ilike.%${query}%`)
    }

    const { data, count, error } = await supabaseQuery.range(from, to)

    if (error) {
        console.error('Error fetching profiles:', error)
        return { data: [], count: 0 }
    }

    return { data: data as IProfile[], count: count || 0 }
}

export async function getProfileById(id: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching profile:', error)
        return null
    }

    return data as IProfile
}

export async function updateProfilePersonal(id: string, values: Partial<IProfile>) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase
        .from('profiles')
        .update(values)
        .eq('id', id)

    if (error) {
        console.error('Error updating profile:', error)
        return { error: 'No se pudo actualizar el perfil.' }
    }

    revalidatePath(`/admin/users/${id}`)
    revalidatePath(`/admin/users`)
    return { success: true }
}

export async function updateAvatar(url: string, profileId?: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    // If profileId is not provided, we try to get the current user's profile
    let targetProfileId = profileId

    if (!targetProfileId) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return { error: 'No autenticado' }

        const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('auth_id', user.id)
            .single()

        if (!profile) return { error: 'Perfil no encontrado' }
        targetProfileId = profile.id
    }

    const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: url === '' ? null : url })
        .eq('id', targetProfileId)

    if (error) {
        console.error('Error updating avatar:', error)
        return { error: 'Error al actualizar el avatar en la base de datos' }
    }

    revalidatePath(`/admin/users/${targetProfileId}`)
    return { success: true }
}
