import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { PageHeader } from '@/components/general/PageHeader'
import { ActivityForm } from '../components/ActivityForm'
import { getActivityById } from '../actions'
import { notFound } from 'next/navigation'

interface EditActivityPageProps {
    params: Promise<{ id: string }>
}

export const metadata = {
    title: 'Editar Actividad - Panel',
}

export default async function EditActivityPage({ params }: EditActivityPageProps) {
    const { id } = await params
    const activity = await getActivityById(id)

    if (!activity) {
        return notFound()
    }

    return (
        <LayoutWrapper sectionTitle="Editar Actividad">
            <PageHeader
                title="Editar Sesión"
                description="Actualiza los detalles de la sesión."
                backHref="/admin/activities"
                variant="chevron"
                className="mb-6 max-w-5xl mx-auto w-full"
            />
            <ActivityForm activity={activity} />
        </LayoutWrapper>
    )
}

