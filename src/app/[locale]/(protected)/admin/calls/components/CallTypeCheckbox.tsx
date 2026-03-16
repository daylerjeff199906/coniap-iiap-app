'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useRouter, usePathname } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

export function CallTypeCheckbox() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    const activeTab = searchParams.get('tab') || 'all'

    const handleCheckedChange = (checked: boolean) => {
        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString())
            if (checked) {
                params.set('tab', 'event')
                params.delete('editionId') // Opcional: limpiar si solo es del evento
            } else {
                params.set('tab', 'all')
            }
            // @ts-ignore
            router.push(`${pathname}?${params.toString()}`)
        })
    }

    return (
        <div className="flex items-center space-x-2 bg-white border h-10 px-3.5 rounded-xl shadow-sm">
            <Checkbox 
                id="event_only" 
                checked={activeTab === 'event'} 
                onCheckedChange={(checked) => handleCheckedChange(!!checked)}
                disabled={isPending}
            />
            <Label htmlFor="event_only" className="text-xs font-semibold text-slate-700 cursor-pointer">
                Solo del Evento general
            </Label>
        </div>
    )
}
