import { getSubmissions } from '@/app/[locale]/(protected)/admin/(with_layout)/submissions/actions'
import { SubmissionsTab } from '@/app/[locale]/(protected)/admin/(empty_layout)/events/[id]/call/[callId]/(details)/components/SubmissionsTab'

export const metadata = {
    title: 'Resúmenes y Archivos - Convocatoria',
}

export default async function SubmissionsPage({
    params
}: {
    params: Promise<{ id: string; locale: string }>
}) {
    const { id: callId } = await params
    const submissions = await getSubmissions({ callId }) as any[]

    return (
        <div className="w-full">
            <SubmissionsTab submissions={submissions} />
        </div>
    )
}
