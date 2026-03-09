'use server'
import { createClient } from '@/utils/supabase/supabase/server'
import { cookies } from 'next/headers'
import { IParticipant } from '@/types/participant'
import { revalidatePath } from 'next/cache'

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
                avatar_url,
                institution,
                bio
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

export async function getEventsList() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('main_events')
        .select('id, name')
        .eq('is_active', true)
        .order('name', { ascending: true })

    if (error) return []
    return data
}

export async function getEditionsByEventList(eventId: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('editions')
        .select('id, name, year')
        .eq('main_event_id', eventId)
        .order('year', { ascending: false })

    if (error) return []
    return data
}

export async function createParticipant(formData: FormData) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const firstName = formData.get('first_name') as string
    const lastName = formData.get('last_name') as string
    const email = (formData.get('email') as string).toLowerCase().trim()
    const roleId = formData.get('role_id') as string
    const targetType = formData.get('target_type') as string
    const mainEventId = formData.get('main_event_id') as string
    const rawEditionId = formData.get('edition_id') as string

    // Strict assignment rule enforcement
    const editionId = targetType === 'edition' ? (rawEditionId === 'none' ? null : rawEditionId) : null

    const institution = formData.get('institution') as string || null
    const bio = formData.get('bio') as string || null

    if (!email || !roleId || !mainEventId) {
        return { error: 'Los campos Correo, Rol y Evento son obligatorios.' }
    }

    if (targetType === 'edition' && !editionId) {
        return { error: 'Debes seleccionar una edición válida.' }
    }

    // 1. Procurar Perfil
    let profileId: string

    const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single()

    if (existingProfile) {
        profileId = existingProfile.id
        await supabase
            .from('profiles')
            .update({ institution, bio })
            .eq('id', profileId)
    } else {
        const { data: newProfile, error: profileError } = await supabase
            .from('profiles')
            .insert({
                first_name: firstName,
                last_name: lastName,
                email: email,
                institution,
                bio
            })
            .select()
            .single()

        if (profileError) {
            console.error('Error creating profile:', profileError)
            return { error: 'Error al crear el perfil del participante.' }
        }
        profileId = newProfile.id
    }

    // 2. Comprobar duplicados
    const { data: existingParticipant } = await supabase
        .from('event_participants')
        .select('id')
        .eq('profile_id', profileId)
        .eq('main_event_id', mainEventId)
        .match(editionId ? { edition_id: editionId } : { edition_id: null })
        .maybeSingle()

    if (existingParticipant) {
        return { error: 'Este participante ya está registrado en este nivel del evento.' }
    }

    // 3. Crear Registro
    const { error: insertError } = await supabase
        .from('event_participants')
        .insert({
            profile_id: profileId,
            main_event_id: mainEventId,
            edition_id: editionId, // null si es 'event', UUID si es 'edition'
            role_id: roleId,
        })

    if (insertError) {
        console.error('Error creating participant:', insertError)
        return { error: 'No se pudo registrar al participante en el evento.' }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}

export async function getParticipantById(id: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('event_participants')
        .select(`
            *,
            profiles:profile_id (
                id,
                first_name,
                last_name,
                email,
                avatar_url,
                institution,
                bio,
                phone
            ),
            participant_roles (
                id,
                name,
                slug,
                badge_color,
                description
            ),
            main_events (
                id,
                name,
                slug
            ),
            editions (
                id,
                name,
                year
            )
        `)
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching participant:', error)
        return null
    }

    return data
}

export async function deleteParticipantRegistration(id: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase
        .from('event_participants')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting participant registration:', error)
        return { error: 'No se pudo eliminar el registro.' }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}
