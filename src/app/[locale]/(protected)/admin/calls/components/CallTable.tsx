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
import { ICall } from '@/types/call'
import { IconSpeakerphone, IconDatabaseOff } from '@tabler/icons-react'
import { useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { CallActions } from './CallActions'

interface CallTableProps {
    calls: ICall[]
    eventId?: string
    showEventInfo?: boolean
}

export function CallTable({ calls, eventId, showEventInfo = true }: CallTableProps) {
    const locale = useLocale()

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead className="pl-6 h-12">Convocatoria</TableHead>
                        <TableHead className="h-12">Rol / Perfil</TableHead>
                        {showEventInfo && <TableHead className="h-12">Evento / Edición</TableHead>}
                        <TableHead className="h-12">Periodo</TableHead>
                        <TableHead className="h-12">Estado</TableHead>
                        <TableHead className="text-center w-[120px] h-12 pr-6">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {calls && calls.length > 0 ? (
                        calls.map((call) => {
                            const role = call.participant_roles
                            const roleName = locale === 'es' ? role?.name?.es : role?.name?.en
                            const startDate = new Date(call.start_date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { day: 'numeric', month: 'short' })
                            const endDate = new Date(call.end_date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })

                            return (
                                <TableRow key={call.id} className="hover:bg-muted/30">
                                    <TableCell className="pl-6 py-4">
                                        <Link 
                                            href={eventId ? `/admin/events/${eventId}/call/${call.id}` : `/admin/calls/${call.id}`}
                                            className="flex items-center gap-3 group cursor-pointer hover:underline-offset-4"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center border border-blue-100 flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                                                <IconSpeakerphone size={20} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-[15px] leading-tight mb-1 group-hover:text-blue-600 transition-colors">{call.title}</span>
                                                <span className="text-[11px] text-muted-foreground line-clamp-1 max-w-[200px]">{call.description || 'Sin descripción'}</span>
                                            </div>
                                        </Link>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        {role ? (
                                            <Badge
                                                variant="outline"
                                                className="font-medium text-[11px] px-2 py-0"
                                                style={{
                                                    backgroundColor: role.badge_color ? `${role.badge_color}10` : 'transparent',
                                                    color: role.badge_color || 'inherit',
                                                    borderColor: role.badge_color ? `${role.badge_color}30` : 'inherit'
                                                }}
                                            >
                                                {roleName || role.slug}
                                            </Badge>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">-</span>
                                        )}
                                    </TableCell>
                                    {showEventInfo && (
                                        <TableCell className="py-4">
                                            <div className="flex flex-col max-w-[200px]">
                                                <span className="text-sm font-medium truncate">{call.main_events?.name || '-'}</span>
                                                {call.editions && (
                                                    <span className="text-[11px] text-muted-foreground">
                                                        {locale === 'es' ? call.editions.name?.es : call.editions.name?.en} ({call.editions.year})
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                    )}
                                    <TableCell className="py-4 text-xs text-muted-foreground">
                                        <div className="flex flex-col">
                                            <span>{startDate} -</span>
                                            <span>{endDate}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Badge variant={call.is_active ? 'default' : 'secondary'} className="rounded-md px-2 py-0 text-[10px] font-bold uppercase tracking-wider">
                                            {call.is_active ? 'Abierta' : 'Cerrada'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center py-4 pr-6">
                                        <CallActions
                                            callId={call.id}
                                            callTitle={call.title}
                                            eventId={eventId}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={showEventInfo ? 6 : 5} className="h-[300px] text-center">
                                <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
                                    <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
                                        <IconDatabaseOff size={24} className="opacity-60" />
                                    </div>
                                    <p className="text-[15px] font-medium mt-2">No se encontraron convocatorias</p>
                                    <Link href={eventId ? `/admin/events/${eventId}/call/create` : `/admin/calls/create`}>
                                        <Button variant="outline" className="mt-2 rounded-xl h-10 px-6 border-slate-200">
                                            Crear primera convocatoria
                                        </Button>
                                    </Link>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
