'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { IconSearch } from '@tabler/icons-react'
import { useRouter, usePathname } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import { IParticipantRole } from '@/types/participant'
import { useDebounce } from '@/hooks/core/useDebounce'
import { useEffect } from 'react'
import { IconUserPlus, IconFilter } from '@tabler/icons-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface ParticipantFiltersProps {
    roles: IParticipantRole[]
    events: { id: string; name: string }[]
    editions?: { id: string; name: { es: string; en: string }; year: number }[]
}

export function ParticipantFilters({ roles, events, editions = [] }: ParticipantFiltersProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const locale = useLocale()
    const [isPending, startTransition] = useTransition()

    // Extract eventId from pathname if we are in /admin/events/[id]/participants
    const eventIdFromPath = pathname.split('/events/')[1]?.split('/')[0]

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
            params.set('page', '1')
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
            // @ts-ignore
            router.push(`${pathname}?${createQueryString('q', searchQuery)}`)
        })
    }

    const handleRoleChange = (val: string) => {
        startTransition(() => {
            const value = val === 'all' ? '' : val
            // @ts-ignore
            router.push(`${pathname}?${createQueryString('role', value)}`)
        })
    }

    const handleScopeChange = (val: string) => {
        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('scope', val)

            if (val === 'edition' && editions.length > 0 && !params.get('editionId')) {
                params.set('editionId', editions[0].id)
            } else if (val !== 'edition') {
                params.delete('editionId')
            }

            params.set('page', '1')
            // @ts-ignore
            router.push(`${pathname}?${params.toString()}`)
        })
    }

    const handleEditionChange = (val: string) => {
        startTransition(() => {
            // @ts-ignore
            router.push(`${pathname}?${createQueryString('editionId', val)}`)
        })
    }

    const createUrl = eventIdFromPath
        ? `/admin/participants/create?eventId=${eventIdFromPath}`
        : '/admin/participants/create'

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
            <div className="flex flex-1 items-center gap-2 w-full lg:w-auto">
                <form onSubmit={handleSearch} className="relative w-full max-w-sm flex items-center">
                    <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        name="q"
                        placeholder="Buscar participantes..."
                        className="pl-8 h-10 rounded-xl"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="hidden" aria-hidden="true" tabIndex={-1}>Search</button>
                </form>
                <Select
                    defaultValue={searchParams.get('role') || 'all'}
                    onValueChange={handleRoleChange}
                >
                    <SelectTrigger className="w-[180px] h-10 rounded-xl">
                        <SelectValue placeholder="Rol" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos los roles</SelectItem>
                        {roles.map((role) => (
                            <SelectItem key={role.id} value={role.slug}>
                                {locale === 'es' ? role.name.es : role.name.en}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {eventIdFromPath && (
                    <div className="flex items-center gap-1.5 p-1 bg-slate-100/50 rounded-2xl border border-slate-200/60">
                        <div className="flex items-center gap-2 px-3">
                            <IconFilter size={14} className="text-slate-400" />
                            <Select
                                defaultValue={searchParams.get('scope') || 'all'}
                                onValueChange={handleScopeChange}
                            >
                                <SelectTrigger className="w-[130px] h-8 rounded-xl bg-transparent border-none shadow-none focus:ring-0 text-[13px] font-semibold">
                                    <SelectValue placeholder="Ámbito" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="all">Ver Todo</SelectItem>
                                    <SelectItem value="global">Evento Global</SelectItem>
                                    <SelectItem value="edition">Por Edición</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {searchParams.get('scope') === 'edition' && editions.length > 0 && (
                            <>
                                <div className="w-px h-6 bg-slate-200 mx-1" />
                                <div className="flex items-center gap-2 px-3">
                                    <Select
                                        defaultValue={searchParams.get('editionId') || editions[0].id}
                                        onValueChange={handleEditionChange}
                                    >
                                        <SelectTrigger className="w-[160px] h-8 rounded-xl bg-primary/5 border-none shadow-none focus:ring-0 text-[13px] font-bold text-primary">
                                            <SelectValue placeholder="Edición" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            {editions.map((e) => (
                                                <SelectItem key={e.id} value={e.id} className="rounded-lg">
                                                    {locale === 'es' ? e.name.es : e.name.en} ({e.year})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>


            <Button className="rounded-xl h-10 bg-[#0064e0] hover:bg-[#0057c2] text-white flex items-center gap-2 px-4 shadow-sm transition-all active:scale-95" asChild>
                <Link href={createUrl}>
                    <IconUserPlus size={18} />
                    <span className="hidden sm:inline">Añadir Participante</span>
                </Link>
            </Button>
        </div>
    )
}
