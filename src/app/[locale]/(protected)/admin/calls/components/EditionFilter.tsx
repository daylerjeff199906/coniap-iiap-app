'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter, usePathname } from '@/i18n/routing'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { useTransition } from 'react'

interface EditionFilterProps {
    editions: { id: string, name: { es: string, en: string }, year: number }[]
    locale: string
}

export function EditionFilter({ editions, locale }: EditionFilterProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    const handleEditionChange = (val: string) => {
        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString())
            if (val === 'all') {
                params.delete('editionId')
            } else {
                params.set('editionId', val)
            }
            // @ts-ignore
            router.push(`${pathname}?${params.toString()}`)
        })
    }

    return (
        <div className="w-[220px]">
            <Select
                defaultValue={searchParams.get('editionId') || 'all'}
                onValueChange={handleEditionChange}
                disabled={isPending}
            >
                <SelectTrigger className="h-10 rounded-xl bg-white border-slate-200 shadow-sm">
                    <SelectValue placeholder="Filtrar por edición" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                    <SelectItem value="all">Todas las ediciones</SelectItem>
                    {editions.map(e => (
                        <SelectItem key={e.id} value={e.id}>
                            {locale === 'es' ? e.name.es : e.name.en} ({e.year})
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
