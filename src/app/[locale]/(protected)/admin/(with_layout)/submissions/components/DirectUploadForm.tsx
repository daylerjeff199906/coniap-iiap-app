'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { AdminDirectUpload } from './AdminDirectUpload';
import { getEventsList, getEditionsList, getCallsList } from '../actions';

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

export function DirectUploadForm() {
    const locale = useLocale();
    const [events, setEvents] = React.useState<EventItem[]>([]);
    const [editions, setEditions] = React.useState<EditionItem[]>([]);
    const [calls, setCalls] = React.useState<CallItem[]>([]);

    const [selectedEventId, setSelectedEventId] = React.useState<string>('');
    const [selectedEditionId, setSelectedEditionId] = React.useState<string>('');
    const [selectedCallId, setSelectedCallId] = React.useState<string>('');

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
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white border p-4 rounded-xl shadow-sm">
                <div className="space-y-1.5 flex-1">
                    <Label className="text-[10px] font-bold text-muted-foreground uppercase">Evento</Label>
                    <Select value={selectedEventId || 'none'} onValueChange={(val) => setSelectedEventId(val === 'none' ? '' : val)}>
                        <SelectTrigger className="w-full text-xs h-9">
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

                <div className="space-y-1.5 flex-1">
                    <Label className="text-[10px] font-bold text-muted-foreground uppercase">Edición (Opcional)</Label>
                    <Select value={selectedEditionId || 'none'} onValueChange={(val) => setSelectedEditionId(val === 'none' ? '' : val)} disabled={!selectedEventId}>
                        <SelectTrigger className="w-full text-xs h-9">
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

                <div className="space-y-1.5 flex-1">
                    <Label className="text-[10px] font-bold text-muted-foreground uppercase">Convocatoria (Opcional)</Label>
                    <Select value={selectedCallId || 'none'} onValueChange={(val) => setSelectedCallId(val === 'none' ? '' : val)} disabled={!selectedEventId && !selectedEditionId}>
                        <SelectTrigger className="w-full text-xs h-9">
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

            <div className="max-w-4xl mx-auto">
                <AdminDirectUpload
                    mainEventId={selectedEventId}
                    editionId={selectedEditionId}
                    callId={selectedCallId}
                    onSuccess={() => { }}
                />
            </div>
        </div>
    );
}
