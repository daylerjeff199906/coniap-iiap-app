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
import { IParticipant } from '@/types/participant'
import { IconUsers, IconDatabaseOff } from '@tabler/icons-react'
import { useLocale } from 'next-intl'

interface ParticipantTableProps {
    participants: IParticipant[]
    showEventInfo?: boolean
}

export function ParticipantTable({ participants, showEventInfo = true }: ParticipantTableProps) {
    const locale = useLocale()

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead className="pl-6 h-12">Participante</TableHead>
                        <TableHead className="h-12">Rol</TableHead>
                        {showEventInfo && <TableHead className="h-12">Evento / Edición</TableHead>}
                        <TableHead className="h-12">Fecha de Registro</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {participants && participants.length > 0 ? (
                        participants.map((participant) => {
                            const profile = participant.profiles
                            const role = participant.participant_roles
                            const fullName = `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() || 'Sin nombre'
                            const initial = fullName.charAt(0).toUpperCase()
                            const roleName = locale === 'es' ? role?.name?.es : role?.name?.en

                            return (
                                <TableRow key={participant.id} className="hover:bg-muted/30">
                                    <TableCell className="pl-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9 border">
                                                <AvatarImage src={profile?.avatar_url || ''} alt={fullName} />
                                                <AvatarFallback className="bg-slate-100 text-slate-600 font-bold text-xs">
                                                    {initial}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-sm leading-none mb-1">{fullName}</span>
                                                <span className="text-[11px] text-muted-foreground">{profile?.email || 'S/E'}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        {role ? (
                                            <Badge
                                                variant="outline"
                                                className="font-medium text-[11px] px-2 py-0 border-transparent"
                                                style={{
                                                    backgroundColor: role.badge_color ? `${role.badge_color}20` : '#f1f5f9',
                                                    color: role.badge_color || '#475569',
                                                    borderColor: role.badge_color ? `${role.badge_color}40` : '#e2e8f0'
                                                }}
                                            >
                                                {roleName || role.slug}
                                            </Badge>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">Normal</span>
                                        )}
                                    </TableCell>
                                    {showEventInfo && (
                                        <TableCell className="py-4">
                                            <div className="flex flex-col max-w-[200px]">
                                                <span className="text-sm font-medium truncate">{participant.main_events?.name || 'Evento general'}</span>
                                                {participant.editions && (
                                                    <span className="text-[11px] text-muted-foreground">
                                                        {locale === 'es' ? participant.editions.name?.es : participant.editions.name?.en} ({participant.editions.year})
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                    )}
                                    <TableCell className="py-4 text-xs text-muted-foreground">
                                        {new Date(participant.created_at).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={showEventInfo ? 4 : 3} className="h-[300px] text-center">
                                <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
                                    <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
                                        <IconDatabaseOff size={24} className="opacity-60" />
                                    </div>
                                    <p className="text-[15px] font-medium mt-2">No se encontraron participantes</p>
                                    <p className="text-sm max-w-[300px] text-center mx-auto opacity-70">
                                        Los participantes aparecerán aquí una vez que sus inscripciones o formularios sean aprobados.
                                    </p>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
