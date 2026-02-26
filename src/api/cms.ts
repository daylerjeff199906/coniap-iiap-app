'use server'
import { IGlobalSettings, IDynamicSection } from "@/types/CMS"
import { createClient } from "@/utils/supabase/supabase/client"

export async function fetchGlobalSettings(): Promise<IGlobalSettings | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('global_settings')
        .select('*')
        .eq('id', 1)
        .single()

    if (error) {
        console.error('Error fetching global settings:', error)
        return null
    }
    return data as IGlobalSettings
}

export async function fetchDynamicSectionsByPage(pageSlug: string): Promise<IDynamicSection[] | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('dynamic_sections')
        .select('*')
        .eq('page_slug', pageSlug)
        .eq('is_active', true)
        .order('order_index', { ascending: true })

    if (error) {
        console.error(`Error fetching dynamic sections for ${pageSlug}:`, error)
        return null
    }
    return data as IDynamicSection[]
}

export async function fetchSectionByType(pageSlug: string, componentType: string): Promise<IDynamicSection | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('dynamic_sections')
        .select('*')
        .eq('page_slug', pageSlug)
        .eq('component_type', componentType)
        .eq('is_active', true)
        .single()

    if (error) {
        console.error(`Error fetching section ${componentType} for ${pageSlug}:`, error)
        return null
    }
    return data as IDynamicSection
}
