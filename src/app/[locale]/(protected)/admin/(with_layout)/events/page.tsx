import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { PageHeader } from '@/components/general/PageHeader'
import { getEvents } from './actions'
import { EventFilters } from './components/EventFilters'
import { EventActionsDropdown } from './components/EventActionsDropdown'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import { IconDatabaseOff, IconCalendarEvent } from '@tabler/icons-react'

export const metadata = {
    title: 'Eventos - Panel',
}

export default async function EventsPage({
    searchParams,
    params,
}: {
    searchParams: Promise<{ page?: string, q?: string, status?: string }>
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    const sParams = await searchParams; // next15 await context

    const currentPage = parseInt(sParams.page || '1')
    const searchQuer = sParams.q || ''
    const statusVal = sParams.status || 'active'
    const limit = 10

    const { data: events, count } = await getEvents(currentPage, searchQuer, statusVal, limit)
    const totalPages = Math.ceil(count / limit)

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams()
        if (searchQuer) params.set('q', searchQuer)
        params.set('status', statusVal)
        params.set('page', pageNumber.toString())
        return `/${locale}/admin/events?${params.toString()}`
    }

    return (
        <LayoutWrapper sectionTitle="Gestión de Eventos">
            <div className="flex flex-col gap-6">
                <PageHeader
                    title="Eventos y Congresos"
                    description="Administra los eventos, congresos o seminarios organizados."
                    className="mb-2"
                />

                <div className="flex flex-col gap-4">
                    <EventFilters />

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
                                    events.map((event: any) => {
                                        const imageUrl = event.logo_url || event.cover_url
                                        return (
                                            <TableRow key={event.id}>
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
                                                            <span className="text-xs text-muted-foreground truncate" title={event.short_description}>
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
                                                <TableCell className="text-center">
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

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-4">
                            <p className="text-sm text-muted-foreground">
                                Mostrando {events.length} de {count}
                            </p>
                            <Pagination className="justify-end relative mr-0 flex-1 w-auto">
                                <PaginationContent>
                                    <PaginationItem>
                                        {currentPage > 1 ? (
                                            <PaginationPrevious href={createPageURL(currentPage - 1)} />
                                        ) : (
                                            <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
                                        )}
                                    </PaginationItem>

                                    {[...Array(totalPages)].map((_, i) => (
                                        <PaginationItem key={i + 1}>
                                            <PaginationLink
                                                href={createPageURL(i + 1)}
                                                isActive={currentPage === i + 1}
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        {currentPage < totalPages ? (
                                            <PaginationNext href={createPageURL(currentPage + 1)} />
                                        ) : (
                                            <PaginationNext href="#" className="pointer-events-none opacity-50" />
                                        )}
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </div>
            </div>
        </LayoutWrapper>
    )
}
