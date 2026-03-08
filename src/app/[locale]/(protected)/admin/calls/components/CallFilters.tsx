'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { IconSearch, IconPlus } from '@tabler/icons-react'
import { useRouter, usePathname, Link } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'

export function CallFilters({ eventId }: { eventId?: string }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            if (value) {
                params.set(name, value)
            } else {
                params.delete(name)
            }
            return params.toString()
        },
        [searchParams]
    )

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        startTransition(() => {
            // @ts-ignore
            router.push(`${pathname}?${createQueryString('q', searchQuery)}`)
        })
    }

    const handleStatusChange = (val: string) => {
        startTransition(() => {
            const value = val === 'all' ? '' : val
            // @ts-ignore
            router.push(`${pathname}?${createQueryString('status', value)}`)
        })
    }

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex flex-1 items-center gap-2 w-full lg:w-auto">
                <form onSubmit={handleSearch} className="relative w-full max-w-sm flex items-center">
                    <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        name="q"
                        placeholder="Buscar convocatorias..."
                        className="pl-8 h-10 rounded-xl"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="hidden" aria-hidden="true" tabIndex={-1}>Search</button>
                </form>
                <Select
                    defaultValue={searchParams.get('status') || 'all'}
                    onValueChange={handleStatusChange}
                >
                    <SelectTrigger className="w-[180px] h-10 rounded-xl">
                        <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos los estados</SelectItem>
                        <SelectItem value="active">Abiertas</SelectItem>
                        <SelectItem value="inactive">Cerradas</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Link href={eventId ? `/admin/events/${eventId}/call/create` : `/admin/calls/create`}>
                <Button className="bg-blue-600 hover:bg-blue-700 rounded-full h-10 px-6 font-medium">
                    <IconPlus className="mr-2 h-4 w-4" /> Nueva Convocatoria
                </Button>
            </Link>
        </div>
    )
}
