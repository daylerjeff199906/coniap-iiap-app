import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { CallForm } from '@/app/[locale]/(protected)/admin/calls/components/CallForm'
import { getAllEvents, getParticipantRoles } from '@/app/[locale]/(protected)/admin/calls/actions'

export const metadata = {
    title: 'Nueva Convocatoria - Panel',
}

export default async function CreateCallPage({
    params
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    const events = await getAllEvents()
    const roles = await getParticipantRoles()

    return (
        <LayoutWrapper sectionTitle="Crear Convocatoria">
            <div className="max-w-5xl mx-auto w-full">
                <CallForm
                    events={events || []}
                    roles={roles || []}
                    locale={locale}
                />
            </div>
        </LayoutWrapper>
    )
}
