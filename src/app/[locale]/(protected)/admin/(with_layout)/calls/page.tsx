import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { PageHeader } from '@/components/general/PageHeader'
import { getCalls } from './actions'
import { CallTable } from './components/CallTable'
import { CallFilters } from './components/CallFilters'

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
    const filteredCalls = calls.filter(c => {
        return c.title.toLowerCase().includes(searchQuer.toLowerCase()) ||
            c.description?.toLowerCase().includes(searchQuer.toLowerCase())
    })

    return (
        <LayoutWrapper sectionTitle="Gestión de Convocatorias">
            <div className="flex flex-col gap-6">
                <PageHeader
                    title="Convocatorias y Llamados"
                    description="Administra todas las convocatorias vigentes para ponentes, participantes y aliados."
                    className="mb-2"
                />

                <div className="flex flex-col gap-2">
                    <CallFilters />
                    <CallTable calls={filteredCalls} />
                </div>
            </div>
        </LayoutWrapper>
    )
}
