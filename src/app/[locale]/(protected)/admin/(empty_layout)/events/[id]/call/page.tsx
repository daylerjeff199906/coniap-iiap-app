import { getCalls, getEditionsByEvent } from '@/app/[locale]/(protected)/admin/calls/actions'
import { CallTable } from '@/app/[locale]/(protected)/admin/calls/components/CallTable'
import { CallFilters } from '@/app/[locale]/(protected)/admin/calls/components/CallFilters'
import { ICall } from '@/types/call'
import { TabsContent } from '@/components/ui/tabs'
import { EditionFilter } from '@/app/[locale]/(protected)/admin/calls/components/EditionFilter'
import { CallTabs } from '@/app/[locale]/(protected)/admin/calls/components/CallTabs'

export const metadata = {
    title: 'Convocatorias del Evento - Panel',
}

export default async function EventCallsPage({
    params,
    searchParams
}: {
    params: Promise<{ id: string; locale: string }>
    searchParams: Promise<{ q?: string; status?: string; editionId?: string; tab?: string }>
}) {
    const { id: eventId, locale } = await params
    const sParams = await searchParams
    const searchQuer = sParams.q || ''
    const status = sParams.status || 'all'
    const editionId = sParams.editionId || 'all'
    const activeTab = sParams.tab || 'event'

    const allCalls = await getCalls({
        eventId,
        isActive: status === 'active' ? true : status === 'inactive' ? false : undefined
    })

    const editions = await getEditionsByEvent(eventId)

    // Filter calls
    const eventCalls = allCalls.filter(c => !c.edition_id)
    const editionCalls = allCalls.filter(c => c.edition_id)

    const filterBySearch = (calls: ICall[]) => calls.filter((c: ICall) => {
        return c.title.toLowerCase().includes(searchQuer.toLowerCase()) ||
            c.description?.toLowerCase().includes(searchQuer.toLowerCase())
    })

    const filteredEventCalls = filterBySearch(eventCalls)
    let filteredEditionCalls = filterBySearch(editionCalls)

    if (editionId !== 'all') {
        filteredEditionCalls = filteredEditionCalls.filter(c => c.edition_id === editionId)
    }

    return (
        <div className="flex flex-col gap-6 pt-4">
            <CallFilters eventId={eventId} />

            <div className="w-full">
                <CallTabs defaultValue="event" />

                <div className="mt-4">
                    {activeTab === 'event' && (
                        <CallTable calls={filteredEventCalls} eventId={eventId} showEventInfo={false} />
                    )}

                    {activeTab === 'editions' && (
                        <div className="space-y-4">
                            <div className="flex justify-end pr-1">
                                <EditionFilter editions={editions} locale={locale} />
                            </div>
                            <CallTable calls={filteredEditionCalls} eventId={eventId} showEventInfo={true} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
