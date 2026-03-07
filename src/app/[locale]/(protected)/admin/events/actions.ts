'use server'

import { createClient } from '@/utils/supabase/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function getEvents(page = 1, search = '', statusFilter = 'active', pageSize = 10) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    let query = supabase.from('main_events').select('*', { count: 'exact' })

    if (search) {
        query = query.ilike('name', `%${search}%`)
    }

    if (statusFilter === 'active') {
        query = query.eq('is_active', true)
    } else if (statusFilter === 'inactive') {
        query = query.eq('is_active', false)
    }
    // if 'all', we don't apply an is_active filter

    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    query = query.range(from, to).order('created_at', { ascending: false })

    const { data, count, error } = await query

    if (error) {
        console.error('Error fetching events:', error)
        return { data: [], count: 0 }
    }

    return { data, count: count || 0 }
}

export async function getEventById(id: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.from('main_events').select('*').eq('id', id).single()

    if (error) {
        console.error('Error fetching event details:', error)
        return null
    }

    return data
}

export async function deleteEvent(id: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.from('main_events').delete().eq('id', id)

    if (error) {
        console.error('Error deleting event:', error)
        return { error: 'No se pudo eliminar el evento' }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}

export async function upsertEvent(formData: FormData, eventId?: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'No autorizado' }
    }

    const payload = {
        name: formData.get('name') as string,
        slug: formData.get('slug') as string,
        short_description: formData.get('short_description') as string,
        website_url: formData.get('website_url') as string,
        contact_email: formData.get('contact_email') as string,
        status: formData.get('status') || 'draft',
        is_active: formData.get('is_active') === 'true',
        owner_id: user.id
    }

    if (eventId) {
        const { error } = await supabase.from('main_events').update(payload).eq('id', eventId)
        if (error) return { error: error.message }
    } else {
        const { error } = await supabase.from('main_events').insert([payload])
        if (error) return { error: error.message }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}
