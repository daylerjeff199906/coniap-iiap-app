import { getSubmissions } from '@/app/[locale]/(protected)/admin/(with_layout)/submissions/actions'
import { ParticipantsTab } from '@/app/[locale]/(protected)/admin/(empty_layout)/events/[id]/call/[callId]/(details)/components/ParticipantsTab'

export const metadata = {
    title: 'Participantes - Convocatoria',
}

export default async function IndexCallDetailsPage({
    params
}: {
    params: Promise<{ id: string; locale: string }>
}) {
    const { id: callId } = await params
    const submissions = await getSubmissions({ callId }) as any[]

    return (
        <div className="w-full">
            <ParticipantsTab submissions={submissions} />
        </div>
    )
}
