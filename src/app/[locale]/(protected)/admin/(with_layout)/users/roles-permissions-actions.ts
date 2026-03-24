'use server'

import { createClient } from '@/utils/supabase/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

// interfaces for strong typing
export interface IPermission {
    id: string
    module_name: string
    action: string
    description: string | null
    created_at: string
}

export interface IRoleWithPermissions {
    id: string
    name: string
    description: string | null
    created_at: string
    permissions?: IPermission[]
}

export async function getRolesWithPermissions() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    // 1. Fetch roles
    const { data: roles, error: rolesError } = await supabase
        .from('roles')
        .select('*')
        .order('name', { ascending: true })

    if (rolesError) {
        console.error('Error fetching roles:', rolesError)
        return []
    }

    // 2. Fetch role_permissions mapped
    const { data: rolePermissions, error: rpError } = await supabase
        .from('role_permissions')
        .select(`
            role_id,
            permission:permission_id (
                id,
                module_name,
                action,
                description,
                created_at
            )
        `)

    if (rpError) {
        console.error('Error fetching role permissions:', rpError)
        return roles.map(r => ({ ...r, permissions: [] }))
    }

    // Group permissions by role
    const permissionsByRole: Record<string, IPermission[]> = {}
    rolePermissions.forEach((rp: any) => {
        if (rp.permission) {
            if (!permissionsByRole[rp.role_id]) {
                permissionsByRole[rp.role_id] = []
            }
            permissionsByRole[rp.role_id].push(rp.permission)
        }
    })

    return roles.map(role => ({
        ...role,
        permissions: permissionsByRole[role.id] || []
    }))
}

export async function createRole(name: string, description?: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('roles')
        .insert({ name, description })
        .select()
        .single()

    if (error) {
        console.error('Error creating role:', error)
        return { error: 'No se pudo crear el rol.' }
    }

    revalidatePath(`/admin/users`)
    return { success: true, data }
}

export async function deleteRole(roleId: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase
        .from('roles')
        .delete()
        .eq('id', roleId)

    if (error) {
        console.error('Error deleting role:', error)
        return { error: 'No se pudo eliminar el rol.' }
    }

    revalidatePath(`/admin/users`)
    return { success: true }
}

export async function getPermissions() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('permissions')
        .select('*')
        .order('module_name', { ascending: true })

    if (error) {
        console.error('Error fetching permissions:', error)
        return []
    }

    return data as IPermission[]
}

export async function createPermission(moduleName: string, action: string, description?: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('permissions')
        .insert({ module_name: moduleName, action, description })
        .select()
        .single()

    if (error) {
        console.error('Error creating permission:', error)
        return { error: 'No se pudo crear el permiso.' }
    }

    revalidatePath(`/admin/users`)
    return { success: true, data }
}

export async function assignPermissionToRole(roleId: string, permissionId: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase
        .from('role_permissions')
        .insert({
            role_id: roleId,
            permission_id: permissionId
        })

    if (error) {
        console.error('Error assigning permission:', error)
        return { error: 'No se pudo asignar el permiso.' }
    }

    revalidatePath(`/admin/users`)
    return { success: true }
}

export async function removePermissionFromRole(roleId: string, permissionId: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase
        .from('role_permissions')
        .delete()
        .eq('role_id', roleId)
        .eq('permission_id', permissionId)

    if (error) {
        console.error('Error removing permission:', error)
        return { error: 'No se pudo eliminar el permiso.' }
    }

    revalidatePath(`/admin/users`)
    return { success: true }
}
