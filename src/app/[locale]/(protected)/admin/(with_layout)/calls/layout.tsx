import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { PageHeader } from '@/components/general/PageHeader'

export default function CallsLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <LayoutWrapper sectionTitle="Gestión de Convocatorias">
            <div className="flex flex-col gap-6">
                <PageHeader
                    title="Convocatorias y Llamados"
                    description="Administra todas las convocatorias vigentes para ponentes, participantes y aliados."
                    className="mb-2"
                />

                <div className="flex flex-col gap-4">
                    {children}
                </div>
            </div>
        </LayoutWrapper>
    )
}
