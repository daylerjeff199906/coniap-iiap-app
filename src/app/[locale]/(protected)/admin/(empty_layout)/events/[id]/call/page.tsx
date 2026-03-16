import { getCalls, getEditionsByEvent } from '@/app/[locale]/(protected)/admin/calls/actions'
import { CallTable } from '@/app/[locale]/(protected)/admin/calls/components/CallTable'
import { CallFilters } from '@/app/[locale]/(protected)/admin/calls/components/CallFilters'
import { ICall } from '@/types/call'
import { EditionFilter } from '@/app/[locale]/(protected)/admin/calls/components/EditionFilter'
import { CallTypeCheckbox } from '@/app/[locale]/(protected)/admin/calls/components/CallTypeCheckbox'

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
    const activeTab = sParams.tab || 'all'
 
    const allCalls = await getCalls({
        eventId,
        isActive: status === 'active' ? true : status === 'inactive' ? false : undefined
    })
 
    const editions = await getEditionsByEvent(eventId)
 
    // Filter calls in one pass
    const filteredCalls = allCalls.filter((c: ICall) => {
        const matchesSearch = c.title.toLowerCase().includes(searchQuer.toLowerCase()) ||
            c.description?.toLowerCase().includes(searchQuer.toLowerCase())
            
        if (!matchesSearch) return false
 
        // Si es "event", excluir los de edición
        if (activeTab === 'event' && c.edition_id) return false
 
        // Si se seleccionó una edición específica
        if (editionId !== 'all' && c.edition_id !== editionId) return false
 
        return true
    })
 
    return (
        <div className="flex flex-col gap-6 pt-4">
            <CallFilters eventId={eventId} />
 
            <div className="w-full space-y-4">
                <div className="flex justify-end gap-3 pr-1 items-center">
                    <CallTypeCheckbox />
                    {activeTab !== 'event' && (
                        <EditionFilter editions={editions} locale={locale} />
                    )}
                </div>
 
                <CallTable calls={filteredCalls} eventId={eventId} showEventInfo={activeTab !== 'event'} />
            </div>
        </div>
    )
}
