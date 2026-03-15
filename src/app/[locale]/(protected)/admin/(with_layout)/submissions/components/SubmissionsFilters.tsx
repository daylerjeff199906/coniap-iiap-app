'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useState, useTransition, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { IconSearch } from '@tabler/icons-react';
import { useRouter, usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useDebounce } from '@/hooks/core/useDebounce';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';
import Link from 'next/link';

interface SubmissionsFiltersProps {
    events: { id: string; name: string }[];
    editions: { id: string; name: any; year: number }[];
}

export function SubmissionsFilters({ events, editions }: SubmissionsFiltersProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const locale = useLocale();
    const [isPending, startTransition] = useTransition();

    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const debouncedSearch = useDebounce(searchQuery, 500);

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }
            params.set('page', '1');
            return params.toString();
        },
        [searchParams]
    );

    useEffect(() => {
        const currentQ = searchParams.get('q') || '';
        if (debouncedSearch !== currentQ) {
            startTransition(() => {
                // @ts-ignore
                router.push(`${pathname}?${createQueryString('q', debouncedSearch)}`);
            });
        }
    }, [debouncedSearch, pathname, router, createQueryString, searchParams]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            // @ts-ignore
            router.push(`${pathname}?${createQueryString('q', searchQuery)}`);
        });
    };

    const handleEventChange = (val: string) => {
        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (val === 'all') {
                params.delete('eventId');
            } else {
                params.set('eventId', val);
            }
            params.delete('editionId'); // Reset edition when event changes
            params.set('page', '1');
            // @ts-ignore
            router.push(`${pathname}?${params.toString()}`);
        });
    };

    const handleEditionChange = (val: string) => {
        startTransition(() => {
            const value = val === 'all' ? '' : val
            // @ts-ignore
            router.push(`${pathname}?${createQueryString('editionId', value)}`);
        });
    };

    const handleStatusChange = (val: string) => {
        startTransition(() => {
            const value = val === 'all' ? '' : val
            // @ts-ignore
            router.push(`${pathname}?${createQueryString('status', value)}`);
        });
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
            <div className="flex flex-1 flex-wrap items-center gap-2 w-full lg:w-auto">
                <form onSubmit={handleSearch} className="relative w-full max-w-sm flex items-center">
                    <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        name="q"
                        placeholder="Buscar por título o autor..."
                        className="pl-8 h-10 rounded-xl text-xs"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>

                <Select
                    defaultValue={searchParams.get('status') || 'all'}
                    onValueChange={handleStatusChange}
                >
                    <SelectTrigger className="w-[160px] h-10 rounded-xl text-xs">
                        <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="all" className="text-xs">Todos</SelectItem>
                        <SelectItem value="submitted" className="text-xs">Presentado</SelectItem>
                        <SelectItem value="under_review" className="text-xs">En Revisión</SelectItem>
                        <SelectItem value="approved" className="text-xs">Aprobado</SelectItem>
                        <SelectItem value="rejected" className="text-xs">Rechazado</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    defaultValue={searchParams.get('eventId') || 'all'}
                    onValueChange={handleEventChange}
                >
                    <SelectTrigger className="w-[180px] h-10 rounded-xl text-xs">
                        <SelectValue placeholder="Evento" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="all" className="text-xs">Todos los eventos</SelectItem>
                        {events.map((event) => (
                            <SelectItem key={event.id} value={event.id} className="text-xs">
                                {event.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {editions.length > 0 && (
                    <Select
                        defaultValue={searchParams.get('editionId') || 'all'}
                        onValueChange={handleEditionChange}
                    >
                        <SelectTrigger className="w-[180px] h-10 rounded-xl text-xs">
                            <SelectValue placeholder="Edición" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="all" className="text-xs">Todas las ediciones</SelectItem>
                            {editions.map((edition) => (
                                <SelectItem key={edition.id} value={edition.id} className="text-xs">
                                    {(edition.name as any)?.[locale] || (edition.name as any)?.es} ({edition.year})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>

            <Button size="sm" className="text-xs h-10 rounded-xl bg-primary flex items-center gap-1.5" asChild>
                <Link href="/admin/submissions/upload">
                    <UploadCloud className="h-4 w-4" /> 
                    <span className="font-bold">Subida Directa</span>
                </Link>
            </Button>
        </div>
    );
}
