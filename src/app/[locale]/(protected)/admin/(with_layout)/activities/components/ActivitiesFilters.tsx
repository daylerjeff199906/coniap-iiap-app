'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { IconSearch, IconPlus } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/core/useDebounce'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'

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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card rounded-xl mb-2">
            <div className="relative w-full sm:max-w-md">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar actividades..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 h-10 rounded-xl"
                />
            </div>

            <Button asChild className="shrink-0 bg-[#0064e0] hover:bg-[#0057c2] text-white font-medium rounded-xl h-10 shadow-sm">
                <Link href="/admin/activities/create" className="flex items-center gap-2">
                    <IconPlus className="h-4 w-4" /> Nueva Actividad
                </Link>
            </Button>
        </div>
    )
}
