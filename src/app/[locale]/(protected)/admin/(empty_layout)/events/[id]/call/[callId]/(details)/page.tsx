import { getSubmissions } from '@/app/[locale]/(protected)/admin/(with_layout)/submissions/actions'
import { ParticipantsTab } from './components/ParticipantsTab';

export const metadata = {
    title: 'Participantes - Convocatoria',
}

export default async function ParticipantsPage({
    params
}: {
    params: Promise<{ id: string; callId: string; locale: string }>
}) {
    const { callId } = await params
    const submissions = await getSubmissions({ callId }) as any[]

    return (
        <div className="w-full">
            <ParticipantsTab submissions={submissions} />
        </div>
    )
}
