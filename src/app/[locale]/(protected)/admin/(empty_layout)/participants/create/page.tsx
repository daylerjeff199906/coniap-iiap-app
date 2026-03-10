import { AddParticipantForm } from '@/app/[locale]/(protected)/admin/participants/components/AddParticipantForm'
import { getParticipantRoles, getEventsList } from '@/app/[locale]/(protected)/admin/participants/actions'

export const metadata = {
    title: 'Añadir Participante - Panel',
}

export default async function CreateParticipantPage({
    searchParams
}: {
    searchParams: Promise<{ eventId?: string }>
}) {
    const sParams = await searchParams
    const initialEventId = sParams.eventId || ''

    // Fetch necessary data for the form
    const roles = await getParticipantRoles()
    const events = await getEventsList()

    return (
        <div className="py-4">
            <AddParticipantForm
                roles={roles}
                events={events}
                initialEventId={initialEventId}
            />
        </div>
    )
}
