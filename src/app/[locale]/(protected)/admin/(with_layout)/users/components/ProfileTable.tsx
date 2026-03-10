'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { IProfile } from '@/types/profile'
import { IconMail, IconMapPin, IconBuilding, IconChevronRight, IconLoader2 } from '@tabler/icons-react'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'

interface ProfileTableProps {
    profiles: IProfile[]
    isLoading: boolean
}

export function ProfileTable({ profiles, isLoading }: ProfileTableProps) {
    const locale = useLocale()

    if (isLoading) {
        return (
            <div className="rounded-xl border bg-card/50 flex flex-col items-center justify-center p-20 gap-4">
                <IconLoader2 size={32} className="animate-spin text-primary" />
                <p className="text-muted-foreground font-medium">Cargando usuarios...</p>
            </div>
        )
    }

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/30">
                    <TableRow>
                        <TableHead className="pl-6 h-12">Usuario</TableHead>
                        <TableHead className="h-12 hidden md:table-cell text-center">Datos</TableHead>
                        <TableHead className="h-12 hidden lg:table-cell">Región / Institución</TableHead>
                        <TableHead className="h-12 text-right pr-6">Registro</TableHead>
                        <TableHead className="h-12 w-[60px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {profiles && profiles.length > 0 ? (
                        profiles.map((profile) => {
                            const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'No asignado o sin nombre'
                            const initial = fullName.charAt(0).toUpperCase() || 'U'

                            return (
                                <TableRow key={profile.id} className="group hover:bg-muted/20 transition-colors">
                                    <TableCell className="pl-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 border shadow-sm transition-transform group-hover:scale-105">
                                                <AvatarImage src={profile.avatar_url || ''} alt={fullName} />
                                                <AvatarFallback className="bg-slate-100 text-slate-500 font-bold text-sm">
                                                    {initial}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm leading-none mb-1 group-hover:text-primary transition-colors">{fullName}</span>
                                                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                                    <IconMail size={10} />
                                                    {profile.email}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 hidden md:table-cell">
                                        <div className="flex items-center justify-center gap-2">
                                            {profile.onboarding_completed ? (
                                                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[10px] font-bold py-0 h-5">
                                                    Completo
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="bg-slate-100 text-slate-500 border-slate-200 text-[10px] font-bold py-0 h-5">
                                                    Pendiente
                                                </Badge>
                                            )}
                                            {profile.auth_id ? (
                                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 text-[10px] font-bold py-0 h-5">
                                                    Cuenta Activa
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-100 text-[10px] font-bold py-0 h-5">
                                                    Fake Profile
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 hidden lg:table-cell text-xs">
                                        <div className="flex flex-col gap-1">
                                            {profile.location && (
                                                <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                                                    <IconMapPin size={12} className="text-slate-400" />
                                                    {profile.location}
                                                </div>
                                            )}
                                            {profile.institution && (
                                                <div className="flex items-center gap-1.5 text-slate-500 italic">
                                                    <IconBuilding size={12} className="text-slate-400" />
                                                    {profile.institution}
                                                </div>
                                            )}
                                            {!profile.location && !profile.institution && (
                                                <span className="text-slate-300 italic">Sin datos adicionales</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-right pr-6 text-[10px] text-muted-foreground tabular-nums">
                                        {new Date(profile.created_at).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </TableCell>
                                    <TableCell className="py-4 pr-3">
                                        <div className="flex items-center gap-1 justify-end">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 rounded-xl text-muted-foreground hover:bg-slate-100 hover:text-primary transition-all"
                                                asChild
                                            >
                                                <Link href={`/admin/users/${profile.id}`}>
                                                    <IconChevronRight size={18} />
                                                </Link>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="h-[300px] text-center">
                                <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
                                    <p className="text-[15px] font-medium mt-2">No se encontraron usuarios</p>
                                    <p className="text-sm opacity-70">Intenta con otros términos de búsqueda.</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
