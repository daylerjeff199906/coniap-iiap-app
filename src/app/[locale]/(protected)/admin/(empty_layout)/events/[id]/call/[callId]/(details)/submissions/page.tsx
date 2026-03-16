import { getSubmissions } from '@/app/[locale]/(protected)/admin/(with_layout)/submissions/actions'
import { SubmissionsTab } from '../components/SubmissionsTab'

export const metadata = {
    title: 'Resúmenes y Archivos - Convocatoria',
}

export default async function SubmissionsPage({
    params
}: {
    params: Promise<{ id: string; callId: string; locale: string }>
}) {
    const { callId } = await params
    const submissions = await getSubmissions({ callId }) as any[]

    return (
        <div className="w-full">
            <SubmissionsTab submissions={submissions} />
        </div>
    )
}
