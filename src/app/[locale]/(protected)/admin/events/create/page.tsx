import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { EventForm } from '../components/EventForm'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export const metadata = {
    title: 'Crear Evento - Panel',
}

export default async function CreateEventPage({
    params
}: {
    params: { locale: string }
}) {
    const locale = await params.locale

    return (
        <LayoutWrapper sectionTitle="Gestión de Eventos">
            <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
                <div className="flex items-center gap-4">
                    <Link href={`/${locale}/admin/events`} className="p-2 bg-muted hover:bg-muted/80 rounded-full transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Crear Nuevo Evento</h1>
                        <p className="text-muted-foreground text-sm">Completa la información básica para iniciar tu evento.</p>
                    </div>
                </div>

                <div className="bg-card p-6 md:p-10 rounded-2xl border shadow-sm">
                    <EventForm />
                </div>
            </div>
        </LayoutWrapper>
    )
}
