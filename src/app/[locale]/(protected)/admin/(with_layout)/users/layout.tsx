'use client'

import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { PageHeader } from '@/components/general/PageHeader'
import { Link, usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'

export default function UsersLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: any
}) {
    const pathname = usePathname()
    // Identificar si estamos exactamente en la gestión global de roles
    // pathname en next-intl no incluye el locale prefix usualmente
    const isRolesTab = pathname === '/admin/users/roles' || pathname.endsWith('/users/roles')
    && !pathname.match(/\/users\/[^\/]+\/roles/) // No es un rol de un usuario específico

    return (
        <LayoutWrapper sectionTitle="Usuarios y Accesos">
            <div className="flex flex-col gap-6">
                <PageHeader
                    title="Configuración de Usuarios"
                    description="Administra perfiles de usuario, roles organizacionales y permisos globales del sistema."
                    className="mb-2"
                />

                <div className="flex justify-start w-full border-b border-slate-200 bg-transparent rounded-none h-auto p-0 gap-8 mb-2">
                    <nav className="flex gap-8">
                        <Link 
                            href="/admin/users" 
                            className={cn(
                                "rounded-none border-b-2 px-0 pb-3 text-sm font-medium transition-all",
                                isRolesTab 
                                ? "border-transparent text-slate-500 hover:text-slate-700"
                                : "border-slate-900 text-slate-900"
                            )}
                        >
                            Lista de Usuarios
                        </Link>
                        <Link 
                            href="/admin/users/roles" 
                            className={cn(
                                "rounded-none border-b-2 px-0 pb-3 text-sm font-medium transition-all",
                                isRolesTab
                                ? "border-slate-900 text-slate-900"
                                : "border-transparent text-slate-500 hover:text-slate-700"
                            )}
                        >
                            Roles y Permisos Globales
                        </Link>
                    </nav>
                </div>

                <div className="flex flex-col gap-4">
                    {children}
                </div>
            </div>
        </LayoutWrapper>
    )
}
