import { PageHeader } from '@/components/general/PageHeader'
import { getEditions } from './actions'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { IconCalendarEvent, IconDatabaseOff, IconPlus } from '@tabler/icons-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { EditionActions } from './components/EditionActions'

export const metadata = {
    title: 'Ediciones - Panel',
}

export default async function EditionsPage({
    params
}: {
    params: Promise<{ id: string, locale: string }>
}) {
    const { id: eventId, locale } = await params
    const editions = await getEditions(eventId)

    return (
        <div className="flex flex-col gap-6 pt-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2 -mt-2">
                <PageHeader
                    title="Ediciones"
                    description="Gestiona los años o versiones en los que se ha realizado este evento."
                />
                <Link href={`/admin/events/${eventId}/edition/create`} className="flex-shrink-0">
                    <Button className="bg-[#0064e0] hover:bg-[#0057c2] h-10 w-full sm:w-auto px-6 rounded-xl font-medium">
                        <IconPlus className="mr-2 h-4 w-4" />
                        Crear Edición
                    </Button>
                </Link>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden mt-2">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="pl-6 h-12">Edición</TableHead>
                            <TableHead className="h-12">Año</TableHead>
                            <TableHead className="h-12">Periodo</TableHead>
                            <TableHead className="h-12">Estado</TableHead>
                            <TableHead className="text-center w-[100px] h-12 pr-6">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {editions && editions.length > 0 ? (
                            editions.map((edition: any) => {
                                const imageUrl = edition.cover_url
                                return (
                                    <TableRow key={edition.id} className="hover:bg-muted/30">
                                        <TableCell className="pl-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-blue-50/50 dark:bg-blue-950/20 text-blue-500 rounded-lg overflow-hidden border border-blue-100 dark:border-blue-900/40">
                                                    {imageUrl ? (
                                                        <img src={imageUrl} alt={edition.name?.es} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <IconCalendarEvent size={24} className="opacity-70" />
                                                    )}
                                                </div>
                                                <div className="flex flex-col max-w-[280px]">
                                                    <span className="font-semibold text-[15px] truncate">{edition.name?.es}</span>
                                                    <span className="text-[11px] text-muted-foreground/80 font-mono mt-0.5" title="Slug">/{edition.slug}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4 font-medium">
                                            {edition.year}
                                        </TableCell>
                                        <TableCell className="py-4 text-muted-foreground text-sm">
                                            {edition.start_date || edition.end_date ? (
                                                <div className="flex flex-col">
                                                    {edition.start_date && <span>Inicio: {new Date(edition.start_date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US')}</span>}
                                                    {edition.end_date && <span>Fin: {new Date(edition.end_date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US')}</span>}
                                                </div>
                                            ) : (
                                                <span className="opacity-50">Fechas no definidas</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="py-4">
                                            {edition.is_current ? (
                                                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 pointer-events-none rounded-md px-2.5 py-0.5 text-xs font-semibold shadow-none border-blue-200 dark:border-blue-800/50">
                                                    Edición Actual
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-muted-foreground pointer-events-none rounded-md px-2.5 py-0.5 text-xs font-semibold">
                                                    Inactiva / Pasada
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center py-4 pr-6">
                                            <EditionActions
                                                editionId={edition.id}
                                                eventId={eventId}
                                                editionName={edition.name?.es || edition.slug}
                                            />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-[300px] text-center">
                                    <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
                                        <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
                                            <IconDatabaseOff size={24} className="opacity-60" />
                                        </div>
                                        <p className="text-[15px] font-medium mt-2">Aún no se han configurado ediciones</p>
                                        <p className="text-sm max-w-[300px] text-center mx-auto opacity-70">
                                            Crea la primera edición del evento para configurar ponentes, inscripciones y el periodo de vigencia.
                                        </p>
                                        <Link href={`/admin/events/${eventId}/edition/create`} className="mt-2">
                                            <Button variant="outline" className="rounded-xl h-10 px-5 text-sm font-medium border-slate-200">
                                                Crear primera edición
                                            </Button>
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
