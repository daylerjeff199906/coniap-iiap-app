'use client'

import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { IconCalendarEvent, IconDatabaseOff } from '@tabler/icons-react'
import { EventActionsDropdown } from './EventActionsDropdown'
import { useRouter } from 'next/navigation'

export interface MainEvent {
    id: string
    name: string
    logo_url?: string | null
    cover_url?: string | null
    short_description?: string | null
    slug: string
    created_at: string
    is_active: boolean
    owner_id?: string
}

interface EventsTableProps {
    events: MainEvent[]
    locale: string
}

export function EventsTable({ events, locale }: EventsTableProps) {
    const router = useRouter()

    const handleRowClick = (id: string, e: React.MouseEvent) => {
        // Prevent navigation if clicking on interactive elements like dropdowns or buttons
        const target = e.target as HTMLElement
        if (
            target.closest('button') || 
            target.closest('[role="menuitem"]') || 
            target.closest('[data-radar-exclude]') ||
            target.closest('.dropdown-trigger')
        ) {
            return
        }
        router.push(`/${locale}/admin/events/${id}`)
    }

    return (
        <div className="rounded-md border overflow-hidden mt-2">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Evento</TableHead>
                        <TableHead>Creación</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-center w-[100px]">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {events && events.length > 0 ? (
                        events.map((event) => {
                            const imageUrl = event.logo_url || event.cover_url
                            return (
                                <TableRow
                                    key={event.id}
                                    className="cursor-pointer hover:bg-muted transition-colors"
                                    onClick={(e) => handleRowClick(event.id, e)}
                                >
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-blue-50 text-blue-500 rounded-lg overflow-hidden border">
                                                {imageUrl ? (
                                                    <img src={imageUrl} alt={event.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <IconCalendarEvent size={24} />
                                                )}
                                            </div>
                                            <div className="flex flex-col max-w-[300px] md:max-w-md">
                                                <span className="font-semibold text-[15px] truncate">{event.name}</span>
                                                <span className="text-xs text-muted-foreground truncate" title={event.short_description || ''}>
                                                    {event.short_description || 'Sin descripción'}
                                                </span>
                                                <span className="text-[11px] text-muted-foreground/80 font-mono mt-0.5" title="Slug">/{event.slug}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground whitespace-nowrap text-sm">
                                        {new Date(event.created_at).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={event.is_active ? 'default' : 'secondary'}>
                                            {event.is_active ? 'Activo' : 'Inactivo'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                                        <EventActionsDropdown eventId={event.id} eventName={event.name} />
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="h-32 text-center">
                                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                    <IconDatabaseOff size={32} />
                                    <p>No se encontraron eventos.</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
