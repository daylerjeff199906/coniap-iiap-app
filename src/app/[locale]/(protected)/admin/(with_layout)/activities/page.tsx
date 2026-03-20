import { getActivities } from './actions'
import { ActivitiesTable } from './components/ActivitiesTable'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

import { ActivitiesFilters } from './components/ActivitiesFilters'

export const metadata = {
    title: 'Actividades - Panel',
}

export default async function ActivitiesPage({
    searchParams,
    params,
}: {
    searchParams: Promise<{ page?: string; q?: string }>
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    const sParams = await searchParams

    const currentPage = parseInt(sParams.page || '1')
    const searchQuery = sParams.q || ''
    const limit = 20

    const { data: activities, count } = await getActivities(currentPage, searchQuery, limit)
    const totalPages = Math.ceil(count / limit)

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams()
        if (searchQuery) params.set('q', searchQuery)
        params.set('page', pageNumber.toString())
        return `/${locale}/admin/activities?${params.toString()}`
    }

    return (
        <div className="flex flex-col gap-4">
            <ActivitiesFilters />
            
            <ActivitiesTable activities={activities} />

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

