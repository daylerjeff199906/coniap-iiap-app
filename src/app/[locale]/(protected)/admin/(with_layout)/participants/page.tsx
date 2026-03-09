import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { PageHeader } from '@/components/general/PageHeader'
import { getParticipants, getParticipantRoles, getEventsList } from '@/app/[locale]/(protected)/admin/participants/actions'
import { ParticipantTable } from '@/app/[locale]/(protected)/admin/participants/components/ParticipantTable'
import { ParticipantFilters } from '@/app/[locale]/(protected)/admin/participants/components/ParticipantFilters'
import { IParticipant } from '@/types/participant'

export const metadata = {
    title: 'Participantes - Panel',
}

export default async function ParticipantsPage({
    searchParams
}: {
    searchParams: Promise<{ q?: string; role?: string; page?: string }>
}) {
    const sParams = await searchParams
    const searchQuer = sParams.q || ''
    const roleSlug = sParams.role || ''

    const participants = await getParticipants({
        roleSlug: roleSlug || undefined
    })

    const roles = await getParticipantRoles()
    const events = await getEventsList()

    // Client-side filtering for search query (simple implementation)
    const filteredParticipants = participants.filter((p: IParticipant) => {
        const fullName = `${p.profiles?.first_name || ''} ${p.profiles?.last_name || ''}`.toLowerCase()
        return fullName.includes(searchQuer.toLowerCase()) || p.profiles?.email?.toLowerCase().includes(searchQuer.toLowerCase())
    })

    return (
        <LayoutWrapper sectionTitle="Gestión de Participantes">
            <div className="flex flex-col gap-6">
                <PageHeader
                    title="Participantes"
                    description="Lista maestra de todas las personas registradas en los diferentes eventos y ediciones del sistema."
                    className="mb-2"
                />

                <div className="flex flex-col gap-2">
                    <ParticipantFilters roles={roles} events={events} />
                    <ParticipantTable participants={filteredParticipants} />
                </div>
            </div>
        </LayoutWrapper>
    )
}
