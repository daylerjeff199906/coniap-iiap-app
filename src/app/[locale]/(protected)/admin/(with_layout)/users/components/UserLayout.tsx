'use client'

import React from 'react'
import { Link, usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import {
    IconUser,
    IconShieldLock,
    IconFileText,
} from '@tabler/icons-react'

interface UserLayoutProps {
    userId: string
    userName: string
    children: React.ReactNode
}

export function UserLayout({ userId, userName, children }: UserLayoutProps) {
    const pathname = usePathname()

    const navItems = [
        {
            label: 'Detalles Generales',
            href: `/admin/users/${userId}`,
            icon: IconUser,
            active: pathname === `/admin/users/${userId}`
        },
        {
            label: 'Participaciones',
            href: `/admin/users/${userId}/participations`,
            icon: IconFileText,
            active: pathname.includes('/participations')
        },
        {
            label: 'Roles y Permisos',
            href: `/admin/users/${userId}/roles`,
            icon: IconShieldLock,
            active: pathname.includes('/roles')
        }
    ]


    return (
        <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className="w-full lg:w-64 shrink-0 h-fit sticky top-24">
                    <div className="flex flex-col gap-1">
                        <div className="px-3 mb-4 flex items-center gap-2">
                            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">MENU</span>
                        </div>

                        <nav className="space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                                        item.active
                                            ? "bg-gray-50 text-gray-900 border border-gray-100"
                                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50/50"
                                    )}
                                >
                                    <item.icon
                                        size={18}
                                        className={cn(
                                            "transition-colors",
                                            item.active ? "text-gray-700" : "text-slate-400"
                                        )}
                                    />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 min-w-0 w-full">
                    {children}
                </main>
            </div>
        </div>
    )
}
