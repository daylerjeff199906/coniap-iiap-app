import { getCallById } from '@/app/[locale]/(protected)/admin/calls/actions'
import { getSubmissions } from '@/app/[locale]/(protected)/admin/(with_layout)/submissions/actions'
import { notFound } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CallDetailsHeader } from './components/CallDetailsHeader'
import { ParticipantsTab } from './components/ParticipantsTab'
import { SubmissionsTab } from './components/SubmissionsTab'
import { IconUsers, IconFileDescription } from '@tabler/icons-react'

export const metadata = {
    title: 'Detalles de Convocatoria - Panel',
}

export default async function EventCallDetailsPage({
    params
}: {
    params: Promise<{ id: string; callId: string; locale: string }>
}) {
    const { id: eventId, callId } = await params
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
        <div className="flex flex-col gap-6 pt-4 max-w-7xl mx-auto w-full">
            <CallDetailsHeader call={call} eventId={eventId} />

            <Tabs defaultValue="participants" className="w-full space-y-4">
                <TabsList className="bg-slate-100/80 p-1 border rounded-xl flex items-center h-12">
                    <TabsTrigger value="participants" className="gap-2 text-sm font-semibold rounded-lg flex-1 h-full flex items-center justify-center">
                        <IconUsers size={18} />
                        Participantes ({participantsCount})
                    </TabsTrigger>
                    <TabsTrigger value="submissions" className="gap-2 text-sm font-semibold rounded-lg flex-1 h-full flex items-center justify-center">
                        <IconFileDescription size={18} />
                        Resúmenes / Archivos ({submissions.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="participants" className="mt-2">
                    <ParticipantsTab submissions={submissions} />
                </TabsContent>

                <TabsContent value="submissions" className="mt-2">
                    <SubmissionsTab submissions={submissions} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
