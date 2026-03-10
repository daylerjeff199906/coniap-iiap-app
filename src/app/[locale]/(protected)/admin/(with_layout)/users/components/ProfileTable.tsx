'use client'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { IProfile } from '@/types/profile'
import {
    IconExternalLink,
    IconTrash,
    IconShieldLock,
} from '@tabler/icons-react'
import { Link, useRouter } from '@/i18n/routing'
import { DynamicTable } from '@/components/general/DataTable/DynamicTable'

interface ProfileTableProps {
    profiles: IProfile[]
    isLoading: boolean
    totalItems?: number
    currentPage?: number
    pageSize?: number
    onPageChange?: (page: number) => void
}

export function ProfileTable({ profiles, isLoading, totalItems, currentPage, pageSize }: ProfileTableProps) {
    const router = useRouter()

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(window.location.search)
        params.set('page', page.toString())
        router.push(`?${params.toString()}`)
    }

    return (
        <DynamicTable
            data={profiles}
            isLoading={isLoading}
            loadingMessage="Cargando directorio de usuarios..."
            onRowClick={(profile) => router.push(`/admin/users/${profile.id}`)}
            emptyMessage="No se encontraron usuarios"
            totalItems={totalItems}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            columns={[
                {
                    header: 'Usuario',
                    className: 'min-w-[300px]',
                    render: (profile) => {
                        const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'No asignado'
                        const initial = fullName.charAt(0).toUpperCase() || 'U'

                        return (
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border border-slate-100">
                                    <AvatarImage src={profile.avatar_url || ''} alt={fullName} />
                                    <AvatarFallback className="bg-slate-50 text-slate-400 font-medium text-xs">
                                        {initial}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="font-medium text-[13px] text-slate-900 leading-none mb-1">
                                        {fullName}
                                    </span>
                                    <span className="text-[11px] text-slate-400 font-medium">
                                        {profile.email}
                                    </span>
                                    {profile.institution && (
                                        <span className="text-[10px] text-red-400/80 font-medium mt-0.5 truncate max-w-[200px]">
                                            {profile.institution}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )
                    }
                },
                {
                    header: 'Acceso',
                    render: (profile) => (
                        <div className="flex items-center">
                            {profile.auth_id ? (
                                <div className="bg-blue-50/50 text-blue-500 border border-blue-100/50 text-[10px] font-medium py-0 h-5 px-3 rounded-full flex items-center justify-center uppercase tracking-tight">
                                    Cuenta Activa
                                </div>
                            ) : (
                                <div className="bg-amber-50/50 text-amber-500 border border-amber-100/50 text-[10px] font-medium py-0 h-5 px-3 rounded-full flex items-center justify-center uppercase tracking-tight">
                                    Sin Cuenta
                                </div>
                            )}
                        </div>
                    )
                },
                {
                    header: 'Estado',
                    className: 'hidden md:table-cell',
                    render: (profile) => (
                        <div className="flex flex-col">
                            <span className="text-[12px] font-medium text-slate-700">Progreso Perfil</span>
                            <span className="text-[11px] text-slate-400">
                                {profile.onboarding_completed ? 'Completado al 100%' : 'Pendiente de completar'}
                            </span>
                        </div>
                    )
                },
                {
                    header: 'Registro',
                    className: 'w-[200px]',
                    render: (profile) => (
                        <div className="flex items-center justify-between group/actions">
                            <span className="text-[11px] text-slate-500 tabular-nums">
                                {new Date(profile.created_at).toLocaleDateString('es-ES', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </span>
                            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-xl text-muted-foreground hover:bg-slate-100 hover:text-primary"
                                    asChild
                                >
                                    <Link href={`/admin/users/${profile.id}`}>
                                        <IconExternalLink size={16} />
                                    </Link>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-xl text-muted-foreground hover:bg-slate-100 hover:text-primary"
                                    asChild
                                >
                                    <Link href={`/admin/users/${profile.id}/roles`}>
                                        <IconShieldLock size={16} />
                                    </Link>
                                </Button>
                                {/* <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                >
                                    <IconTrash size={16} />
                                </Button> */}
                            </div>
                        </div>
                    )
                }
            ]}
        />
    )
}

