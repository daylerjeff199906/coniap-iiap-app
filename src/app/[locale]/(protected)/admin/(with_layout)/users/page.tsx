import { getProfiles } from './actions'
import { ProfileTable } from './components/ProfileTable'
import { ProfileFilters } from './components/ProfileFilters'
import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { PageHeader } from '@/components/general/PageHeader'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'

interface ProfilesPageProps {
    searchParams: Promise<{
        page?: string
        q?: string
    }>
}

export default async function ProfilesPage({ searchParams }: ProfilesPageProps) {
    const { page: pageStr = '1', q: query = '' } = await searchParams
    const page = parseInt(pageStr, 10)
    const pageSize = 30

    const { data: profiles, count: total } = await getProfiles(page, pageSize, query)
    const totalPages = Math.ceil(total / pageSize)

    // Current URL helper for pagination
    const createPageUrl = (pageNum: number) => {
        const params = new URLSearchParams()
        if (query) params.set('q', query)
        params.set('page', pageNum.toString())
        return `?${params.toString()}`
    }

    return (
        <LayoutWrapper sectionTitle="Gestión de Usuarios">
            <div className="flex flex-col gap-6">
                <PageHeader
                    title="Directorio de Usuarios"
                    description="Administra todos los perfiles registrados en la plataforma, incluyendo cuentas activas y registros de base de datos."
                    className="mb-2"
                />

                <div className="flex flex-col gap-4">
                    <ProfileFilters query={query} />

                    <ProfileTable
                        profiles={profiles}
                        isLoading={false}
                    />

                    {total > pageSize && (
                        <div className="mt-8 flex justify-center">
                            <Pagination>
                                <PaginationContent className="bg-white p-1 rounded-2xl border border-slate-100 shadow-sm shadow-slate-100/50">
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href={createPageUrl(Math.max(1, page - 1))}
                                            className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-slate-50 rounded-xl transition-all'}
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                                        let pageNum = i + 1
                                        if (totalPages > 5 && page > 3) {
                                            pageNum = page - 2 + i
                                            if (pageNum + (4 - i) > totalPages) pageNum = totalPages - 4 + i
                                        }
                                        if (pageNum > totalPages || pageNum < 1) return null

                                        return (
                                            <PaginationItem key={pageNum}>
                                                <PaginationLink
                                                    isActive={page === pageNum}
                                                    href={createPageUrl(pageNum)}
                                                    className={`cursor-pointer rounded-xl transition-all ${page === pageNum
                                                            ? 'bg-primary text-primary-foreground font-black shadow-lg shadow-primary/20 hover:bg-primary'
                                                            : 'hover:bg-slate-50 text-slate-600 font-bold'
                                                        }`}
                                                >
                                                    {pageNum}
                                                </PaginationLink>
                                            </PaginationItem>
                                        )
                                    })}

                                    <PaginationItem>
                                        <PaginationNext
                                            href={createPageUrl(Math.min(totalPages, page + 1))}
                                            className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-slate-50 rounded-xl transition-all'}
                                        />
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
