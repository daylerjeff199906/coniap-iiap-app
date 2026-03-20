'use server'

import { createClient } from '@/utils/supabase/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ActivityFormInput, activitySchema } from './schema'

export interface ActivityItem {
    id: string
    created_at: string
    is_active: boolean
    title?: string | null
    start_time?: string | null
    end_time?: string | null
    session_date?: string | null
    short_description?: string | null
    banner_url?: string | null
    custom_content?: string | null
    room_id?: number | null
    address?: string | null
    main_event_id?: string | null
    edition_id?: string | null
    submission_id?: string | null
    session_type?: 'keynote' | 'presentation' | 'panel' | 'workshop' | 'networking' | 'break' | 'other' | null
    is_online: boolean
    stream_platform?: string | null
    stream_url?: string | null
    stream_password?: string | null
    main_events?: { name: any } | null
    editions?: { name: any } | null
}

export async function getActivities(
    page = 1,
    search = '',
    limit = 20,
    options?: { main_event_id?: string; edition_id?: string }
) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    let query = supabase.from('event_sessions').select('*, main_events:main_event_id ( name ), editions:edition_id ( name )', { count: 'exact' })

    if (search) {
        query = query.ilike('title', `%${search}%`)
    }

    if (options?.edition_id) {
        query = query.eq('edition_id', options.edition_id)
    } else if (options?.main_event_id) {
        const { data: edData } = await supabase
            .from('editions')
            .select('id')
            .eq('main_event_id', options.main_event_id)

        const editionIds = (edData || []).map(e => e.id)

        if (editionIds.length > 0) {
            query = query.or(`main_event_id.eq.${options.main_event_id},edition_id.in.(${editionIds.map(id => `"${id}"`).join(',')})`)
        } else {
            query = query.eq('main_event_id', options.main_event_id)
        }
    }

    const from = (page - 1) * limit
    const to = from + limit - 1

    query = query.range(from, to)
        .order('session_date', { ascending: false })
        .order('start_time', { ascending: true })

    const { data, count, error } = await query

    if (error) {
        console.error('Error fetching activities:', error)
        return { data: [], count: 0 }
    }

    return { data: (data || []) as ActivityItem[], count: count || 0 }
}

export async function deleteActivity(id: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.from('event_sessions').delete().eq('id', id)

    if (error) {
        console.error('Error deleting activity:', error)
        return { error: 'No se pudo eliminar la actividad' }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}

export async function upsertActivity(data: ActivityFormInput, activityId?: string, redirectPath?: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'No autorizado' }

    // Validate using Zod
    const validation = activitySchema.safeParse(data)
    if (!validation.success) {
        const formattedErrors = validation.error.flatten().fieldErrors
        return { error: 'Datos inválidos', validationErrors: formattedErrors }
    }

    const validData = validation.data

    const payload = {
        title: validData.title,
        session_date: validData.session_date || null,
        start_time: validData.start_time || null,
        end_time: validData.end_time || null,
        short_description: validData.short_description || null,
        address: validData.address || null,
        is_active: validData.is_active,
        main_event_id: validData.edition_id && validData.edition_id.trim() !== '' ? null : (validData.main_event_id || null),
        edition_id: validData.edition_id && validData.edition_id.trim() !== '' ? validData.edition_id : null,
        custom_content: validData.custom_content || null,
        session_type: validData.session_type,
        is_online: validData.is_online,
        stream_platform: validData.streams && validData.streams.length > 0 ? validData.streams[0].platform : null,
        stream_url: validData.streams ? JSON.stringify(validData.streams) : null,
        stream_password: validData.streams && validData.streams.length > 0 ? validData.streams[0].password || null : null,
        banner_url: validData.banner_url || null,
        submission_id: validData.submission_id || null,
    }


    if (activityId) {
        const { error } = await supabase.from('event_sessions').update(payload).eq('id', activityId)
        console.log('Error: ', error)
        if (error) return { error: error.message }
    } else {
        const { error } = await supabase.from('event_sessions').insert([payload])
        console.log('Error: ', error)
        if (error) return { error: error.message }
    }


    revalidatePath('/', 'layout')
    if (redirectPath) redirect(redirectPath)
    return { success: true }
}

export async function getActivityById(id: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.from('event_sessions').select('*').eq('id', id).single()
    if (error) {
        console.error('Error fetching activity details:', error)
        return null
    }

    return data as ActivityItem
}

export async function getMainEventsList() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.from('main_events').select('id, name')
    if (error) return []
    return data
}

export async function getEditionsList(mainEventId?: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    let query = supabase.from('editions').select('id, name, main_event_id')
    if (mainEventId) {
        query = query.eq('main_event_id', mainEventId)
    }

    const { data, error } = await query
    if (error) return []
    return data
}
