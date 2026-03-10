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
    const pageSize = 20

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
                        totalItems={total}
                        currentPage={page}
                        pageSize={pageSize}
                    />
                </div>
            </div>
        </LayoutWrapper>
    )
}
