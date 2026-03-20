import { getParticipants, getParticipantRoles, getEventsList, getEditionsByEventList } from '@/app/[locale]/(protected)/admin/participants/actions'
import { ParticipantTable } from '@/app/[locale]/(protected)/admin/participants/components/ParticipantTable'
import { ParticipantFilters } from '@/app/[locale]/(protected)/admin/participants/components/ParticipantFilters'

export const metadata = {
    title: 'Participantes - Panel',
}

export default async function ParticipantsPage({
    searchParams
}: {
    searchParams: Promise<{ q?: string; role?: string; page?: string; eventId?: string; editionId?: string }>
}) {
    const sParams = await searchParams
    const searchQuer = sParams.q || ''
    const roleSlug = sParams.role || ''
    const eventId = sParams.eventId || ''
    const editionId = sParams.editionId || ''
    const page = parseInt(sParams.page || '1', 10)
    const pageSize = 20

    const { data: participants, count } = await getParticipants({
        roleSlug: roleSlug || undefined,
        eventId: eventId || undefined,
        editionId: editionId || undefined,
        q: searchQuer,
        page,
        pageSize
    })

    const roles = await getParticipantRoles()
    const events = await getEventsList()
    
    // Fetch editions if an event is selected
    let editions: any[] = []
    if (eventId) {
        editions = await getEditionsByEventList(eventId)
    }

    return (
        <div className="flex flex-col gap-2">
            <ParticipantFilters roles={roles} events={events} editions={editions} />
            <ParticipantTable
                participants={participants}
                roles={roles}
                totalItems={count}
                currentPage={page}
                pageSize={pageSize}
            />
        </div>
    )
}

