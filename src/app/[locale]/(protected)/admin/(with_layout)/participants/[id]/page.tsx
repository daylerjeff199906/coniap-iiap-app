import { notFound } from 'next/navigation'
import { getParticipantById } from '@/app/[locale]/(protected)/admin/participants/actions'
import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { ParticipantDetailView } from '@/app/[locale]/(protected)/admin/participants/components/ParticipantDetailView'

export const metadata = {
    title: 'Detalle de Participante - Panel',
}

export default async function ParticipantDetailPage({
    params,
}: {
    params: Promise<{ id: string; locale: string }>
}) {
    const { id } = await params
    const participant = await getParticipantById(id)

    if (!participant) {
        notFound()
    }

    return (
        <LayoutWrapper sectionTitle="Gestión de Participantes">
            <ParticipantDetailView participant={participant as any} />
        </LayoutWrapper>
    )
}
