'use client'

import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { IconClock, IconDatabaseOff } from '@tabler/icons-react'
import { ActivityItem } from '../actions'

interface ActivitiesTableProps {
    activities: ActivityItem[]
}

export function ActivitiesTable({ activities }: ActivitiesTableProps) {
    return (
        <div className="rounded-md border overflow-hidden mt-2">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Hora</TableHead>
                        <TableHead>Estado</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {activities && activities.length > 0 ? (
                        activities.map((activity) => {
                            return (
                                <TableRow
                                    key={activity.id}
                                    className="cursor-pointer hover:bg-muted transition-colors"
                                >
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center bg-violet-50 text-violet-500 rounded-lg overflow-hidden border">
                                                <IconClock size={20} />
                                            </div>
                                            <div className="flex flex-col max-w-[300px] md:max-w-md">
                                                <span className="font-semibold text-[15px] truncate">{activity.name}</span>
                                                {activity.shortDescription && (
                                                    <span className="text-xs text-muted-foreground truncate" title={activity.shortDescription}>
                                                        {activity.shortDescription}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground whitespace-nowrap text-sm">
                                        {activity.date ? new Date(activity.date).toLocaleDateString() : 'Sin fecha'}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground whitespace-nowrap text-sm">
                                        {activity.timeStart && activity.timeEnd 
                                            ? `${activity.timeStart} - ${activity.timeEnd}` 
                                            : activity.timeStart || 'Sin hora'}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={activity.isActived ? 'default' : 'secondary'}>
                                            {activity.isActived ? 'Activo' : 'Inactivo'}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="h-32 text-center">
                                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                    <IconDatabaseOff size={32} />
                                    <p>No se encontraron actividades.</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
