import { EventForm } from '../../../(with_layout)/events/components/EventForm'
import { PageHeader } from '@/components/general/PageHeader'
export const metadata = {
    title: 'Crear Evento - Panel',
}

export default async function CreateEventPage({
    params
}: {
    params: Promise<{ locale: string }>
}) {
    // Ya no es estrictamente necesario extraer locale para el path si usamos el Link de routing
    const { locale } = await params

    return (
        <main className="min-h-[100dvh] bg-muted/20 flex flex-col pt-8 sm:pt-16 pb-20 items-center w-full">
            <div className="flex flex-col gap-6 container max-w-3xl px-4 w-full">
                <PageHeader
                    title="Crear Nuevo Evento"
                    description="Completa la información básica para iniciar tu evento."
                    backHref="/admin/events"
                    className="mb-4"
                />
                <EventForm />
            </div>
        </main>
    )
}
