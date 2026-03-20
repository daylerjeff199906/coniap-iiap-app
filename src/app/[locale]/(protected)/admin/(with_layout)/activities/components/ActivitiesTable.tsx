'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IconLayoutGrid, IconLayoutList, IconCalendarEvent } from '@tabler/icons-react'
import { ActivitiesAgendaView } from './ActivitiesAgendaView'
import { ActivitiesScheduleView } from './ActivitiesScheduleView'
import { useState, useTransition } from 'react'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { IconClock, IconDatabaseOff, IconEdit, IconTrash, IconVideo } from '@tabler/icons-react'
import { ActivityItem, deleteActivity } from '../actions'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { toast } from 'react-toastify'
import { Link } from '@/i18n/routing'

interface ActivitiesTableProps {
    activities: ActivityItem[]
    eventId?: string
}

const sessionTypeLabels: Record<string, string> = {
    keynote: 'Charla Magistral',
    presentation: 'Plan de Paper',
    panel: 'Panel',
    workshop: 'Taller',
    networking: 'Networking',
    break: 'Break',
    other: 'Otro'
}

export function ActivitiesTable({ activities, eventId }: ActivitiesTableProps) {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null)
    const [view, setView] = useState<'table' | 'agenda' | 'schedule'>('table')
    const [deleteText, setDeleteText] = useState('')
    const [isPending, startTransition] = useTransition()


    const handleDeleteClick = (activity: ActivityItem) => {
        setSelectedActivity(activity)
        setIsDeleteOpen(true)
        setDeleteText('')
    }

    const handleDeleteConfirm = () => {
        if (!selectedActivity || deleteText !== 'DELETE') return
        startTransition(async () => {
            const result = await deleteActivity(selectedActivity.id)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Sesión eliminada')
                setIsDeleteOpen(false)
            }
        })
    }

    return (
        <TooltipProvider delayDuration={200}>
            <div className="space-y-4">
                <div className="flex justify-end mt-2">
                    <Tabs value={view} onValueChange={(v: any) => setView(v)} className="w-auto">
                        <TabsList className="rounded-xl h-10 bg-muted/50 p-1">
                            <TabsTrigger value="table" className="rounded-lg text-xs gap-1 py-1.5"><IconLayoutList size={14}/> Tabla</TabsTrigger>
                            <TabsTrigger value="agenda" className="rounded-lg text-xs gap-1 py-1.5"><IconLayoutGrid size={14}/> Agenda</TabsTrigger>
                            <TabsTrigger value="schedule" className="rounded-lg text-xs gap-1 py-1.5"><IconCalendarEvent size={14}/> Horario</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {view === 'table' && (
                    <div className="rounded-2xl border overflow-hidden bg-card">
                <Table>
                    <TableHeader className="bg-muted/30">
                        <TableRow>
                            <TableHead className="font-semibold text-foreground">Título / Tipo</TableHead>
                            <TableHead className="font-semibold text-foreground">Fecha</TableHead>
                            <TableHead className="font-semibold text-foreground">Hora</TableHead>
                            <TableHead className="font-semibold text-foreground">Estado</TableHead>
                            <TableHead className="text-center w-24 font-semibold text-foreground">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activities && activities.length > 0 ? (
                            activities.map((activity) => {
                                return (
                                    <TableRow
                                        key={activity.id}
                                        className="cursor-pointer hover:bg-muted/30 transition-colors"
                                    >
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-11 w-11 flex-shrink-0 flex items-center justify-center bg-muted text-muted-foreground rounded-sm overflow-hidden border relative">
                                                    {activity.banner_url ? (
                                                        <img
                                                            src={activity.banner_url}
                                                            alt={activity.title || 'Session'}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <IconClock size={20} className="text-violet-500" />
                                                    )}
                                                </div>
                                                <div className="flex flex-col max-w-[300px] md:max-w-md">
                                                    <span className="font-semibold text-[15px] truncate flex items-center gap-1.5">
                                                        {activity.title}
                                                        {activity.is_online && (
                                                            <Tooltip>
                                                                <TooltipTrigger>
                                                                    <IconVideo className="h-3.5 w-3.5 text-emerald-500" />
                                                                </TooltipTrigger>
                                                                <TooltipContent className="text-xs">En Línea</TooltipContent>
                                                            </Tooltip>
                                                        )}
                                                    </span>
                                                    <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                                                        <span className="text-[12px] text-muted-foreground">
                                                            {activity.session_type ? sessionTypeLabels[activity.session_type] : 'Presentación'}
                                                        </span>
                                                        {activity.main_events && (
                                                            <>
                                                                <span className="text-muted-foreground/40">•</span>
                                                                <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4 bg-muted/60 text-muted-foreground font-normal">
                                                                    {typeof activity.main_events.name === 'string' ? activity.main_events.name : activity.main_events.name?.es}
                                                                </Badge>
                                                            </>
                                                        )}
                                                        {activity.editions && (
                                                            <>
                                                                <span className="text-muted-foreground/40">•</span>
                                                                <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 bg-blue-50/50 text-blue-600 border-blue-200/60 font-medium">
                                                                    {typeof activity.editions.name === 'string' ? activity.editions.name : activity.editions.name?.es}
                                                                </Badge>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground whitespace-nowrap text-sm">
                                            {activity.session_date ? new Date(activity.session_date).toLocaleDateString() : 'Sin fecha'}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground whitespace-nowrap text-sm">
                                            {activity.start_time && activity.end_time
                                                ? `${activity.start_time} - ${activity.end_time}`
                                                : activity.start_time || 'Sin hora'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={activity.is_active ? 'default' : 'secondary'} className="rounded-full">
                                                {activity.is_active ? 'Activo' : 'Inactivo'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                            asChild
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <Link href={eventId ? `/admin/events/${eventId}/activities/${activity.id}` : `/admin/activities/${activity.id}`}>
                                                                <IconEdit className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent><p>Editar sesión</p></TooltipContent>
                                                </Tooltip>

                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                            onClick={(e) => { e.stopPropagation(); handleDeleteClick(activity); }}
                                                        >
                                                            <IconTrash className="h-4 w-4" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent><p>Eliminar sesión</p></TooltipContent>
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center">
                                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                        <IconDatabaseOff size={32} />
                                        <p>No se encontraron sesiones.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* Delete AlertDialog */}
                <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                    <AlertDialogContent className="rounded-2xl">
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar sesión?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará permanentemente la sesión <strong>{selectedActivity?.title}</strong>.
                                <br /><br />
                                Escribe <strong>DELETE</strong> para confirmar.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="my-2">
                            <Input
                                placeholder="DELETE"
                                value={deleteText}
                                onChange={(e) => setDeleteText(e.target.value)}
                                disabled={isPending}
                                className="rounded-xl h-11"
                            />
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isPending} className="rounded-xl">Cancelar</AlertDialogCancel>
                            <Button
                                variant="destructive"
                                onClick={handleDeleteConfirm}
                                disabled={deleteText !== 'DELETE' || isPending}
                                className="rounded-xl"
                            >
                                {isPending ? 'Eliminando...' : 'Eliminar'}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </TooltipProvider>
    )
}
