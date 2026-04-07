import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { PageHeader } from '@/components/general/PageHeader'
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
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            <PageHeader
                title="Nueva Convocatoria"
                description="Habilita un nuevo registro para recopilar propuestas y participaciones."
                backHref="/admin/calls"
                variant="chevron"
                className="mb-2"
            />
            <div className="max-w-5xl mx-auto w-full">
                <CallForm
                    events={events || []}
                    roles={roles || []}
                    locale={locale}
                />
            </div>
        </div>
    )
}
