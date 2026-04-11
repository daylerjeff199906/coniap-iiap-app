'use server'

import { createClient } from '@/utils/supabase/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function getRoles() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('roles')
        .select('*')
        .order('name', { ascending: true })

    if (error) {
        console.error('Error fetching roles:', error)
        return []
    }

    return data
}

export async function getUserRoles(profileId: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('user_roles')
        .select(`
            id,
            role_id,
            module_id,
            assigned_at,
            roles:role_id (
                id,
                name,
                description
            ),
            modules:module_id (
                id,
                name
            )
        `)
        .eq('profile_id', profileId)

    if (error) {
        console.error('Error fetching user roles:', error)
        return []
    }

    return data
}

export async function getUsersWithRoles(query?: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    let supabaseQuery = supabase
        .from('profiles')
        .select(`
            id,
            first_name,
            last_name,
            email,
            avatar_url,
            user_roles (
                id,
                role_id,
                module_id,
                roles:role_id (
                    id,
                    name
                ),
                modules:module_id (
                    id,
                    name
                )
            )
        `)

    if (query) {
        supabaseQuery = supabaseQuery.or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%`)
    }

    const { data, error } = await supabaseQuery
        .limit(50) // Limit for performance in global view

    if (error) {
        console.error('Error fetching users with roles:', error)
        return []
    }

    return data
}


export async function createSupabaseAccount(profileId: string, email: string) {
    // This requires the admin client
    try {
        const supabaseAdmin = createAdminClient()

        // 1. Create the auth user
        // We generate a temporary password
        const password = Math.random().toString(36).slice(-12)

        const { data: { user }, error: createError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { source: 'admin_creation' }
        })

        if (createError) {
            console.error('Error creating auth user:', createError)
            return { error: createError.message }
        }

        if (!user) return { error: 'No se pudo crear el usuario.' }

        // 2. Link the profile to the auth user
        const { error: updateError } = await supabaseAdmin
            .from('profiles')
            .update({ auth_id: user.id })
            .eq('id', profileId)

        if (updateError) {
            console.error('Error updating profile with auth_id:', updateError)
            return { error: 'Usuario creado pero no se pudo vincular al perfil.' }
        }

        revalidatePath(`/admin/users/${profileId}`)
        revalidatePath(`/admin/users/${profileId}/roles`)
        return { success: true, message: `Cuenta creada correctamente. Contraseña temporal: ${password}` }

    } catch (err: any) {
        console.error('Unexpected error creating account:', err)
        return { error: 'Error inesperado al crear la cuenta.' }
    }
}

export async function assignRole(profileId: string, roleId: string, assignedBy?: string, moduleId?: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    // Get current user for assignedBy if not provided
    let finalAssignedBy = assignedBy
    if (!finalAssignedBy) {
        const { data: { user } } = await supabase.auth.getUser()
        finalAssignedBy = user?.id
    }

    const { error } = await supabase
        .from('user_roles')
        .insert({
            profile_id: profileId,
            role_id: roleId,
            assigned_by: finalAssignedBy,
            module_id: moduleId || null
        })

    if (error) {
        console.error('Error assigning role:', error)
        return { error: 'No se pudo asignar el rol. Tal vez ya existe esta combinación.' }
    }

    revalidatePath(`/admin/users/${profileId}/roles`)
    revalidatePath(`/admin/users/roles`)
    return { success: true }
}

export async function removeRole(profileId: string, roleId: string, moduleId?: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    let query = supabase
        .from('user_roles')
        .delete()
        .eq('profile_id', profileId)
        .eq('role_id', roleId)

    if (moduleId) {
        query = query.eq('module_id', moduleId)
    } else {
        query = query.is('module_id', null)
    }

    const { error } = await query

    if (error) {
        console.error('Error removing role:', error)
        return { error: 'No se pudo eliminar el rol.' }
    }

    revalidatePath(`/admin/users/${profileId}/roles`)
    revalidatePath(`/admin/users/roles`)
    return { success: true }
}

export async function sendPasswordResetLink(email: string) {
    try {
        const cookieStore = await cookies()
        const supabase = createClient(cookieStore)

        // resetPasswordForEmail sends the email directly via Supabase Auth
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/update-password`,
        })

        if (error) {
            console.error('Error sending reset link:', error)
            return { error: 'No se pudo enviar el enlace de recuperación. Verifica si el usuario existe.' }
        }

        return { success: true, message: 'Enlace de recuperación enviado al correo del usuario correctamente.' }
    } catch (err) {
        console.error('Unexpected error in sendPasswordResetLink:', err)
        return { error: 'Error al procesar la solicitud de recuperación.' }
    }
}

export async function toggleUserStatus(authId: string, currentIsActive: boolean) {
    try {
        const supabaseAdmin = createAdminClient()

        // El 'ban_duration' es un string. 'none' quita el ban. '99999h' o similar banea.
        // Supabase Admin API: updateUserById({ ban_duration: 'none' | 'hhmmss' })
        const banValue = currentIsActive ? '100000h' : 'none'

        const { error } = await supabaseAdmin.auth.admin.updateUserById(authId, {
            ban_duration: banValue
        })

        if (error) {
            console.error('Error updating user status:', error)
            return { error: 'No se pudo cambiar el estado de la cuenta.' }
        }

        revalidatePath(`/admin/users`)
        return { success: true, message: currentIsActive ? 'Cuenta desactivada correctamente.' : 'Cuenta activada correctamente.' }
    } catch (err) {
        return { error: 'Error al procesar la actualización de estado.' }
    }
}

export async function getAuthUserInfo(authId: string) {
    try {
        const supabaseAdmin = createAdminClient()
        const { data: { user }, error } = await supabaseAdmin.auth.admin.getUserById(authId)

        if (error || !user) return null

        // Si el usuario existe en Auth y está vinculado, consideramos que está activo
        // a menos que haya un 'banned_until' futuro explícito.
        const isBanned = user.banned_until && new Date(user.banned_until) > new Date()

        return {
            id: user.id,
            email: user.email,
            last_sign_in_at: user.last_sign_in_at,
            is_active: !isBanned,
            confirmed_at: user.email_confirmed_at
        }
    } catch (err) {
        console.error('Error fetching auth user info:', err)
        return null
    }
}
