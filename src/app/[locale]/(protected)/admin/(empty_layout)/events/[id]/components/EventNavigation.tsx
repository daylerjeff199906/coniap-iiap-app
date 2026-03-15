'use client'

import { Link, usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { IconSettings, IconUsers, IconCalendarEvent, IconSpeakerphone } from '@tabler/icons-react'

export function EventNavigation({ locale, eventId }: { locale: string, eventId: string }) {
    const pathname = usePathname()

    const navItems = [
        {
            name: 'Información General',
            href: `/admin/events/${eventId}`,
            icon: IconSettings
        },
        {
            name: 'Ediciones y Años',
            href: `/admin/events/${eventId}/edition`,
            icon: IconCalendarEvent
        },
        {
            name: 'Convocatorias',
            href: `/admin/events/${eventId}/call`,
            icon: IconSpeakerphone
        },
        {
            name: 'Participantes',
            href: `/admin/events/${eventId}/participants`,
            icon: IconUsers
        },
        {
            name: 'Resúmenes',
            href: `/admin/events/${eventId}/submissions`,
            icon: IconSpeakerphone // usaré IconSpeakerphone por compatibilidad o puedes cambiarlo después
        },
        {
            name: 'Sponsors',
            href: `/admin/events/${eventId}/sponsors`,
            icon: IconSpeakerphone
        },
    ]

    return (
        <aside className="w-full lg:w-[17.5rem] flex-shrink-0">
            <div className="flex flex-col gap-2 w-full px-2">
                <span className="text-[13px] font-bold text-slate-500/80 dark:text-slate-400 uppercase ml-4 mb-2 tracking-wide">
                    Menú del Evento
                </span>

                <div className="flex flex-col gap-1">
                    {navItems.map((item) => {
                        const isActive = item.href === `/admin/events/${eventId}`
                            ? pathname === item.href
                            : pathname.startsWith(item.href)
                        const Icon = item.icon
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "group flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 select-none",
                                    isActive
                                        ? "bg-[#1c2e3d] dark:bg-slate-900 text-white shadow-sm"
                                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800"
                                )}
                            >
                                <Icon className={cn(
                                    "w-[1.2rem] h-[1.2rem] flex-shrink-0 transition-colors stroke-[2]",
                                    isActive ? "text-white" : "text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-100"
                                )} />
                                <span className={cn(
                                    "text-[15px] font-bold tracking-tight",
                                    isActive ? "text-white" : "text-slate-700 dark:text-slate-200"
                                )}>
                                    {item.name}
                                </span>
                            </Link>
                        )
                    })}
                </div>
            </div>
            {/* Inline style for hiding scrollbar if class isn't configured globally */}
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </aside>
    )
}
