import { PageHeader } from '@/components/general/PageHeader'
import { getParticipants, getParticipantRoles, getEventsList, getEditionsByEventList } from '@/app/[locale]/(protected)/admin/participants/actions'
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
    searchParams: Promise<{ q?: string; role?: string; scope?: string; editionId?: string; page?: string }>
}) {
    const { id: eventId } = await params
    const sParams = await searchParams
    const searchQuer = sParams.q || ''
    const roleSlug = sParams.role || ''
    const scope = sParams.scope || 'all'
    const editionId = sParams.editionId
    const page = parseInt(sParams.page || '1', 10)
    const pageSize = 20

    const { data: allParticipants, count } = await getParticipants({
        eventId,
        roleSlug: roleSlug || undefined,
        q: searchQuer || undefined,
        page,
        pageSize
    })

    const roles = await getParticipantRoles()
    const event = await getEventById(eventId)
    const events = await getEventsList()
    const editions = await getEditionsByEventList(eventId)

    // Filter participants based on scope (Note: Ideally this should be on server, but keeping logic for now)
    let filteredList = allParticipants

    if (scope === 'global') {
        filteredList = allParticipants.filter(p => !p.edition_id)
    } else if (scope === 'edition') {
        const effectiveEditionId = editionId || (editions.length > 0 ? editions[0].id : null)
        if (effectiveEditionId) {
            filteredList = allParticipants.filter(p => p.edition_id === effectiveEditionId)
        } else {
            filteredList = []
        }
    }

    const finalParticipants = filteredList

    return (
        <div className="flex flex-col gap-6 pt-4">
            <PageHeader
                title={event?.name ? `Participantes: ${event.name}` : "Participantes del Evento"}
                description="Listado detallado de personas inscritas a este evento global o ediciones particulares."
            />

            <div className="flex flex-col gap-4">
                <ParticipantFilters roles={roles} events={events} editions={editions as any} />

                <div className="w-full">
                    <div className="flex items-center gap-2 mb-4 px-1">
                        <div className={`h-2 w-2 rounded-full ${scope === 'all' ? 'bg-blue-500' : scope === 'global' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                            Mostrando: {
                                scope === 'all' ? 'Todos los registros' :
                                    scope === 'global' ? 'Solo Evento Global' :
                                        `Edición: ${editions.find(e => e.id === editionId)?.year || editions[0]?.year || 'Seleccionada'}`
                            }
                        </span>
                    </div>

                    <ParticipantTable
                        participants={finalParticipants}
                        showEventInfo={scope !== 'global'}
                        totalItems={count}
                        currentPage={page}
                        pageSize={pageSize}
                    />
                </div>
            </div>
        </div>
    )
}
