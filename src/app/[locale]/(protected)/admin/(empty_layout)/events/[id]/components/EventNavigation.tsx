'use client'

import { Link, usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { IconSettings, IconUsers, IconCalendarEvent, IconSpeakerphone, IconChevronRight } from '@tabler/icons-react'

export function EventNavigation({ locale, eventId }: { locale: string, eventId: string }) {
    const pathname = usePathname()

    const navItems = [
        {
            name: 'Detalles Generales',
            description: 'Gestiona tu información personal o básica del evento.',
            href: `/admin/events/${eventId}`,
            icon: IconSettings
        },
        {
            name: 'Ediciones',
            description: 'Fechas, versiones históricas y locación principal.',
            href: `/admin/events/${eventId}/edition`,
            icon: IconCalendarEvent
        },
        {
            name: 'Convocatorias',
            description: 'Fechas clave de envíos, revisiones y bases del evento.',
            href: `/admin/events/${eventId}/call`,
            icon: IconSpeakerphone
        },
        {
            name: 'Participantes',
            description: 'Asistencia, ponentes, evaluadores y credenciales.',
            href: `/admin/events/${eventId}/participants`,
            icon: IconUsers
        },
    ]

    return (
        <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="flex flex-col gap-4 w-full px-2">
                <span className="text-[12px] font-bold tracking-[0.15em] text-slate-400 dark:text-slate-500 uppercase ml-2">
                    General
                </span>

                <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-3 pb-4 lg:pb-0 hide-scrollbar -mx-2 px-2 lg:mx-0 lg:px-0">
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
                                    "group flex items-center justify-between p-3 lg:p-4 rounded-[1.75rem] transition-all border border-transparent min-w-[280px] lg:min-w-0 flex-shrink-0 select-none",
                                    isActive
                                        ? "bg-[#0b1527] dark:bg-slate-900 shadow-md"
                                        : "bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "w-[3.25rem] h-[3.25rem] flex items-center justify-center rounded-full flex-shrink-0 transition-colors",
                                        isActive
                                            ? "bg-white/10 text-white"
                                            : "bg-slate-50 dark:bg-slate-800 text-slate-500 group-hover:bg-white dark:group-hover:bg-slate-700 shadow-sm border border-slate-100 dark:border-slate-700/50"
                                    )}>
                                        <Icon className="w-[1.4rem] h-[1.4rem] stroke-[1.8]" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <span className={cn(
                                            "text-[15px] font-bold mb-0.5",
                                            isActive ? "text-white" : "text-slate-700 dark:text-slate-200"
                                        )}>
                                            {item.name}
                                        </span>
                                        <span className={cn(
                                            "text-[13px] leading-tight font-medium",
                                            isActive ? "text-blue-200/80" : "text-slate-400 dark:text-slate-500"
                                        )}>
                                            {item.description}
                                        </span>
                                    </div>
                                </div>
                                {isActive && (
                                    <IconChevronRight className="w-5 h-5 text-white ml-2 flex-shrink-0" />
                                )}
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
