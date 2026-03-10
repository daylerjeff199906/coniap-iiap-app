import { getProfileById } from '../../actions'
import { getRoles, getUserRoles } from '../../roles-actions'
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

    const userName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Usuario'

    return (
        <LayoutWrapper sectionTitle="Gestión de Roles">
            <div className="bg-slate-50/30 -mx-4 -mt-4 md:-mx-6 md:-mt-4 p-4 md:p-6 lg:p-8 min-h-[calc(100vh-64px)]">
                <UserLayout userId={id} userName={userName}>
                    <div className="space-y-6">
                        <PageHeader
                            title="Seguridad y Roles"
                            description={`Gestiona los accesos y roles de ${userName} en el sistema.`}
                            className="mb-8"
                        />

                        <RolesManager
                            profile={profile}
                            allRoles={allRoles}
                            userRoles={userRoles}
                        />
                    </div>
                </UserLayout>
            </div>
        </LayoutWrapper>
    )
}

