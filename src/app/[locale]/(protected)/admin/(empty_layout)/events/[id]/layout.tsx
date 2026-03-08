import { EventNavigation } from './components/EventNavigation'
import { PageHeader } from '@/components/general/PageHeader'
import { Link } from '@/i18n/routing'
import { getEventById } from '../../../(with_layout)/events/actions'
import { IconDatabaseOff } from '@tabler/icons-react'

export const metadata = {
    title: 'Edición de Evento - Panel',
}

export default async function EditEventLayout({
    params,
    children
}: {
    params: Promise<{ locale: string; id: string }>
    children: React.ReactNode
}) {
    const { locale, id } = await params

    const event = await getEventById(id)

    if (!event) {
        return (
            <div className="flex flex-col gap-6 max-w-lg mx-auto w-full items-center justify-center min-h-[50vh] text-center">
                <div className="bg-muted/50 p-6 rounded-full mb-2">
                    <IconDatabaseOff size={64} className="text-muted-foreground/50" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">Evento no encontrado</h1>
                <p className="text-muted-foreground">El evento que intentas consultar o editar no existe, ha sido eliminado o no tienes permisos para verlo.</p>
                <Link href="/admin/events" className="mt-4 px-8 py-2.5 bg-[#0064e0] text-white rounded-full hover:bg-[#0057c2] transition-colors font-medium">
                    Volver a eventos
                </Link>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-6 max-w-7xl w-full mx-auto">
            <div className="flex items-center justify-between pb-4">
                <PageHeader
                    title={event.name}
                    description="Gestiona y administra todos los detalles y configuraciones de tu evento."
                    backHref="/admin/events"
                    variant="chevron"
                />
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-10 min-h-[600px] items-start">
                <EventNavigation locale={locale} eventId={id} />
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 flex-1 w-full lg:min-h-[500px] lg:border-l border-muted">
                    {children}
                </div>
            </div>
        </div>
    )
}
