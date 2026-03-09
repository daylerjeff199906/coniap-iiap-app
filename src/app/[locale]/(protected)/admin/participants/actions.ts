'use server'

import { createClient } from '@/utils/supabase/supabase/server'
import { cookies } from 'next/headers'
import { IParticipant } from '@/types/participant'

export async function getParticipants(filters?: {
    eventId?: string,
    editionId?: string,
    roleSlug?: string
}) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    let query = supabase
        .from('event_participants')
        .select(`
            *,
            profiles:profile_id (
                id,
                first_name,
                last_name,
                email,
                avatar_url
            ),
            participant_roles!inner (
                id,
                name,
                slug,
                badge_color
            ),
            main_events (
                name
            ),
            editions (
                name,
                year
            )
        `)
        .order('created_at', { ascending: false })

    if (filters?.eventId) {
        // Fetch edition IDs for this event first to include them in the query
        const { data: editions } = await supabase
            .from('editions')
            .select('id')
            .eq('main_event_id', filters.eventId)

        const editionIds = editions?.map(e => e.id) || []

        if (editionIds.length > 0) {
            query = query.or(`main_event_id.eq.${filters.eventId},edition_id.in.(${editionIds.join(',')})`)
        } else {
            query = query.eq('main_event_id', filters.eventId)
        }
    }

    if (filters?.editionId) {
        query = query.eq('edition_id', filters.editionId)
    }

    if (filters?.roleSlug) {
        query = query.eq('participant_roles.slug', filters.roleSlug)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching participants:', error)
        return []
    }

    return data as IParticipant[]
}

export async function getParticipantRoles() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('participant_roles')
        .select('*')
        .order('name->>es', { ascending: true })

    if (error) {
        console.error('Error fetching participant roles:', error)
        return []
    }

    return data
}
