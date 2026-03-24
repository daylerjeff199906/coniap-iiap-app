'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { IconClock, IconMapPin } from '@tabler/icons-react'
import { ActivityItem } from '../actions'

interface ActivitiesScheduleViewProps {
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

export function ActivitiesScheduleView({ activities }: ActivitiesScheduleViewProps) {
    const grouped = activities.reduce((acc, a) => {
        const date = a.session_date || 'Sin fecha'
        if (!acc[date]) acc[date] = []
        acc[date].push(a)
        return acc
    }, {} as Record<string, ActivityItem[]>)

    const dates = Object.keys(grouped).sort()
    const [selectedDate, setSelectedDate] = useState(dates[0] || 'Sin fecha')

    if (!activities || activities.length === 0) {
        return <div className="p-8 text-center text-muted-foreground bg-card border rounded-2xl mt-4">No hay actividades</div>
    }

    const dayActivities = (grouped[selectedDate] || []).sort((a, b) => 
        (a.start_time || '').localeCompare(b.start_time || '')
    )

    // Generate Hourly slots
    const hours = Array.from({ length: 15 }, (_, i) => `${String(i + 8).padStart(2, '0')}:00`)

    return (
        <div className="space-y-4 mt-4">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2">
                {dates.map((date) => (
                    <button
                        key={date}
                        type="button"
                        onClick={() => setSelectedDate(date)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap border transition-all ${
                            selectedDate === date 
                                ? 'bg-[#0064e0] text-white border-[#0064e0] shadow-sm' 
                                : 'bg-card border-slate-200 text-foreground hover:bg-muted'
                        }`}
                    >
                        {date !== 'Sin fecha' ? new Date(date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }) : 'Por Programar'}
                    </button>
                ))}
            </div>

            <div className="border rounded-2xl shadow-sm bg-card overflow-hidden">
                <div className="flex flex-col">
                    {hours.map((hour, idx) => {
                        const slotActivities = dayActivities.filter(a => {
                            const start = a.start_time || ''
                            return start >= hour && start < `${String(parseInt(hour.split(':')[0]) + 1).padStart(2, '0')}:00`
                        })

                        return (
                            <div key={hour} className={`flex border-b last:border-b-0 min-h-[80px] ${idx % 2 === 0 ? 'bg-background/50' : 'bg-card'}`}>
                                <div className="w-20 p-4 border-r flex items-start justify-center text-sm font-medium text-muted-foreground sticky left-0 bg-card z-10">
                                    {hour}
                                </div>
                                <div className="flex-1 p-2 gap-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                    {slotActivities.map(a => {
                                        const typeColor = sessionTypeColors[a.session_type || 'other'] || sessionTypeColors.other
                                        return (
                                            <Card key={a.id} className={`rounded-xl border p-3 flex flex-col justify-between h-full ${typeColor} shadow-sm border-2`}>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-1 text-[10px] font-bold">
                                                        <IconClock size={12} />
                                                        {a.start_time} - {a.end_time}
                                                    </div>
                                                    <h4 className="font-semibold text-sm line-clamp-2 leading-tight">
                                                        {a.title}
                                                    </h4>
                                                </div>
                                                {!a.is_online && a.address && (
                                                    <div className="flex items-center gap-1 text-[10px] mt-2 opacity-80">
                                                        <IconMapPin size={12} />
                                                        <span className="truncate">{a.address}</span>
                                                    </div>
                                                )}
                                            </Card>
                                        )
                                    })}
                                    {slotActivities.length === 0 && (
                                        <div className="flex items-center text-xs text-muted-foreground/40 italic p-2">Disponible</div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
