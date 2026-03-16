'use client'

import { Link } from '@/i18n/routing'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { IconUsers, IconFileDescription } from '@tabler/icons-react'

interface CallDetailsNavigationProps {
    eventId: string
    callId: string
    participantsCount: number
    submissionsCount: number
}

export function CallDetailsNavigation({
    eventId,
    callId,
    participantsCount,
    submissionsCount
}: CallDetailsNavigationProps) {
    const pathname = usePathname()

    const isActive = (path: string) => {
        return pathname.endsWith(path)
    }

    return (
        <div className="flex border-b border-slate-100 gap-6 mt-4">
            <Link 
                href={`/admin/events/${eventId}/call/${callId}/participants`} 
                className={cn(
                    "flex items-center gap-2 pb-3 text-sm font-semibold transition-all relative px-1",
                    isActive('/participants') 
                        ? "text-blue-600 font-bold" 
                        : "text-slate-500 hover:text-blue-600 hover:opacity-80"
                )}
            >
                <IconUsers size={18} />
                Participantes
                <span className={cn(
                    "text-[11px] px-1.5 py-0.5 rounded-full",
                    isActive('/participants') ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-500"
                )}>
                    {participantsCount}
                </span>
                {isActive('/participants') && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
            </Link>

            <Link 
                href={`/admin/events/${eventId}/call/${callId}/submissions`} 
                className={cn(
                    "flex items-center gap-2 pb-3 text-sm font-semibold transition-all relative px-1",
                    isActive('/submissions') 
                        ? "text-blue-600 font-bold" 
                        : "text-slate-500 hover:text-blue-600 hover:opacity-80"
                )}
            >
                <IconFileDescription size={18} />
                Resúmenes / Archivos
                <span className={cn(
                    "text-[11px] px-1.5 py-0.5 rounded-full",
                    isActive('/submissions') ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-500"
                )}>
                    {submissionsCount}
                </span>
                {isActive('/submissions') && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
            </Link>
        </div>
    )
}
