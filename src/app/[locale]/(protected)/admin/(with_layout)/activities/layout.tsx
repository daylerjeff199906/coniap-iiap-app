import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { PageHeader } from '@/components/general/PageHeader'

export default function ActivitiesLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <LayoutWrapper sectionTitle="Gestión de Actividades">
            <div className="flex flex-col gap-6">
                <PageHeader
                    title="Sesiones y Actividades"
                    description="Administra todas las sesiones que se llevan a cabo dentro de tus eventos."
                    className="mb-2"
                />

                <div className="flex flex-col gap-4">
                    {children}
                </div>
            </div>
        </LayoutWrapper>
    )
}
