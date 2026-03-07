import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { EventNavigation } from './components/EventNavigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getEventById } from '../actions'
import { notFound } from 'next/navigation'

export const metadata = {
    title: 'Edición de Evento - Panel',
}

export default async function EditEventLayout({
    params,
    children
}: {
    params: { locale: string; id: string }
    children: React.ReactNode
}) {
    const locale = await params.locale
    const id = await params.id

    const event = await getEventById(id)

    if (!event) {
        notFound()
    }

    return (
        <LayoutWrapper sectionTitle="Gestión de Eventos">
            <div className="flex flex-col gap-6 max-w-6xl w-full mx-auto">
                <div className="flex items-center justify-between pb-4">
                    <div className="flex items-center gap-4">
                        <Link href={`/${locale}/admin/events`} className="p-2 bg-muted hover:bg-muted/80 rounded-full transition-colors flex-shrink-0">
                            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                        </Link>
                        <div className="flex flex-col overflow-hidden">
                            <h1 className="text-2xl font-bold tracking-tight truncate">{event.name}</h1>
                            <p className="text-muted-foreground text-sm flex items-center gap-2">
                                <span className="bg-blue-100 text-blue-700 font-medium px-2 py-0.5 rounded-full text-xs"> /{event.slug}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-card w-full border shadow-sm rounded-3xl p-4 md:p-8 flex flex-col min-h-[500px]">
                    <EventNavigation locale={locale} eventId={id} />

                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {children}
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    )
}
