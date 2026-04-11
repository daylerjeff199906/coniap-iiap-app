import { getProfileById } from '../../actions'
import { getRoles, getUserRoles } from '../../roles-actions'
import { getModules } from '../../roles-permissions-actions'
import { RolesManager } from '../../components/RolesManager'
import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { PageHeader } from '@/components/general/PageHeader'
import { notFound } from 'next/navigation'
import { UserLayout } from '../../components/UserLayout'

interface UserRolesPageProps {
    params: Promise<{
        id: string
        locale: string
    }>
}

export default async function UserRolesPage({ params }: UserRolesPageProps) {
    const { id } = await params

    const profile = await getProfileById(id)
    if (!profile) notFound()

    const allRoles = await getRoles()
    const userRoles = await getUserRoles(id)
    const allModules = await getModules()

    const userName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Usuario'

    return (
        <div className="bg-slate-50/30 -mx-4 -mt-4 md:-mx-6 md:-mt-4 p-4 md:p-6 lg:p-8 min-h-[calc(100vh-64px)]">
            <UserLayout userId={id} userName={userName}>
                <div className="space-y-6">
                    <PageHeader
                        title="Seguridad y Roles de Usuario"
                        description={
                            <div className="space-y-1">
                                <p>Gestiona los accesos específicos de <span className="text-slate-900 font-medium">{userName}</span>.</p>
                                <p className="text-slate-400 text-xs font-medium">{profile.email}</p>
                            </div>
                        }
                        className="mb-8"
                    />

                    <RolesManager
                        profile={profile}
                        allRoles={allRoles}
                        userRoles={userRoles}
                        allModules={allModules}
                    />
                </div>
            </UserLayout>
        </div>
    )
}

