import { getCalls } from '@/app/[locale]/(protected)/admin/calls/actions'
import { CallTable } from '@/app/[locale]/(protected)/admin/calls/components/CallTable'
import { CallFilters } from '@/app/[locale]/(protected)/admin/calls/components/CallFilters'
import { ICall } from '@/types/call'

export const metadata = {
    title: 'Convocatorias - Panel',
}

export default async function CallsPage({
    searchParams
}: {
    searchParams: Promise<{ q?: string; status?: string }>
}) {
    const sParams = await searchParams
    const searchQuer = sParams.q || ''
    const status = sParams.status || 'all'

    const calls = await getCalls({
        isActive: status === 'active' ? true : status === 'inactive' ? false : undefined
    })

    // Filter by search query
    const filteredCalls = calls.filter((c: ICall) => {
        return c.title.toLowerCase().includes(searchQuer.toLowerCase()) ||
            c.description?.toLowerCase().includes(searchQuer.toLowerCase())
    })

    return (
        <div className="flex flex-col gap-2">
            <CallFilters />
            <CallTable calls={filteredCalls} />
        </div>
    )
}

