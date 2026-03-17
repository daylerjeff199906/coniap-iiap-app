'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { AdminDirectUpload } from './AdminDirectUpload';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { searchUsersForDirectUpload, getEventsList, getEditionsList, getCallsList } from '../actions';



interface EventItem {
    id: string;
    name: string;
}

interface EditionItem {
    id: string;
    name: Record<string, string>;
    year: number;
    main_event_id: string;
}

interface CallItem {
    id: string;
    name: Record<string, string>;
}

interface UserProfile {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
}

export function DirectUploadForm() {
    const locale = useLocale();
    const [events, setEvents] = React.useState<EventItem[]>([]);
    const [editions, setEditions] = React.useState<EditionItem[]>([]);
    const [calls, setCalls] = React.useState<CallItem[]>([]);

    const [selectedEventId, setSelectedEventId] = React.useState<string>('');
    const [selectedEditionId, setSelectedEditionId] = React.useState<string>('');
    const [selectedCallId, setSelectedCallId] = React.useState<string>('');

    // Búsqueda de Usuario State
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isSearching, setIsSearching] = React.useState(false);
    const [searchResults, setSearchResults] = React.useState<UserProfile[]>([]);
    const [selectedUser, setSelectedUser] = React.useState<UserProfile | null>(null);

    const handleSearchUser = async () => {
        if (!searchQuery) return;
        setIsSearching(true);
        const results = await searchUsersForDirectUpload(searchQuery, selectedEventId, selectedEditionId);
        setSearchResults((results as UserProfile[]) || []);
        setIsSearching(false);
    };

    const handleSelectUser = (user: UserProfile) => {
        setSelectedUser(user);
        setSearchResults([]); // Limpiar resultados
    };

    React.useEffect(() => {
        const loadEvents = async () => {
            const data = await getEventsList();
            setEvents((data as EventItem[]) || []);
        };
        loadEvents();
    }, []);

    React.useEffect(() => {
        if (!selectedEventId) {
            setEditions([]);
            setSelectedEditionId('');
            return;
        }
        const loadEditions = async () => {
            const data = await getEditionsList();
            const filtered = (data as EditionItem[]).filter((e) => e.main_event_id === selectedEventId);
            setEditions(filtered || []);
            setSelectedEditionId('');
        };
        loadEditions();
    }, [selectedEventId]);

    React.useEffect(() => {
        if (!selectedEventId && !selectedEditionId) {
            setCalls([]);
            setSelectedCallId('');
            return;
        }
        const loadCalls = async () => {
            const data = await getCallsList(selectedEventId || undefined, selectedEditionId || undefined);
            setCalls((data as CallItem[]) || []);
            setSelectedCallId('');
        };
        loadCalls();
    }, [selectedEventId, selectedEditionId]);


    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Panel Central: Formulario de Subida */}
            <div className="md:col-span-2 space-y-4">
                <AdminDirectUpload
                    mainEventId={selectedEventId}
                    editionId={selectedEditionId}
                    callId={selectedCallId}
                    selectedUser={selectedUser}
                    onSuccess={() => { setSelectedUser(null); setSearchQuery(''); }}
                />
            </div>

            {/* Panel Lateral: Filtros y Búsqueda */}
            <div className="md:col-span-1 space-y-5 bg-slate-50 border p-4 rounded-xl shadow-sm h-full">
                <div>
                    <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Paso 1: Filtros de Evento</h2>
                    <div className="space-y-3">
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold text-muted-foreground uppercase">Evento</Label>
                            <Select value={selectedEventId || 'none'} onValueChange={(val) => { setSelectedEventId(val === 'none' ? '' : val); setSelectedUser(null); setSearchResults([]); }}>
                                <SelectTrigger className="w-full text-xs h-8 bg-white">
                                    <SelectValue placeholder="Seleccionar Evento..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none" className="text-xs">Ninguno / General</SelectItem>
                                    {events.map((ev) => (
                                        <SelectItem key={ev.id} value={ev.id} className="text-xs">{ev.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold text-muted-foreground uppercase">Edición</Label>
                            <Select value={selectedEditionId || 'none'} onValueChange={(val) => { setSelectedEditionId(val === 'none' ? '' : val); setSelectedUser(null); setSearchResults([]); }} disabled={!selectedEventId}>
                                <SelectTrigger className="w-full text-xs h-8 bg-white">
                                    <SelectValue placeholder="General / Ninguna" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none" className="text-xs">General / Ninguna</SelectItem>
                                    {editions.map((ed) => (
                                        <SelectItem key={ed.id} value={ed.id} className="text-xs">
                                            {ed.name?.[locale] || ed.name?.es} ({ed.year})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold text-muted-foreground uppercase">Convocatoria</Label>
                            <Select value={selectedCallId || 'none'} onValueChange={(val) => setSelectedCallId(val === 'none' ? '' : val)} disabled={!selectedEventId && !selectedEditionId}>
                                <SelectTrigger className="w-full text-xs h-8 bg-white">
                                    <SelectValue placeholder="General / Ninguna" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none" className="text-xs">General / Ninguna</SelectItem>
                                    {calls.map((call) => (
                                        <SelectItem key={call.id} value={call.id} className="text-xs">
                                            {call.name?.[locale] || call.name?.es || 'Convocatoria'}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <hr className="border-dashed" />

                <div>
                    <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Paso 2: Buscar Participante</h2>
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                                <Input
                                    placeholder="Buscar por Nombre o Email..."
                                    className="pl-8 h-8 text-xs bg-white"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    disabled={!selectedEventId || selectedUser !== null}
                                />
                            </div>
                            <Button size="sm" className="h-8 text-xs" onClick={handleSearchUser} disabled={!selectedEventId || !searchQuery || isSearching || selectedUser !== null}>
                                {isSearching ? '...' : 'Buscar'}
                            </Button>
                        </div>

                        {!selectedEventId && (
                            <p className="text-[10px] text-amber-600 font-medium bg-amber-50 p-1.5 rounded-md border border-amber-200">
                                ⚠️ Selecciona un Evento para poder buscar participantes inscritos.
                            </p>
                        )}

                        {searchResults.length > 0 && (
                            <div className="border rounded-md bg-white overflow-hidden max-h-48 overflow-y-auto mt-2">
                                <Table className="text-[11px]">
                                    <TableHeader className="bg-slate-50">
                                        <TableRow className="h-7">
                                            <TableHead className="px-2 h-7 font-bold">Nombre</TableHead>
                                            <TableHead className="px-2 h-7 font-bold">Correo</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {searchResults.map((user) => (
                                            <TableRow key={user.id} className="cursor-pointer h-8 hover:bg-slate-50" onClick={() => handleSelectUser(user)}>
                                                <TableCell className="px-2 py-1 font-medium text-slate-800">{user.first_name} {user.last_name}</TableCell>
                                                <TableCell className="px-2 py-1 text-muted-foreground text-[10px]">{user.email}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}

                        {selectedUser && (
                            <div className="flex items-center justify-between p-2 bg-primary/5 border border-primary/10 rounded-lg mt-1">
                                <div>
                                    <p className="text-[11px] font-bold text-slate-800">{selectedUser.first_name} {selectedUser.last_name}</p>
                                    <p className="text-[10px] text-muted-foreground">{selectedUser.email}</p>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => setSelectedUser(null)} className="h-6 text-[10px] px-2 hover:bg-primary/10 text-primary">Cambiar</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

