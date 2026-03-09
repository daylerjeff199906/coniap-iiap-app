'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { IconSearch } from '@tabler/icons-react'
import { useDebounce } from '@/hooks/core/useDebounce'

interface ProfileFiltersProps {
    query: string
    onSearch: (query: string) => void
}

export function ProfileFilters({ query, onSearch }: ProfileFiltersProps) {
    const [searchQuery, setSearchQuery] = useState(query)
    const debouncedSearch = useDebounce(searchQuery, 500)

    useEffect(() => {
        onSearch(debouncedSearch)
    }, [debouncedSearch, onSearch])

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-2">
            <div className="relative w-full max-w-sm flex items-center">
                <BugRepairNote text="Buscador minimalista para perfiles" />
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar por nombre, email o institución..."
                    className="pl-9 h-11 rounded-xl bg-muted/50 border-none shadow-none focus-visible:ring-1 focus-visible:ring-primary/20 transition-all font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
    )
}

function BugRepairNote({ text }: { text: string }) {
    return <span className="sr-only">{text}</span>
}
