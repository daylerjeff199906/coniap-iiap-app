import { PageHeader } from '@/components/general/PageHeader'
import { getParticipants, getParticipantRoles, getEventsList, getEditionsByEventList } from '@/app/[locale]/(protected)/admin/participants/actions'
import { ParticipantTable } from '@/app/[locale]/(protected)/admin/participants/components/ParticipantTable'
import { ParticipantFilters } from '@/app/[locale]/(protected)/admin/participants/components/ParticipantFilters'
import { ParticipantTabs } from '@/app/[locale]/(protected)/admin/participants/components/ParticipantTabs'
import { ParticipantEditionFilter } from '@/app/[locale]/(protected)/admin/participants/components/ParticipantEditionFilter'
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
    searchParams: Promise<{ q?: string; role?: string; tab?: string; editionId?: string }>
}) {
    const { id: eventId, locale } = await params
    const sParams = await searchParams
    const searchQuer = sParams.q || ''
    const roleSlug = sParams.role || ''
    const activeTab = sParams.tab || 'event'
    const editionId = sParams.editionId || 'all'

    const allParticipants = await getParticipants({
        eventId,
        roleSlug: roleSlug || undefined
    })

    const roles = await getParticipantRoles()
    const event = await getEventById(eventId)
    const events = await getEventsList()
    const editions = await getEditionsByEventList(eventId)

    // Filter by search query
    const filterBySearch = (list: IParticipant[]) => {
        return list.filter((p: IParticipant) => {
            const fullName = `${p.profiles?.first_name || ''} ${p.profiles?.last_name || ''}`.toLowerCase()
            return fullName.includes(searchQuer.toLowerCase()) || p.profiles?.email?.toLowerCase().includes(searchQuer.toLowerCase())
        })
    }

    // Split participants
    const eventParticipants = allParticipants.filter(p => !p.edition_id)
    const editionParticipants = allParticipants.filter(p => p.edition_id)

    // Filter edition participants further by selected edition
    let filteredEditionParticipants = editionParticipants
    if (editionId !== 'all') {
        filteredEditionParticipants = editionParticipants.filter(p => p.edition_id === editionId)
    }

    const filteredEventParticipants = filterBySearch(eventParticipants)
    const finalEditionParticipants = filterBySearch(filteredEditionParticipants)

    return (
        <div className="flex flex-col gap-6 pt-4">
            <PageHeader
                title={event?.name ? `Participantes: ${event.name}` : "Participantes del Evento"}
                description="Listado detallado de personas inscritas a este evento global o ediciones particulares."
            />

            <div className="flex flex-col gap-4">
                <ParticipantFilters roles={roles} events={events} />

                <div className="w-full">
                    <ParticipantTabs defaultValue="event" />

                    <div className="mt-4">
                        {activeTab === 'event' && (
                            <div className="space-y-4">
                                <span className="text-[11px] font-bold text-muted-foreground uppercase opacity-70 ml-1">
                                    Participantes inscritos al evento general (sin edición específica)
                                </span>
                                <ParticipantTable participants={filteredEventParticipants} showEventInfo={false} />
                            </div>
                        )}

                        {activeTab === 'editions' && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-[11px] font-bold text-muted-foreground uppercase opacity-70 ml-1">
                                        Filtro dinámico por edición del evento
                                    </span>
                                    <ParticipantEditionFilter editions={editions as any} locale={locale} />
                                </div>
                                <ParticipantTable participants={finalEditionParticipants} showEventInfo={true} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
