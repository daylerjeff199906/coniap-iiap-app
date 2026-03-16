import { redirect } from 'next/navigation'

export default async function EventCallDetailsPage({
    params
}: {
    params: Promise<{ id: string; callId: string; locale: string }>
}) {
    const { id: eventId, callId, locale } = await params
    return redirect(`/${locale}/admin/events/${eventId}/call/${callId}/participants`)
}
