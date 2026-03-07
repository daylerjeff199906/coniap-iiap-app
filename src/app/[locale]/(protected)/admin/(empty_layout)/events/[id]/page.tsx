import { getEventById } from '../../../(with_layout)/events/actions'
import { EventForm } from '../../../(with_layout)/events/components/EventForm'
import { PageHeader } from '@/components/general/PageHeader'

export default async function EditEventGeneralPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const event = await getEventById(id)

    if (!event) return null

    return (
        <div className="flex flex-col gap-6 max-w-3xl pt-4">
            <PageHeader
                title="Información General"
                description="Actualiza o modifica los datos fundamentales de este evento."
                className="-mt-2 mb-2"
            />

            <EventForm eventInfo={event} />
        </div>
    )
}
