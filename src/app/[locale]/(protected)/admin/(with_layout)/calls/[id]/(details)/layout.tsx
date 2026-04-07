import { getCallById } from '@/app/[locale]/(protected)/admin/calls/actions'
import { getSubmissions } from '@/app/[locale]/(protected)/admin/(with_layout)/submissions/actions'
import { notFound } from 'next/navigation'
import { CallDetailsHeader } from '../components/CallDetailsHeader'
import { CallDetailsNavigation } from '../components/CallDetailsNavigation'
import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'

export const metadata = {
    title: 'Detalles de Convocatoria - Panel',
}

export default async function CallDetailsLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: Promise<{ id: string; locale: string }>
}) {
    const { id: callId, locale } = await params
    const call = await getCallById(callId)
    if (!call) notFound()

    const submissions = await getSubmissions({ callId }) as any[]

    // Count unique participants
    const uniqueProfilesMap = new Map<string, any>()
    submissions.forEach(s => {
        if (s.profile) {
            uniqueProfilesMap.set(s.profile.id, s.profile)
        }
    })
    const participantsCount = uniqueProfilesMap.size

    return (
        <div className="flex flex-col gap-6 pt-4 w-full px-4 sm:px-6 animate-in fade-in duration-500">
            <CallDetailsHeader call={call as any} />

            <CallDetailsNavigation
                callId={callId}
                participantsCount={participantsCount}
                submissionsCount={submissions.length}
            />

            <div className="mt-4">
                {children}
            </div>
        </div>
    )
}
