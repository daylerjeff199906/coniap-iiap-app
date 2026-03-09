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

export async function searchProfiles(query: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('profiles')
        .select('id, auth_id, first_name, last_name, email, institution, avatar_url')
        .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%`)
        .limit(5)

    if (error) {
        console.error('Error searching profiles:', error)
        return []
    }

    return data
}

export async function createParticipant(formData: FormData) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const email = (formData.get('email') as string).toLowerCase().trim()
    const roleId = formData.get('role_id') as string
    const targetType = formData.get('target_type') as string
    const mainEventId = formData.get('main_event_id') as string
    const rawEditionId = formData.get('edition_id') as string
    const profileIdFromSearch = formData.get('profile_id_from_search') as string // UUID de profiles.id si viene de búsqueda

    // Regla XOR: un participante TIENE que estar asignado a un evento principal O a una edición, nunca a ambos.
    const editionId = targetType === 'edition' ? (rawEditionId === 'none' ? null : rawEditionId) : null
    const finalMainEventId = editionId ? null : mainEventId

    const institution = formData.get('institution') as string || null
    const bio = formData.get('bio') as string || null

    if (!email || !roleId || (!finalMainEventId && !editionId)) {
        return { error: 'Los campos Correo, Rol y una asignación (Evento o Edición) son obligatorios.' }
    }

    // 1. Procurar Perfil y obtener su auth_id
    let targetAuthId: string

    if (profileIdFromSearch && profileIdFromSearch !== 'new') {
        const { data: profile } = await supabase
            .from('profiles')
            .select('auth_id')
            .eq('id', profileIdFromSearch)
            .single()

        if (!profile?.auth_id) {
            return { error: 'El perfil seleccionado no tiene un ID de autenticación válido.' }
        }
        targetAuthId = profile.auth_id
    } else {
        // Buscar por email por si acaso
        const { data: existingProfile } = await supabase
            .from('profiles')
            .select('auth_id')
            .eq('email', email)
            .maybeSingle()

        if (existingProfile) {
            if (!existingProfile.auth_id) {
                return { error: 'Ya existe un perfil con este correo pero no tiene cuenta de acceso vinculada.' }
            }
            targetAuthId = existingProfile.auth_id
            // Actualizar datos opcionalmente
            await supabase.from('profiles').update({ institution, bio }).eq('auth_id', targetAuthId)
        } else {
            return { error: 'Para registrar un nuevo participante, este debe tener primero una cuenta o ser buscado.' }
        }
    }

    // 2. Comprobar duplicados usando el auth_id
    const { data: existingParticipant } = await supabase
        .from('event_participants')
        .select('id')
        .eq('profile_id', targetAuthId)
        .match(editionId ? { edition_id: editionId } : { main_event_id: finalMainEventId })
        .maybeSingle()

    if (existingParticipant) {
        return { error: 'Este participante ya está registrado en este nivel del evento.' }
    }

    // 3. Crear Registro
    const { error: insertError } = await supabase
        .from('event_participants')
        .insert({
            profile_id: targetAuthId,
            main_event_id: finalMainEventId,
            edition_id: editionId,
            role_id: roleId
        })

    if (insertError) {
        console.error('Error creating participant:', insertError)
        return { error: 'No se pudo registrar al participante. Verifique los datos.' }
    }

    revalidatePath(`/[locale]/(protected)/admin/events/${mainEventId}/participants`, 'page')
    revalidatePath(`/[locale]/(protected)/admin/participants`, 'page')
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
