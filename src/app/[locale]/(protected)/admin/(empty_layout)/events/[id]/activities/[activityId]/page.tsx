import { PageHeader } from '@/components/general/PageHeader'
import { ActivityForm } from "../../../../../(with_layout)/activities/components/ActivityForm"
import { getActivityById } from "../../../../../(with_layout)/activities/actions"
import { notFound } from "next/navigation"

export const metadata = {
    title: 'Editar Actividad - Panel',
}

export default async function EditActivityPage({
    params
}: {
    params: Promise<{ id: string; activityId: string }>
}) {
    const { id, activityId } = await params
    const activity = await getActivityById(activityId)

    if (!activity) {
        return notFound()
    }

    return (
        <div className="pt-4 flex flex-col gap-2">
            <PageHeader
                title="Editar Sesión"
                description="Actualiza los detalles de la sesión."
                backHref={`/admin/events/${id}/activities`}
                variant="close"
                className="mb-4 max-w-5xl mx-auto w-full px-4"
            />
            <ActivityForm 
                activity={activity} 
                backHref={`/admin/events/${id}/activities`} 
            />
        </div>
    )
}

