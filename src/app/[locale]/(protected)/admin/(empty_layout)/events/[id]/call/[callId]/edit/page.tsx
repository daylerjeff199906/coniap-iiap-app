import { CallForm } from '@/app/[locale]/(protected)/admin/calls/components/CallForm'
import { getCallById, getParticipantRoles } from '@/app/[locale]/(protected)/admin/calls/actions'
import { notFound } from 'next/navigation'

export const metadata = {
    title: 'Editar Convocatoria de Evento - Panel',
}

export default async function EventEditCallPage({
    params
}: {
    params: Promise<{ id: string; callId: string; locale: string }>
}) {
    const { id: eventId, callId, locale } = await params
    const call = await getCallById(callId)
    if (!call) notFound()

    const roles = await getParticipantRoles()

    return (
        <div className="max-w-5xl mx-auto w-full pt-6">
            <CallForm
                callInfo={call}
                roles={roles || []}
                fixedEventId={eventId}
                locale={locale}
            />
        </div>
    )
}
