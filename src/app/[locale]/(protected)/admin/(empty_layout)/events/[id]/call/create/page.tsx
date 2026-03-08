import { CallForm } from '@/app/[locale]/(protected)/admin/calls/components/CallForm'
import { getParticipantRoles } from '@/app/[locale]/(protected)/admin/calls/actions'

export const metadata = {
    title: 'Nueva Convocatoria de Evento - Panel',
}

export default async function EventCreateCallPage({
    params
}: {
    params: Promise<{ id: string; locale: string }>
}) {
    const { id: eventId, locale } = await params
    const roles = await getParticipantRoles()

    return (
        <div className="max-w-5xl mx-auto w-full pt-6">
            <CallForm
                roles={roles || []}
                fixedEventId={eventId}
                locale={locale}
            />
        </div>
    )
}
