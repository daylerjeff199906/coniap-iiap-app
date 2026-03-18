import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { PageHeader } from '@/components/general/PageHeader'
import { getEvents } from './actions'
import { EventFilters } from './components/EventFilters'
import { EventsTable, MainEvent } from './components/EventsTable'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

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

    const { data, count } = await getEvents(currentPage, searchQuer, statusVal, limit)
    const events = (data || []) as MainEvent[]
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

                    <EventsTable events={events} locale={locale} />

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
