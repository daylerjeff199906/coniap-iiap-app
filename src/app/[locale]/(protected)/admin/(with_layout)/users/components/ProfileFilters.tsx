'use client'

import { useState, useEffect, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { IconSearch } from '@tabler/icons-react'
import { useDebounce } from '@/hooks/core/useDebounce'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

interface ProfileFiltersProps {
    query: string
}

export function ProfileFilters({ query }: ProfileFiltersProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    const [searchQuery, setSearchQuery] = useState(query)
    const debouncedSearch = useDebounce(searchQuery, 500)

    useEffect(() => {
        setSearchQuery(query)
    }, [query])

    useEffect(() => {
        const currentQ = searchParams.get('q') || ''
        if (debouncedSearch === currentQ) return

        const params = new URLSearchParams(searchParams.toString())
        if (debouncedSearch) {
            params.set('q', debouncedSearch)
        } else {
            params.delete('q')
        }
        params.set('page', '1')

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`)
        })
    }, [debouncedSearch, pathname, router, searchParams])

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-2">
            <div className="relative w-full max-w-sm flex items-center">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar por nombre, email o institución..."
                    className="pl-9 h-11 rounded-xl bg-muted/50 border-none shadow-none focus-visible:ring-1 focus-visible:ring-primary/20 transition-all font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {isPending && <span className="text-xs text-muted-foreground animate-pulse">Buscando...</span>}
        </div>
    )
}

function BugRepairNote({ text }: { text: string }) {
    return <span className="sr-only">{text}</span>
}
