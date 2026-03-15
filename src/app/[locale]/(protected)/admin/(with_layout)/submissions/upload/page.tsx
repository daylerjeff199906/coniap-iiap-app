'use client';

import * as React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { AdminDirectUpload } from '../components/AdminDirectUpload';
import { getEventsList, getEditionsList, getCallsList } from '../actions';
import { useLocale } from 'next-intl';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper';

export default function DirectUploadPage() {
    const locale = useLocale();
    const [events, setEvents] = React.useState<any[]>([]);
    const [editions, setEditions] = React.useState<any[]>([]);
    const [calls, setCalls] = React.useState<any[]>([]);

    const [selectedEventId, setSelectedEventId] = React.useState<string>('');
    const [selectedEditionId, setSelectedEditionId] = React.useState<string>('');
    const [selectedCallId, setSelectedCallId] = React.useState<string>('');

    React.useEffect(() => {
        const loadEvents = async () => {
            const data = await getEventsList();
            setEvents(data || []);
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
            // Filtrar ediciones por evento
            const filtered = data.filter((e: any) => e.main_event_id === selectedEventId);
            setEditions(filtered || []);
            setSelectedEditionId(''); // Reset
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
            setCalls(data || []);
            setSelectedCallId(''); // Reset
        };
        loadCalls();
    }, [selectedEventId, selectedEditionId]);

    return (
        <LayoutWrapper
            sectionTitle='Subida Directa por Administrador'
        >
            <div className="container mx-auto p-6 space-y-6 max-w-4xl">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" className="rounded-full h-8 w-8" asChild>
                        <Link href="/admin/submissions">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-800 leading-tight">Subida Directa por Administrador</h1>
                        <p className="text-xs text-muted-foreground mt-0.5">Crea un envío a nombre de un usuario participante de forma directa.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* GRID DE SELECTORES DE IGUAL ANCHO */}
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
            </div>
        </LayoutWrapper>
    );
}
