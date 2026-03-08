'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { IconSearch } from '@tabler/icons-react'
import { useRouter, usePathname } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import { IParticipantRole } from '@/types/participant'

interface ParticipantFiltersProps {
    roles: IParticipantRole[]
}

export function ParticipantFilters({ roles }: ParticipantFiltersProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const locale = useLocale()
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
            params.set('page', '1')
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

    const handleRoleChange = (val: string) => {
        startTransition(() => {
            const value = val === 'all' ? '' : val
            // @ts-ignore
            router.push(`${pathname}?${createQueryString('role', value)}`)
        })
    }

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
            </div>
        </div>
    )
}
