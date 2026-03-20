import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { PageHeader } from '@/components/general/PageHeader'

export default function ParticipantsLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <LayoutWrapper sectionTitle="Gestión de Participantes">
            <div className="flex flex-col gap-6">
                <PageHeader
                    title="Participantes"
                    description="Lista maestra de todas las personas registradas en los diferentes eventos y ediciones del sistema."
                    className="mb-2"
                />

                <div className="flex flex-col gap-4">
                    {children}
                </div>
            </div>
        </LayoutWrapper>
    )
}
