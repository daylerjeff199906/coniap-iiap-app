'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { IconSettings, IconUsers, IconCalendarEvent, IconSpeakerphone } from '@tabler/icons-react'

export function EventNavigation({ locale, eventId }: { locale: string, eventId: string }) {
    const pathname = usePathname()

    const navItems = [
        { name: 'General', href: `/${locale}/admin/events/${eventId}`, icon: IconSettings },
        { name: 'Convocatorias', href: `/${locale}/admin/events/${eventId}/call`, icon: IconSpeakerphone },
        { name: 'Ediciones', href: `/${locale}/admin/events/${eventId}/edition`, icon: IconCalendarEvent },
        { name: 'Participantes', href: `/${locale}/admin/events/${eventId}/participants`, icon: IconUsers },
    ]

    return (
        <div className="flex flex-row overflow-x-auto gap-2 border-b border-muted pb-4 mb-6">
            {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                const Icon = item.icon
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                            isActive
                                ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                        )}
                    >
                        <Icon className="w-4 h-4" />
                        {item.name}
                    </Link>
                )
            })}
        </div>
    )
}
