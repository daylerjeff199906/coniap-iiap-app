import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { PageHeader } from '@/components/general/PageHeader'
import { CallForm } from '@/app/[locale]/(protected)/admin/calls/components/CallForm'
import { getCallById, getAllEvents, getParticipantRoles } from '@/app/[locale]/(protected)/admin/calls/actions'
import { notFound } from 'next/navigation'

export const metadata = {
    title: 'Editar Convocatoria - Panel',
}

export default async function EditCallPage({
    params
}: {
    params: Promise<{ id: string; locale: string }>
}) {
    const { id, locale } = await params
    const call = await getCallById(id)
    if (!call) notFound()

    const events = await getAllEvents()
    const roles = await getParticipantRoles()

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            <div className="max-w-5xl mx-auto w-full">
                <CallForm
                    callInfo={call}
                    events={events || []}
                    roles={roles || []}
                    locale={locale}
                />
            </div>
        </div>
    )
}
