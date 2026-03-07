import { EditionForm } from '../components/EditionForm'
import { PageHeader } from '@/components/general/PageHeader'

export const metadata = {
    title: 'Crear Edición - Panel',
}

export default async function CreateEditionPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id: eventId } = await params

    return (
        <div className="flex flex-col gap-6 max-w-3xl pt-4">
            <PageHeader
                title="Nueva Edición"
                description="Agrega una nueva edición anual a este evento."
                backHref={`/admin/events/${eventId}/edition`}
                className="-mt-2 mb-2"
            />
            <EditionForm eventId={eventId} />
        </div>
    )
}
