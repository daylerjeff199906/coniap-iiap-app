'use server'

import { createClient } from '@/utils/supabase/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { ICall } from '@/types/call'

export async function getCalls(filters?: {
    eventId?: string,
    editionId?: string,
    isActive?: boolean
}) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    let query = supabase
        .from('event_calls')
        .select(`
            *,
            main_events (
                name
            ),
            editions (
                name,
                year
            ),
            participant_roles (
                id,
                name,
                slug,
                badge_color
            )
        `)
        .order('created_at', { ascending: false })

    if (filters?.eventId) {
        query = query.eq('main_event_id', filters.eventId)
    }

    if (filters?.editionId) {
        query = query.eq('edition_id', filters.editionId)
    }

    if (filters?.isActive !== undefined) {
        query = query.eq('is_active', filters.isActive)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching calls:', error)
        return []
    }

    return data as ICall[]
}

export async function getCallById(id: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('event_calls')
        .select(`
            *,
            participant_roles (
                id,
                name,
                slug
            )
        `)
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching call:', error)
        return null
    }

    return data as ICall
}

export async function upsertCall(payload: Partial<ICall>) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'No autorizado' }

    if (payload.id) {
        const { error } = await supabase
            .from('event_calls')
            .update(payload)
            .eq('id', payload.id)

        if (error) return { error: error.message }
    } else {
        const { error } = await supabase
            .from('event_calls')
            .insert([payload])

        if (error) return { error: error.message }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}

export async function deleteCall(id: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase
        .from('event_calls')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting call:', error)
        return { error: 'No se pudo eliminar la convocatoria' }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}
