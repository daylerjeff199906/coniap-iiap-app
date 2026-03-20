import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { PageHeader } from '@/components/general/PageHeader'

export default function UsersLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <LayoutWrapper sectionTitle="Gestión de Usuarios">
            <div className="flex flex-col gap-6">
                <PageHeader
                    title="Directorio de Usuarios"
                    description="Administra todos los perfiles registrados en la plataforma, incluyendo cuentas activas y registros de base de datos."
                    className="mb-2"
                />

                <div className="flex flex-col gap-4">
                    {children}
                </div>
            </div>
        </LayoutWrapper>
    )
}
