import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { PageHeader } from '@/components/general/PageHeader'
import { getParticipants, getParticipantRoles, getEventsList, getEditionsByEventList } from '@/app/[locale]/(protected)/admin/participants/actions'
import { ParticipantTable } from '@/app/[locale]/(protected)/admin/participants/components/ParticipantTable'
import { ParticipantFilters } from '@/app/[locale]/(protected)/admin/participants/components/ParticipantFilters'
import { IParticipant } from '@/types/participant'

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
        <LayoutWrapper sectionTitle="Gestión de Participantes">
            <div className="flex flex-col gap-6">
                <PageHeader
                    title="Participantes"
                    description="Lista maestra de todas las personas registradas en los diferentes eventos y ediciones del sistema."
                    className="mb-2"
                />

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
            </div>
        </LayoutWrapper>
    )
}
