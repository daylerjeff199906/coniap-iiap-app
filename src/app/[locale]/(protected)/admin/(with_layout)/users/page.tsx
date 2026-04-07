import { getProfiles } from './actions'
import { getRolesWithPermissions, getPermissions } from './roles-permissions-actions'
import { ProfileTable } from './components/ProfileTable'
import { ProfileFilters } from './components/ProfileFilters'
import { RolesPermissionsManager } from './components/RolesPermissionsManager'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link'

interface ProfilesPageProps {
    params: Promise<{ locale: string }>
    searchParams: Promise<{
        page?: string
        q?: string
        tab?: string
    }>
}

export default async function ProfilesPage({ params, searchParams }: ProfilesPageProps) {
    const { locale } = await params
    const { page: pageStr = '1', q: query = '' } = await searchParams
    const page = parseInt(pageStr, 10)
    const pageSize = 20

    const result = await getProfiles(page, pageSize, query)
    const profiles = result.data
    const total = result.count

    return (
        <div className="flex flex-col gap-4 animate-in fade-in duration-500">
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

