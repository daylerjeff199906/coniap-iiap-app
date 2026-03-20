import { PageHeader } from '@/components/general/PageHeader'
import { getActivities } from '@/app/[locale]/(protected)/admin/(with_layout)/activities/actions'
import { getEditions } from '../edition/actions'
import { ActivitiesTable } from '@/app/[locale]/(protected)/admin/(with_layout)/activities/components/ActivitiesTable'
import { DetailActivitiesFilters } from './components/DetailActivitiesFilters'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { IconFileSpreadsheet, IconPlus } from '@tabler/icons-react'

export const metadata = {
    title: 'Actividades - Detalles',
}

export default async function EventActivitiesPage({
    params,
    searchParams
}: {
    params: Promise<{ id: string, locale: string }>
    searchParams: Promise<{ page?: string; q?: string; edition?: string }>
}) {
    const { id: eventId, locale } = await params
    const sParams = await searchParams

    const currentPage = parseInt(sParams.page || '1')
    const searchQuery = sParams.q || ''
    const filterEdition = sParams.edition !== 'all' ? sParams.edition : undefined

    const editions = await getEditions(eventId)

    const { data: activities, count } = await getActivities(
        currentPage,
        searchQuery,
        20,
        {
            main_event_id: eventId,
            edition_id: filterEdition
        }
    )

    const totalPages = Math.ceil(count / 20)

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams()
        if (searchQuery) params.set('q', searchQuery)
        if (sParams.edition) params.set('edition', sParams.edition)
        params.set('page', pageNumber.toString())
        return `/admin/events/${eventId}/activities?${params.toString()}`
    }

    return (
        <div className="flex flex-col gap-6 pt-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2 -mt-2">
                <PageHeader
                    title="Cronograma de Actividades"
                    description="Administra los talleres, conferencias y sesiones de este evento."
                />
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="rounded-xl flex items-center gap-2 h-10">
                        <IconFileSpreadsheet className="h-4 w-4" /> Carga Masiva
                    </Button>
                    <Button asChild className="rounded-xl flex items-center gap-2 h-10 bg-[#0064e0] hover:bg-[#0057c2] text-white">
                        <Link href={`/admin/events/${eventId}/activities/create${filterEdition ? `?editionId=${filterEdition}` : ''}`}>
                            <IconPlus className="h-4 w-4" /> Nueva Actividad
                        </Link>
                    </Button>
                </div>
            </div>


            <DetailActivitiesFilters
                editions={editions}
                locale={locale}
                eventId={eventId}
            />

            <div className="mt-2">
                <ActivitiesTable activities={activities} eventId={eventId} />
            </div>


            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-muted-foreground">
                        Mostrando {activities.length} de {count}
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
    )
}
