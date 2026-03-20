'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { IconSearch } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/core/useDebounce'

interface Edition {
    id: string
    name?: { es?: string } | null
    year: number
}

export function DetailActivitiesFilters({ editions, locale, eventId }: { editions: Edition[], locale: string, eventId: string }) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [search, setSearch] = useState(searchParams.get('q') || '')
    const [debouncedSearch] = useDebounce(search, 500)

    const selectedEdition = searchParams.get('edition') || 'all'

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        if (debouncedSearch) {
            params.set('q', debouncedSearch)
        } else {
            params.delete('q')
        }
        params.set('page', '1') // reset page
        router.push(`/admin/events/${eventId}/activities?${params.toString()}`)
    }, [debouncedSearch, router, eventId, searchParams])

    const handleEditionChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value === 'all') {
            params.delete('edition')
        } else {
            params.set('edition', value)
        }
        params.set('page', '1') // reset page
        router.push(`/admin/events/${eventId}/activities?${params.toString()}`)
    }

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:max-w-md">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar por nombre..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 h-10 rounded-xl"
                />
            </div>

            <div className="w-full sm:max-w-xs">
                <Select value={selectedEdition} onValueChange={handleEditionChange}>
                    <SelectTrigger className="h-10 rounded-xl">
                        <SelectValue placeholder="Filtrar por edición" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas las ediciones</SelectItem>
                        {editions.map((edition) => (
                            <SelectItem key={edition.id} value={edition.id}>
                                {edition.name?.es || `${edition.year}`}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
