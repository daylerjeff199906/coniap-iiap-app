import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { IconArrowLeft, IconEdit, IconSpeakerphone } from '@tabler/icons-react'
import { Link } from '@/i18n/routing'
import { ICall } from '@/types/call'

interface CallDetailsHeaderProps {
    call: ICall
    eventId: string
}

export function CallDetailsHeader({ call, eventId }: CallDetailsHeaderProps) {
    const startDate = new Date(call.start_date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
    const endDate = new Date(call.end_date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })

    return (
        <div className="flex flex-col gap-4 border-b pb-6">
            <div className="flex items-center gap-2 text-muted-foreground">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" asChild>
                    <Link href={`/admin/events/${eventId}/call`}>
                        <IconArrowLeft size={18} />
                    </Link>
                </Button>
                <span className="text-sm font-medium">Volver a convocatorias</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center border border-blue-100 flex-shrink-0">
                        <IconSpeakerphone size={24} />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900 leading-tight">
                                {call.title}
                            </h1>
                            <Badge variant={call.is_active ? 'default' : 'secondary'} className="rounded-full px-2 py-0 text-[10px] font-bold uppercase tracking-wider">
                                {call.is_active ? 'Abierta' : 'Cerrada'}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5 max-w-2xl">
                            {call.description || 'Sin descripción'}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <span className="font-semibold">Periodo:</span> {startDate} - {endDate}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Link href={`/admin/events/${eventId}/call/${call.id}/edit`}>
                        <Button variant="outline" className="rounded-xl h-10 px-4 gap-2 border-slate-200">
                            <IconEdit size={16} />
                            Editar
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
