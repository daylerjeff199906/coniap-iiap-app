'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter, usePathname } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { cn } from '@/lib/utils'

interface ParticipantTabsProps {
    defaultValue: string
}

export function ParticipantTabs({ defaultValue }: ParticipantTabsProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    const activeTab = searchParams.get('tab') || defaultValue

    const handleTabChange = (value: string) => {
        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('tab', value)
            // @ts-ignore
            router.push(`${pathname}?${params.toString()}`)
        })
    }

    return (
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className={cn(
                "bg-slate-100/80 p-1 rounded-xl h-12 mb-4",
                isPending && "opacity-50 pointer-events-none"
            )}>
                <TabsTrigger
                    value="event"
                    className="rounded-lg px-6 font-semibold data-[state=active]:bg-white data-[state=active]:text-[#0064e0] data-[state=active]:shadow-sm transition-all h-10"
                >
                    Participantes del Evento
                </TabsTrigger>
                <TabsTrigger
                    value="editions"
                    className="rounded-lg px-6 font-semibold data-[state=active]:bg-white data-[state=active]:text-[#0064e0] data-[state=active]:shadow-sm transition-all h-10"
                >
                    Participantes por Edición
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
