'use server'

import { createClient } from '@/utils/supabase/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

// interfaces for strong typing
export interface IModule {
    id: string
    code: string
    name: string
    description: string | null
    url_prod: string
    url_local: string | null
    path: string
    icon_name: string
    color_class: string
    is_active: boolean
    created_at: string
}

export interface IPermission {
    id: string
    module_id: string
    action: string
    created_at: string
    module?: IModule // Joined module info
}

export interface IRoleWithPermissions {
    id: string
    name: string
    description: string | null
    created_at: string
    permissions?: IPermission[]
}

// --- MODULES ACTIONS ---

export async function getModules() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('modules')
        .select('*')
        .order('name', { ascending: true })

    if (error) {
        console.error('Error fetching modules:', error)
        return []
    }

    return data as IModule[]
}

export async function createModule(moduleData: Partial<IModule>) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('modules')
        .insert(moduleData)
        .select()
        .single()

    if (error) {
        console.error('Error creating module:', error)
        return { error: 'No se pudo crear el módulo.' }
    }

    revalidatePath(`/admin/users`)
    return { success: true, data }
}

export async function updateModule(id: string, moduleData: Partial<IModule>) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('modules')
        .update(moduleData)
        .eq('id', id)
        .select()
        .single()

    if (error) {
        console.error('Error updating module:', error)
        return { error: 'No se pudo actualizar el módulo.' }
    }

    revalidatePath(`/admin/users`)
    return { success: true, data }
}

export async function deleteModule(id: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase
        .from('modules')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting module:', error)
        return { error: 'No se pudo eliminar el módulo. Asegúrate de que no tenga permisos asociados.' }
    }

    revalidatePath(`/admin/users`)
    return { success: true }
}

// --- ROLES & PERMISSIONS ACTIONS ---

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
                module_id,
                action,
                created_at,
                module:module_id (
                    id,
                    name,
                    code,
                    icon_name,
                    color_class
                )
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

export async function updateRole(id: string, name: string, description?: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('roles')
        .update({ name, description })
        .eq('id', id)
        .select()
        .single()

    if (error) {
        console.error('Error updating role:', error)
        return { error: 'No se pudo actualizar el rol.' }
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
        .select(`
            *,
            module:module_id (*)
        `)
        .order('action', { ascending: true })

    if (error) {
        console.error('Error fetching permissions:', error)
        return []
    }

    return data as IPermission[]
}

export async function createPermission(moduleId: string, action: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('permissions')
        .insert({ module_id: moduleId, action })
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

export async function deletePermission(permissionId: string) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase
        .from('permissions')
        .delete()
        .eq('id', permissionId)

    if (error) {
        console.error('Error deleting permission:', error)
        return { error: 'No se pudo eliminar el permiso. Asegúrate de que no esté asignado a ningún rol.' }
    }

    revalidatePath(`/admin/users`)
    return { success: true }
}
