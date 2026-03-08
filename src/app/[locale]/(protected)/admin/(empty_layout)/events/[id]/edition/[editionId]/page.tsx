import { EditionForm } from '../components/EditionForm'
import { PageHeader } from '@/components/general/PageHeader'
import { getEditionById } from '../actions'

export const metadata = {
    title: 'Editar Edición - Panel',
}

export default async function EditEditionPage({
    params
}: {
    params: Promise<{ id: string, editionId: string }>
}) {
    const { id: eventId, editionId } = await params
    const edition = await getEditionById(editionId)

    if (!edition) return null

    return (
        <div className="flex flex-col gap-6 max-w-3xl pt-4">
            <PageHeader
                title="Editar Edición"
                description={`Modifica los datos de ${edition?.name?.es || 'esta edición'}.`}
                backHref={`/admin/events/${eventId}/edition`}
            />
            <hr className='border' />
            <EditionForm eventId={eventId} editionInfo={edition} />
        </div>
    )
}
