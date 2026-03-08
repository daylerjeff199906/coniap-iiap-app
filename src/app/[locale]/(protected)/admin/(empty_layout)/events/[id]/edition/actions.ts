'use server'

import { createClient } from '@/utils/supabase/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function getEditions(eventId: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('editions')
        .select('*')
        .eq('main_event_id', eventId)
        .order('year', { ascending: false })

    if (error) {
        console.error('Error fetching editions:', error)
        return []
    }

    return data
}

export async function getEditionById(id: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.from('editions').select('*').eq('id', id).single()
    if (error) {
        console.error('Error fetching edition details:', error)
        return null
    }

    return data
}

export async function deleteEdition(id: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.from('editions').delete().eq('id', id)

    if (error) {
        console.error('Error deleting edition:', error)
        return { error: 'No se pudo eliminar la edición' }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}

export async function upsertEdition(formData: FormData, eventId: string, editionId?: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'No autorizado' }
    }

    // Transform jsonb
    const nameEs = formData.get('name_es') as string
    const nameEn = formData.get('name_en') as string
    const descEs = formData.get('desc_es') as string
    const descEn = formData.get('desc_en') as string

    const payload = {
        main_event_id: eventId,
        year: parseInt(formData.get('year') as string),
        name: {
            es: nameEs,
            en: nameEn || nameEs,
        },
        slug: formData.get('slug') as string,
        is_current: formData.get('is_current') === 'on',
        start_date: formData.get('start_date') ? formData.get('start_date') as string : null,
        end_date: formData.get('end_date') ? formData.get('end_date') as string : null,
        cover_url: formData.get('cover_url') ? formData.get('cover_url') as string : null,
        description: {
            es: descEs,
            en: descEn || descEs,
        }
    }

    if (editionId) {
        const { error } = await supabase.from('editions').update(payload).eq('id', editionId)
        if (error) {
            console.error('Edition update error', error)
            return { error: error.message }
        }
    } else {
        const { error } = await supabase.from('editions').insert([payload])
        if (error) {
            console.error('Edition create error', error)
            return { error: error.message }
        }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}
