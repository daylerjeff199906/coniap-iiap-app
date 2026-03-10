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
        .select('*, roles(*)')
        .eq('profile_id', profileId)

    if (error) {
        console.error('Error fetching user roles:', error)
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

export async function assignRole(profileId: string, roleId: string, assignedBy?: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase
        .from('user_roles')
        .insert({
            profile_id: profileId,
            role_id: roleId,
            assigned_by: assignedBy
        })

    if (error) {
        console.error('Error assigning role:', error)
        return { error: 'No se pudo asignar el rol.' }
    }

    revalidatePath(`/admin/users/${profileId}/roles`)
    return { success: true }
}

export async function removeRole(profileId: string, roleId: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('profile_id', profileId)
        .eq('role_id', roleId)

    if (error) {
        console.error('Error removing role:', error)
        return { error: 'No se pudo eliminar el rol.' }
    }

    revalidatePath(`/admin/users/${profileId}/roles`)
    return { success: true }
}
