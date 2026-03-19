'use server'

import { createClient } from '@/utils/supabase/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { activitySchema, ActivityFormInput } from './schema'

export interface ActivityItem {
    id: string
    created_at: string
    isActived: boolean
    name?: string | null
    timeStart?: string | null
    timeEnd?: string | null
    date?: string | null
    shortDescription?: string | null
    banner?: string | null
    customContent?: string | null
    program_id?: number | null
    summary_id?: number | null
    sala?: number | null
    main_event_id?: string | null
    edition_id?: string | null
    submission_id?: string | null
}

export async function getActivities(
    page = 1, 
    search = '', 
    limit = 20, 
    options?: { main_event_id?: string; edition_id?: string }
) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    let query = supabase.from('events').select('*', { count: 'exact' })

    if (search) {
        query = query.ilike('name', `%${search}%`)
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

    query = query.range(from, to).order('date', { ascending: false }).order('timeStart', { ascending: true })

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

    const { error } = await supabase.from('events').delete().eq('id', id)

    if (error) {
        console.error('Error deleting activity:', error)
        return { error: 'No se pudo eliminar la actividad' }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}

export async function upsertActivity(data: ActivityFormInput, activityId?: string) {
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
        name: validData.name,
        date: validData.date || null,
        timeStart: validData.timeStart || null,
        timeEnd: validData.timeEnd || null,
        shortDescription: validData.shortDescription || null,
        sala: validData.sala || null,
        isActived: validData.isActived,
        main_event_id: validData.main_event_id || null,
        edition_id: validData.edition_id || null,
        customContent: validData.customContent || null,
    }

    if (activityId) {
        const { error } = await supabase.from('events').update(payload).eq('id', activityId)
        if (error) return { error: error.message }
    } else {
        const { error } = await supabase.from('events').insert([payload])
        if (error) return { error: error.message }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}

export async function getActivityById(id: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.from('events').select('*').eq('id', id).single()
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
