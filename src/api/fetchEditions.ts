'use server'
import { createClient } from "@/utils/supabase/supabase/client"
import { IEdition } from "@/types/CMS"

export async function fetchAllEditions() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('editions')
        .select('*')
        .order('year', { ascending: false })

    if (error) {
        console.error('Error fetching editions:', error)
        return []
    }

    // Normalize data if necessary (e.g., merging description_es/en into description object)
    return (data || []).map((e: any) => ({
        ...e,
        name: e.name || {
            es: e.name_es || `Edición ${e.year}`,
            en: e.name_en || `Edition ${e.year}`
        },
        description: e.description || {
            es: e.description_es || '',
            en: e.description_en || ''
        }
    })) as IEdition[]
}
