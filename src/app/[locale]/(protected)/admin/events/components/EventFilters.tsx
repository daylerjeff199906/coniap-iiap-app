'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { IconSearch, IconPlus } from '@tabler/icons-react'
import Link from 'next/link'
import { useLocale } from 'next-intl'

export function EventFilters() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const locale = useLocale()
    const [isPending, startTransition] = useTransition()

    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            params.set('page', '1') // Reset page on filter change
            return params.toString()
        },
        [searchParams]
    )

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        startTransition(() => {
            router.push(`${pathname}?${createQueryString('q', searchQuery)}`)
        })
    }

    const handleStatusChange = (val: string) => {
        startTransition(() => {
            router.push(`${pathname}?${createQueryString('status', val)}`)
        })
    }

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 items-center gap-2">
                <form onSubmit={handleSearch} className="relative w-full max-w-sm">
                    <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        name="q"
                        placeholder="Buscar eventos..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>
                <Select
                    defaultValue={searchParams.get('status') || 'active'}
                    onValueChange={handleStatusChange}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Activos</SelectItem>
                        <SelectItem value="inactive">Inactivos</SelectItem>
                        <SelectItem value="all">Todos</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button asChild className="shrink-0 bg-blue-600 hover:bg-blue-700 rounded-full">
                <Link href={`/${locale}/admin/events/create`}>
                    <IconPlus className="mr-2 h-4 w-4" /> Nuevo Evento
                </Link>
            </Button>
        </div>
    )
}
