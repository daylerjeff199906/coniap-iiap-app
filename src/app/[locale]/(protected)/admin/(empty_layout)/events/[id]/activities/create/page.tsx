import { PageHeader } from '@/components/general/PageHeader'
import { ActivityForm } from "../../../../../(with_layout)/activities/components/ActivityForm"

export const metadata = {
    title: 'Nueva Actividad - Panel',
}

export default async function CreateActivityPage({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>
    searchParams: Promise<{ editionId?: string }>
}) {
    const { id } = await params
    const sParams = await searchParams
    const editionId = sParams.editionId || ''

    return (
        <div className="pt-4 flex flex-col gap-2">
            <PageHeader
                title="Nueva Sesión de Evento"
                description="Configura una nueva sesión para este evento."
                backHref={`/admin/events/${id}/activities`}
                variant="close"
                className="mb-4 max-w-5xl mx-auto w-full px-4"
            />
            <ActivityForm 
                defaultMainEventId={id} 
                defaultEditionId={editionId} 
                backHref={`/admin/events/${id}/activities`} 
            />
        </div>
    )
}

