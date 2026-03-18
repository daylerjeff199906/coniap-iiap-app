'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { IconSearch } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/core/useDebounce'

export function ActivitiesFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()
    
    const [search, setSearch] = useState(searchParams.get('q') || '')
    const [debouncedSearch] = useDebounce(search, 500)

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        if (debouncedSearch) {
            params.set('q', debouncedSearch)
        } else {
            params.delete('q')
        }
        params.set('page', '1') // reset page
        router.push(`/admin/activities?${params.toString()}`)
    }, [debouncedSearch, router, searchParams])

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-card rounded-xl border p-4 shadow-sm mb-2">
            <div className="relative w-full sm:max-w-md">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar actividades..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 h-10 rounded-xl"
                />
            </div>
        </div>
    )
}
