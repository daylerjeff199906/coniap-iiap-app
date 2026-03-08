'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { IconSearch, IconPlus } from '@tabler/icons-react'
import { Link, useRouter, usePathname } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import { useDebounce } from '@/hooks/core/useDebounce'
import { useEffect } from 'react'

export function EventFilters() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const locale = useLocale()
    const [isPending, startTransition] = useTransition()

    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
    const debouncedSearch = useDebounce(searchQuery, 500)

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            if (value) {
                params.set(name, value)
            } else {
                params.delete(name)
            }
            params.set('page', '1') // Reset page on filter change
            return params.toString()
        },
        [searchParams]
    )

    useEffect(() => {
        const currentQ = searchParams.get('q') || ''
        if (debouncedSearch !== currentQ) {
            startTransition(() => {
                // @ts-ignore
                router.push(`${pathname}?${createQueryString('q', debouncedSearch)}`)
            })
        }
    }, [debouncedSearch, pathname, router, createQueryString, searchParams])

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        startTransition(() => {
            // @ts-ignore - pathname es valid en base al config de next-intl
            router.push(`${pathname}?${createQueryString('q', searchQuery)}`)
        })
    }

    const handleStatusChange = (val: string) => {
        startTransition(() => {
            // @ts-ignore
            router.push(`${pathname}?${createQueryString('status', val)}`)
        })
    }

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 items-center gap-2">
                <form onSubmit={handleSearch} className="relative w-full max-w-sm flex items-center">
                    <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        name="q"
                        placeholder="Buscar eventos..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="hidden" aria-hidden="true" tabIndex={-1}>Search</button>
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
                <Link href="/admin/events/create">
                    <IconPlus className="mr-2 h-4 w-4" /> Nuevo Evento
                </Link>
            </Button>
        </div>
    )
}
