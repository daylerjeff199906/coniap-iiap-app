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
        <div className="pt-4">
            <ActivityForm 
                defaultMainEventId={id} 
                defaultEditionId={editionId} 
                backHref={`/admin/events/${id}/activities`} 
            />
        </div>
    )
}
