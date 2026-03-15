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

import { X } from 'lucide-react';

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

    const eventId = searchParams.get('eventId') || '';
    const editionId = searchParams.get('editionId') || '';
    const status = searchParams.get('status') || '';
    const q = searchParams.get('q') || '';

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

    const removeFilter = (name: string) => {
        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete(name);
            if (name === 'eventId') params.delete('editionId');
            params.set('page', '1');
            // @ts-ignore
            router.push(`${pathname}?${params.toString()}`);
        });
    };

    const clearAllFilters = () => {
        startTransition(() => {
            // @ts-ignore
            router.push(pathname);
        });
    };

    // Construir lista de filtros activos para los Chips
    const activeFilters = [];
    if (q) activeFilters.push({ type: 'q', label: `Texto: ${q}` });
    
    if (status) {
        const statusConfig: any = {
            submitted: 'Presentado',
            under_review: 'En Revisión',
            approved: 'Aprobado',
            rejected: 'Rechazado'
        };
        activeFilters.push({ type: 'status', label: `Estado: ${statusConfig[status] || status}` });
    }

    if (eventId && eventId !== 'all') {
        const ev = events.find(e => e.id === eventId);
        if (ev) activeFilters.push({ type: 'eventId', label: `Evento: ${ev.name}` });
    }

    if (editionId && editionId !== 'all') {
        const ed = editions.find(e => e.id === editionId);
        if (ed) activeFilters.push({ type: 'editionId', label: `Edición: ${(ed.name as any)?.[locale] || (ed.name as any)?.es}` });
    }

    return (
        <div className="flex flex-col gap-3 mb-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
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
                        value={status || 'all'}
                        onValueChange={handleStatusChange}
                    >
                        <SelectTrigger className="w-[160px] h-10 rounded-xl text-xs">
                            <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="all" className="text-xs">Todos los Estados</SelectItem>
                            <SelectItem value="submitted" className="text-xs">Presentado</SelectItem>
                            <SelectItem value="under_review" className="text-xs">En Revisión</SelectItem>
                            <SelectItem value="approved" className="text-xs">Aprobado</SelectItem>
                            <SelectItem value="rejected" className="text-xs">Rechazado</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select
                        value={eventId || 'all'}
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

                    {eventId && editions.length > 0 && (
                        <Select
                            value={editionId || 'all'}
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

            {/* CHIPS DE FILTROS ACTIVOS */}
            {activeFilters.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500 mr-1">Filtros Activos:</span>
                    {activeFilters.map(filter => (
                        <div key={filter.type} className="flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-semibold border border-slate-200/60 shadow-sm">
                            <span>{filter.label}</span>
                            <button onClick={() => removeFilter(filter.type)} className="hover:bg-slate-200 rounded-full p-0.5 text-slate-500 hover:text-slate-800 transition-colors">
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                    <button onClick={clearAllFilters} className="text-xs text-primary font-semibold hover:underline ml-1">
                        Limpiar todos
                    </button>
                </div>
            )}
        </div>
    );
}
