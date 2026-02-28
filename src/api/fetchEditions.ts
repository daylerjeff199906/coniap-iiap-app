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
    return (data || []).map((e) => {
        const name = e.name && typeof e.name === 'object' && ('es' in e.name || 'en' in e.name)
            ? e.name
            : {
                es: e.name || `Edición ${e.year}`,
                en: e.name || `Edition ${e.year}`
            };

        const description = e.description && typeof e.description === 'object' && ('es' in e.description || 'en' in e.description)
            ? e.description
            : {
                es: e.es || '',
                en: e.en || ''
            };

        return {
            ...e,
            name,
            description
        };
    }) as IEdition[]
}
