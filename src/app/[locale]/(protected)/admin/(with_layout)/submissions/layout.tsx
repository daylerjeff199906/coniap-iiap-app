import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { PageHeader } from '@/components/general/PageHeader'

export default function SubmissionsLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <LayoutWrapper sectionTitle="Gestión de Trabajos">
            <div className="flex flex-col gap-6">
                <PageHeader
                    title="Administrador General de Trabajos"
                    description="Revisa y gestiona postulaciones a través de todos los eventos y ediciones."
                    className="mb-2"
                />

                <div className="flex flex-col gap-4">
                    {children}
                </div>
            </div>
        </LayoutWrapper>
    )
}
