import { getEventById } from '../actions'
import { EventForm } from '../components/EventForm'
import { notFound } from 'next/navigation'

export default async function EditEventGeneralPage({
    params
}: {
    params: { id: string }
}) {
    const id = await params.id
    const event = await getEventById(id)

    if (!event) notFound()

    return (
        <div className="flex flex-col gap-6 max-w-4xl pt-4">
            <h2 className="text-xl font-bold">Información General</h2>
            <p className="text-muted-foreground text-sm -mt-4 mb-4">Actualiza o modifica los datos fundamentales de este evento.</p>

            <EventForm eventInfo={event} />
        </div>
    )
}
