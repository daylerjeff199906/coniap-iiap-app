'use client'

import { useState, useEffect } from 'react'
import { getProfiles } from './actions'
import { IProfile } from '@/types/profile'
import { ProfileTable } from './components/ProfileTable'
import { ProfileFilters } from './components/ProfileFilters'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'

export default function ProfilesPage() {
    const [profiles, setProfiles] = useState<IProfile[]>([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const pageSize = 30

    useEffect(() => {
        setIsLoading(true)
        getProfiles(page, pageSize, query).then(({ data, count }) => {
            setProfiles(data)
            setTotal(count)
            setIsLoading(false)
        })
    }, [page, query])

    const totalPages = Math.ceil(total / pageSize)

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h2>
                    <p className="text-muted-foreground text-sm">
                        Administra los perfiles de todos los usuarios registrados en el sistema.
                    </p>
                </div>
            </div>

            <ProfileFilters
                query={query}
                onSearch={setQuery}
            />

            <ProfileTable
                profiles={profiles}
                isLoading={isLoading}
            />

            {total > pageSize && (
                <div className="mt-6 flex justify-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                            </PaginationItem>
                            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                                let pageNum = i + 1
                                // Shift window if page > 3
                                if (totalPages > 5 && page > 3) {
                                    pageNum = page - 3 + i + 1
                                    if (pageNum > totalPages) pageNum = totalPages - (4 - i)
                                }
                                if (pageNum > totalPages || pageNum < 1) return null

                                return (
                                    <PaginationItem key={pageNum}>
                                        <PaginationLink
                                            isActive={page === pageNum}
                                            onClick={() => setPage(pageNum)}
                                            className="cursor-pointer"
                                        >
                                            {pageNum}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            })}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    )
}
