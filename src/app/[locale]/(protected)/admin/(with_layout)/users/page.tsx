import { getProfiles } from './actions'
import { ProfileTable } from './components/ProfileTable'
import { ProfileFilters } from './components/ProfileFilters'

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
    )
}

