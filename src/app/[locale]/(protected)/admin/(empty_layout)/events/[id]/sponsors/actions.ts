'use server'

import { createClient } from '@/utils/supabase/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { ISponsor, IEventSponsor } from '@/types/ISponsors'

export async function getSponsorsLinked(targetId: string, isEdition: boolean = false) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const foreignKey = isEdition ? 'edition_id' : 'main_event_id'

    const { data, error } = await supabase
        .from('event_sponsors')
        .select(`
            *,
            sponsors (*)
        `)
        .eq(foreignKey, targetId)
        .order('order_index', { ascending: true })

    if (error) {
        console.error('Error fetching linked sponsors:', error)
        return []
    }

    return data as IEventSponsor[]
}

export async function getAllSponsors() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('sponsors')
        .select('*')
        .order('name', { ascending: true })


    if (error) {
        console.error('Error fetching all sponsors:', error)
        return []
    }

    return data as ISponsor[]
}

export async function createAndLinkSponsor({
    targetId,
    isEdition,
    sponsorData,
    orderIndex = 0
}: {
    targetId: string,
    isEdition: boolean,
    sponsorData: Partial<ISponsor>,
    orderIndex?: number
}) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    // 1. Create sponsor
    const { data: newSponsor, error: sponsorError } = await supabase
        .from('sponsors')
        .insert({
            name: sponsorData.name,
            image: sponsorData.image,
            isActived: sponsorData.isActived ?? true
        })
        .select('id')
        .single()

    if (sponsorError) {
        console.error('Error creating sponsor:', sponsorError)
        return { error: 'No se pudo crear el sponsor.' }
    }

    // 2. Link to target
    const linkData = isEdition
        ? { edition_id: targetId, sponsor_id: newSponsor.id, order_index: orderIndex }
        : { main_event_id: targetId, sponsor_id: newSponsor.id, order_index: orderIndex }

    const { error: linkError } = await supabase
        .from('event_sponsors')
        .insert(linkData)

    if (linkError) {
        console.error('Error linking sponsor:', linkError)
        return { error: 'Sponsor creado pero no se pudo vincular al evento/edición.' }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}

export async function linkExistingSponsor({
    targetId,
    isEdition,
    sponsorId,
    orderIndex = 0
}: {
    targetId: string,
    isEdition: boolean,
    sponsorId: string | number,
    orderIndex?: number
}) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const linkData = isEdition
        ? { edition_id: targetId, sponsor_id: sponsorId, order_index: orderIndex }
        : { main_event_id: targetId, sponsor_id: sponsorId, order_index: orderIndex }

    const { error } = await supabase
        .from('event_sponsors')
        .insert(linkData)

    if (error) {
        if (error.code === '23505') { // Unique constraint violation
            return { error: 'Este sponsor ya está vinculado.' }
        }
        console.error('Error linking existing sponsor:', error)
        return { error: 'No se pudo vincular el sponsor.' }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}

export async function unlinkSponsor(linkId: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase
        .from('event_sponsors')
        .delete()
        .eq('id', linkId)

    if (error) {
        console.error('Error unlinking sponsor:', error)
        return { error: 'No se pudo desvincular el sponsor.' }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}

export async function toggleSponsorActivation(id: string | number, currentStatus: boolean) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase
        .from('sponsors')
        .update({ isActived: !currentStatus })
        .eq('id', id)

    if (error) {
        console.error('Error updating sponsor:', error)
        return { error: 'No se pudo cambiar el estado del sponsor.' }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}

export async function updateSponsorData(id: string | number, data: Partial<ISponsor>) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase
        .from('sponsors')
        .update(data)
        .eq('id', id)

    if (error) {
        console.error('Error updating sponsor:', error)
        return { error: 'No se pudo actualizar el sponsor.' }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}

export async function reorderSponsors(reorders: { id: string, order_index: number }[]) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    // Perform updates in parallel
    const updates = reorders.map(item =>
        supabase
            .from('event_sponsors')
            .update({ order_index: item.order_index })
            .eq('id', item.id)
    )

    const results = await Promise.all(updates)
    const errors = results.filter(r => r.error)

    if (errors.length > 0) {
        console.error('Errors reordering sponsors:', errors)
        return { error: 'Ocurrieron errores al reordenar algunos sponsors.' }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}
