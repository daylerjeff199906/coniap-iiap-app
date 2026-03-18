'use server'

import { createClient } from '@/utils/supabase/supabase/server'
import { cookies } from 'next/headers'

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
        // If a specific edition is selected, query ONLY for that edition
        query = query.eq('edition_id', options.edition_id)
    } else if (options?.main_event_id) {
        // If searching by main event, we want activities directly linked to it, 
        // OR activities linked to ANY of its editions.
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
