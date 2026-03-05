'use server'
import { createClient } from "@/utils/supabase/supabase/client"
import { fetchCurrentEdition } from "./fetchEditions"

export async function fetchActiveCalls() {
    const supabase = await createClient()
    const currentEdition = await fetchCurrentEdition()

    if (!currentEdition) return []

    const now = new Date().toISOString()

    const { data, error } = await supabase
        .from('event_calls')
        .select('*, main_events!inner(id, slug)')
        .eq('edition_id', currentEdition.id)
        .eq('main_events.slug', 'coniap')
        .eq('is_active', true)
        .lte('start_date', now)
        .gte('end_date', now)

    if (error) {
        console.error('Error fetching active calls:', error)
        return []
    }

    return data
}
