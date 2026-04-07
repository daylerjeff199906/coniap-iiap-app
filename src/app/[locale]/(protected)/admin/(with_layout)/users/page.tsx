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
    const { page: pageStr = '1', q: query = '', tab = 'users' } = await searchParams
    const page = parseInt(pageStr, 10)
    const pageSize = 20

    let profiles: any[] = []
    let total = 0
    let rolesWithPerms: any[] = []
    let allPermissions: any[] = []

    if (tab === 'users') {
        const result = await getProfiles(page, pageSize, query)
        profiles = result.data
        total = result.count
    } else if (tab === 'roles') {
        rolesWithPerms = await getRolesWithPermissions()
        allPermissions = await getPermissions()
    }

    const totalPages = Math.ceil(total / pageSize)

    // Current URL helper for pagination
    const createPageUrl = (pageNum: number) => {
        const params = new URLSearchParams()
        if (query) params.set('q', query)
        params.set('page', pageNum.toString())
        params.set('tab', tab)
        return `?${params.toString()}`
    }

    return (
        <div className="flex flex-col gap-8 animate-in fade-in duration-700">
            <Tabs value={tab} className="w-full">
                <TabsList className="flex justify-start w-full border-b border-slate-200 bg-transparent rounded-none h-auto p-0 gap-8 mb-6">
                    <TabsTrigger
                        value="users"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm font-medium text-slate-500 data-[state=active]:text-slate-900 px-0 pb-3 transition-all"
                        asChild
                    >
                        <Link href={`/${locale}/admin/users?tab=users`}>
                            Usuarios
                        </Link>
                    </TabsTrigger>
                    <TabsTrigger
                        value="roles"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm font-medium text-slate-500 data-[state=active]:text-slate-900 px-0 pb-3 transition-all"
                        asChild
                    >
                        <Link href={`/${locale}/admin/users?tab=roles`}>
                            Roles y Permisos
                        </Link>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="users" className="mt-6 flex flex-col gap-4">
                    <ProfileFilters query={query} />

                    <ProfileTable
                        profiles={profiles}
                        isLoading={false}
                        totalItems={total}
                        currentPage={page}
                        pageSize={pageSize}
                    />
                </TabsContent>

                <TabsContent value="roles" className="mt-6">
                    <RolesPermissionsManager
                        roles={rolesWithPerms}
                        allPermissions={allPermissions}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}

