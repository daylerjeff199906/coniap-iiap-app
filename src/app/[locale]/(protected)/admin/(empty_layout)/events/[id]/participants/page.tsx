import { PageHeader } from '@/components/general/PageHeader'
import { getParticipants, getParticipantRoles, getEventsList } from '@/app/[locale]/(protected)/admin/participants/actions'
import { ParticipantTable } from '@/app/[locale]/(protected)/admin/participants/components/ParticipantTable'
import { ParticipantFilters } from '@/app/[locale]/(protected)/admin/participants/components/ParticipantFilters'
import { IParticipant } from '@/types/participant'
import { getEventById } from '@/app/[locale]/(protected)/admin/(with_layout)/events/actions'

export const metadata = {
    title: 'Participantes del Evento - Panel',
}

export default async function EventParticipantsPage({
    params,
    searchParams
}: {
    params: Promise<{ id: string; locale: string }>
    searchParams: Promise<{ q?: string; role?: string }>
}) {
    const { id: eventId } = await params
    const sParams = await searchParams
    const searchQuer = sParams.q || ''
    const roleSlug = sParams.role || ''

    const participants = await getParticipants({
        eventId,
        roleSlug: roleSlug || undefined
    })

    const roles = await getParticipantRoles()
    const event = await getEventById(eventId)
    const events = await getEventsList()

    // Client-side filtering for search query
    const filteredParticipants = participants.filter((p: IParticipant) => {
        const fullName = `${p.profiles?.first_name || ''} ${p.profiles?.last_name || ''}`.toLowerCase()
        return fullName.includes(searchQuer.toLowerCase()) || p.profiles?.email?.toLowerCase().includes(searchQuer.toLowerCase())
    })

    return (
        <div className="flex flex-col gap-6 pt-4">
            <PageHeader
                title={event?.name ? `Participantes: ${event.name}` : "Participantes del Evento"}
                description="Gestión de participantes inscritos en este evento específico."
            />
            <div className="flex flex-col gap-2">
                <ParticipantFilters roles={roles} events={events} />
                <ParticipantTable participants={filteredParticipants} showEventInfo={false} />
            </div>
        </div>
    )
}
