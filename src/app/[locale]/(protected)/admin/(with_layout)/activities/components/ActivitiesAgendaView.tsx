'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { IconClock, IconMapPin, IconVideo } from '@tabler/icons-react'
import { ActivityItem } from '../actions'

interface ActivitiesAgendaViewProps {
    activities: ActivityItem[]
}

const sessionTypeColors: Record<string, string> = {
    keynote: 'bg-pink-50 border-pink-200 text-pink-700',
    presentation: 'bg-blue-50 border-blue-200 text-blue-700',
    panel: 'bg-purple-50 border-purple-200 text-purple-700',
    workshop: 'bg-amber-50 border-amber-200 text-amber-700',
    networking: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    break: 'bg-slate-50 border-slate-200 text-slate-700',
    other: 'bg-neutral-50 border-neutral-200 text-neutral-700'
}

const sessionTypeLabels: Record<string, string> = {
    keynote: 'Charla Magistral',
    presentation: 'Ponencia',
    panel: 'Panel',
    workshop: 'Taller',
    networking: 'Networking',
    break: 'Break / Receso',
    other: 'Otro'
}

export function ActivitiesAgendaView({ activities }: ActivitiesAgendaViewProps) {
    if (!activities || activities.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground mt-2 bg-card rounded-2xl border">
                <span>No hay actividades programadas</span>
            </div>
        )
    }

    // Group by date
    const grouped = activities.reduce((acc, activity) => {
        const date = activity.session_date || 'Sin fecha'
        if (!acc[date]) acc[date] = []
        acc[date].push(activity)
        return acc
    }, {} as Record<string, ActivityItem[]>)

    // Sort dates
    const sortedDates = Object.keys(grouped).sort()

    return (
        <div className="space-y-6 mt-4">
            {sortedDates.map((dateStr) => {
                const dayActivities = grouped[dateStr].sort((a, b) => 
                    (a.start_time || '').localeCompare(b.start_time || '')
                )
                
                return (
                    <div key={dateStr} className="space-y-4">
                        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm py-2">
                            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-blue-600" />
                                {dateStr !== 'Sin fecha' ? new Date(dateStr).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }) : 'Por Programar'}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {dayActivities.map((activity) => {
                                const typeColor = sessionTypeColors[activity.session_type || 'other'] || sessionTypeColors.other;
                                
                                return (
                                    <Card key={activity.id} className="rounded-xl border shadow-sm hover:shadow-md transition-all overflow-hidden bg-card">
                                        <CardContent className="p-4 flex gap-4">
                                            {activity.banner_url && (
                                                <div className="h-24 w-24 rounded-lg overflow-hidden flex-shrink-0 border">
                                                    <img src={activity.banner_url} alt={activity.title || ''} className="h-full w-full object-cover" />
                                                </div>
                                            )}
                                            <div className="flex-1 flex flex-col justify-between min-w-0">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-1.5 flex-wrap">
                                                        <Badge variant="outline" className={`text-[10px] font-medium border ${typeColor}`}>
                                                            {activity.session_type ? sessionTypeLabels[activity.session_type] : 'Presentación'}
                                                        </Badge>
                                                        {activity.is_online && (
                                                            <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] flex items-center gap-1">
                                                                <IconVideo size={10} /> En Línea
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <h4 className="font-semibold text-base text-foreground leading-snug line-clamp-1">
                                                        {activity.title}
                                                    </h4>
                                                </div>

                                                <div className="space-y-1 mt-2 text-xs text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <IconClock size={14} />
                                                        <span>
                                                            {activity.start_time && activity.end_time 
                                                                ? `${activity.start_time} - ${activity.end_time}` 
                                                                : activity.start_time || 'Sin hora'}
                                                        </span>
                                                    </div>
                                                    {!activity.is_online && activity.address && (
                                                        <div className="flex items-center gap-1">
                                                            <IconMapPin size={14} />
                                                            <span className="truncate">{activity.address}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
