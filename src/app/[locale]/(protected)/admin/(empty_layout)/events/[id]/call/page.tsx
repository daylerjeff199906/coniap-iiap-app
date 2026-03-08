import { getCalls } from '@/app/[locale]/(protected)/admin/calls/actions'
import { CallTable } from '@/app/[locale]/(protected)/admin/calls/components/CallTable'
import { CallFilters } from '@/app/[locale]/(protected)/admin/calls/components/CallFilters'

export const metadata = {
    title: 'Convocatorias del Evento - Panel',
}

export default async function EventCallsPage({
    params,
    searchParams
}: {
    params: Promise<{ id: string; locale: string }>
    searchParams: Promise<{ q?: string; status?: string }>
}) {
    const { id: eventId } = await params
    const sParams = await searchParams
    const searchQuer = sParams.q || ''
    const status = sParams.status || 'all'

    const calls = await getCalls({
        eventId,
        isActive: status === 'active' ? true : status === 'inactive' ? false : undefined
    })

    const filteredCalls = calls.filter(c => {
        return c.title.toLowerCase().includes(searchQuer.toLowerCase()) ||
            c.description?.toLowerCase().includes(searchQuer.toLowerCase())
    })

    return (
        <div className="flex flex-col gap-6 pt-4">
            <div className="flex flex-col gap-2">
                <CallFilters eventId={eventId} />
                <CallTable calls={filteredCalls} eventId={eventId} showEventInfo={false} />
            </div>
        </div>
    )
}
