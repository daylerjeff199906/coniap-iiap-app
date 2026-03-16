'use client'

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { useRouter, usePathname } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

interface CallTypeFilterProps {
    defaultValue?: string
}

export function CallTypeFilter({ defaultValue = 'all' }: CallTypeFilterProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    const activeTab = searchParams.get('tab') || defaultValue

    const handleTypeChange = (value: string) => {
        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('tab', value)
            if (value === 'event') {
                params.delete('editionId') // Limpiar edición si es solo evento
            }
            // @ts-ignore
            router.push(`${pathname}?${params.toString()}`)
        })
    }

    return (
        <div className="w-[200px]">
            <Select
                value={activeTab}
                onValueChange={handleTypeChange}
                disabled={isPending}
            >
                <SelectTrigger className="h-10 rounded-xl bg-white border-slate-200 shadow-sm">
                    <SelectValue placeholder="Tipo de convocatoria" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="event">Solo del Evento</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
