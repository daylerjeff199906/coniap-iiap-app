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
        <div className="flex flex-col gap-4 animate-in fade-in duration-500">
            <PageHeader
                title="Editar Sesión"
                description={`Actualizando detalles de la sesión ${activity.title}`}
                backHref="/admin/activities"
                variant="chevron"
                className="mb-2"
            />
            <ActivityForm activity={activity} />
        </div>
    )
}

