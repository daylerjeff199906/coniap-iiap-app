import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { PageHeader } from '@/components/general/PageHeader'
import { ActivityForm } from '../components/ActivityForm'

export const metadata = {
    title: 'Nueva Actividad - Panel',
}

export default async function CreateActivityPage() {
    return (
        <LayoutWrapper sectionTitle="Nueva Actividad">
            <PageHeader
                title="Nueva Sesión de Evento"
                description="Configura una nueva sesión y agenda para tus eventos."
                backHref="/admin/activities"
                variant="chevron"
                className="mb-6 max-w-5xl mx-auto w-full"
            />
            <ActivityForm />
        </LayoutWrapper>
    )
}

