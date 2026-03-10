import { getProfileById } from '../../actions'
import { getRoles, getUserRoles } from '../../roles-actions'
import { RolesManager } from '../../components/RolesManager'
import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { PageHeader } from '@/components/general/PageHeader'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { IconArrowLeft, IconShieldLock } from '@tabler/icons-react'
import { Link } from '@/i18n/routing'

interface UserRolesPageProps {
    params: Promise<{
        id: string
        locale: string
    }>
}

export default async function UserRolesPage({ params }: UserRolesPageProps) {
    const { id, locale } = await params

    const profile = await getProfileById(id)
    if (!profile) notFound()

    const allRoles = await getRoles()
    const userRoles = await getUserRoles(id)

    return (
        <LayoutWrapper sectionTitle="Gestión de Roles">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Navigation */}
                <div className="flex items-center justify-between mb-2">
                    <Button variant="ghost" className="rounded-xl flex items-center gap-2 text-slate-500 hover:bg-slate-100" asChild>
                        <Link href={`/admin/users/${id}`}>
                            <IconArrowLeft size={18} />
                            Regresar a Perfil
                        </Link>
                    </Button>

                    <div className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        <IconShieldLock size={14} />
                        Seguridad & Accesos
                    </div>
                </div>

                <PageHeader
                    title={`Roles y Permisos`}
                    description={`Gestiona los accesos de ${profile.first_name} ${profile.last_name} a la plataforma.`}
                    className="mb-6"
                />

                <RolesManager
                    profile={profile}
                    allRoles={allRoles}
                    userRoles={userRoles}
                />
            </div>
        </LayoutWrapper>
    )
}
