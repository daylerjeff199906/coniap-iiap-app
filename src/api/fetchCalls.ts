'use server'
import { createClient } from "@/utils/supabase/supabase/client"

export interface IActiveCall {
    id: string
    title: string
    start_date: string
    end_date: string
    edition_id: string
    main_event_id: string
    is_active: boolean
    main_events: {
        id: string
        slug: string
        name: string
    } | null
    editions: {
        id: string
        year: number
        slug: string
    } | null
}

export async function fetchActiveCalls(): Promise<IActiveCall[]> {
    const supabase = createClient()

    // Step 1: Get main_event by slug 'coniap'
    const { data: mainEvent, error: mainEventError } = await supabase
        .from('main_events')
        .select('id, slug, name')
        .eq('slug', 'coniap')
        .maybeSingle()

    if (mainEventError || !mainEvent) {
        console.log('[fetchActiveCalls] No main_event found with slug coniap:', mainEventError)
        return []
    }

    // Step 2: Get the current edition for this main_event
    const { data: edition, error: editionError } = await supabase
        .from('editions')
        .select('id, year, slug')
        .eq('main_event_id', mainEvent.id)
        .eq('is_current', true)
        .maybeSingle()


    // If no current edition found, we'll still search by main_event_id only
    if (editionError) {
        console.log('[fetchActiveCalls] Error fetching edition:', editionError)
    }

    // Step 3: Fetch active calls
    // If edition found → filter only by edition_id (edition already belongs to main_event)
    // If no edition → filter by main_event_id only
    let query = supabase
        .from('event_calls')
        .select('*')
        .eq('is_active', true)

    if (edition) {
        query = query.eq('edition_id', edition.id)
    } else {
        query = query.eq('main_event_id', mainEvent.id)
    }

    const { data, error } = await query

    if (error) {
        console.error('[fetchActiveCalls] Error fetching event_calls:', error)
        return []
    }


    // Attach related data for use in components
    return (data || []).map((call: any) => ({
        ...call,
        main_events: mainEvent,
        editions: edition,
    })) as IActiveCall[]
}
