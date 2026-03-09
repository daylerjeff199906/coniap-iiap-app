import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/panel-admin/admin-sidebar"
import { createClient } from '@/utils/supabase/supabase/server'
import { cookies } from 'next/headers'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()

    // Obtener roles o datos del perfil (opcional, pero requerido para mostrar rol y nombre)
    let role = 'user'
    let name = 'Usuario'

    if (user) {
        // Intentar obtener un nombre desde el perfil buscando por auth_id
        const { data: profile } = await supabase
            .from('profiles')
            .select('id, first_name, last_name')
            .eq('auth_id', user.id)
            .single()

        if (profile) {
            name = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Usuario'

            // Obtener roles de user_roles usando el profile.id (el nuevo UUID independiente)
            const { data: userRolesData } = await supabase
                .from('user_roles')
                .select(`roles (name)`)
                .eq('profile_id', profile.id)
            const roles = userRolesData?.map((ur: any) => ur.roles?.name).filter(Boolean) || []
            if (roles.length > 0) role = roles[0]
        }
    }

    const userData = {
        name: name,
        email: user?.email || 'email@ejemplo.com',
        avatar: '', // O poner la imagen si la hay
        role: role.toUpperCase()
    }

    return (
        <SidebarProvider>
            <AdminSidebar user={userData} />
            {children}
        </SidebarProvider>
    )
}
