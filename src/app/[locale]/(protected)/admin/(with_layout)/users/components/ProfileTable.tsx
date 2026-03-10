'use client'

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
}

export function ProfileTable({ profiles, isLoading }: ProfileTableProps) {
    const router = useRouter()

    return (
        <DynamicTable
            data={profiles}
            isLoading={isLoading}
            loadingMessage="Cargando directorio de usuarios..."
            onRowClick={(profile) => router.push(`/admin/users/${profile.id}`)}
            emptyMessage="No se encontraron usuarios"
            columns={[
                {
                    header: 'Participante',
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
                    header: 'Rol',
                    render: (profile) => (
                        <div className="flex items-center">
                            {profile.auth_id ? (
                                <Badge variant="outline" className="bg-blue-50/50 text-blue-500 border-none text-[10px] font-medium py-0 h-5 px-3 rounded-full hover:bg-blue-50 transition-colors uppercase tracking-tight">
                                    Cuenta Activa
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="bg-amber-50/50 text-amber-500 border-none text-[10px] font-medium py-0 h-5 px-3 rounded-full hover:bg-amber-50 transition-colors uppercase tracking-tight">
                                    Sin Cuenta
                                </Badge>
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
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    asChild
                                >
                                    <Link href={`/admin/users/${profile.id}`}>
                                        <IconExternalLink size={16} />
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
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

