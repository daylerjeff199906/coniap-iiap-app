'use client';

import * as React from 'react';
import { LayoutDashboard, UploadCloud } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { SubmissionsDashboard } from './components/SubmissionsDashboard';
import { ReviewSubmissionModal } from './components/ReviewSubmissionModal';
import { AdminDirectUpload } from './components/AdminDirectUpload';
import { EventSubmission, SubmissionStatus } from '@/types/submissions';

export default function SubmissionsPage() {
    const [submissions, setSubmissions] = React.useState<EventSubmission[]>([]);
    const [selectedSubmission, setSelectedSubmission] = React.useState<EventSubmission | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    // Filtros
    const [events, setEvents] = React.useState<{ id: string, name: string }[]>([]);
    const [editions, setEditions] = React.useState<{ id: string, name: string }[]>([]);
    const [selectedEventId, setSelectedEventId] = React.useState<string>('all');
    const [selectedEditionId, setSelectedEditionId] = React.useState<string>('all');

    React.useEffect(() => {
        // Simular carga de eventos y ediciones para los filtros select
        setTimeout(() => {
            setEvents([
                { id: 'ev1', name: 'Congreso Internacional de Biodiversidad' },
                { id: 'ev2', name: 'Simposio de Biotecnología' }
            ]);
            setEditions([
                { id: 'ed1', name: 'Edición 2025' },
                { id: 'ed2', name: 'Edición 2026' }
            ]);
        }, 500);

        // Simular carga de Submissions de forma global
        setTimeout(() => {
            const mockSubmissions: EventSubmission[] = [
                {
                    id: '1',
                    profile_id: 'user-1',
                    edition_id: 'ed1',
                    title: 'Evaluación del impacto del cambio climático en la Amazonía Peruana',
                    status: 'submitted',
                    is_admin_upload: false,
                    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
                    updated_at: new Date().toISOString(),
                    profile: { id: 'user-1', first_name: 'Alex', last_name: 'Gómez', email: 'agomez@iiap.gob.pe', created_at: '', bio: null, onboarding_completed: null, birth_date: null, dedication: null, areas_of_interest: null, expertise_areas: null, research_interests: null, phone: null, location: null, institution: null, updated_at: null, avatar_url: null, social_links: null, additional_emails: null, sex: null, auth_id: null },
                    files: [{ id: 'f1', submission_id: '1', file_name: 'paper_completo.pdf', file_url: '#', document_type: 'paper', created_at: '' }]
                },
                {
                    id: '2',
                    profile_id: 'user-2',
                    edition_id: 'ed2',
                    title: 'Biotecnología aplicada a la conservación de especies nativas selváticas',
                    status: 'under_review',
                    is_admin_upload: true,
                    created_at: new Date(Date.now() - 86400000).toISOString(),
                    updated_at: new Date().toISOString(),
                    profile: { id: 'user-2', first_name: 'Liliana', last_name: 'Rojas', email: 'lrojas@iiap.gob.pe', created_at: '', bio: null, onboarding_completed: null, birth_date: null, dedication: null, areas_of_interest: null, expertise_areas: null, research_interests: null, phone: null, location: null, institution: null, updated_at: null, avatar_url: null, social_links: null, additional_emails: null, sex: null, auth_id: null },
                    files: [{ id: 'f2', submission_id: '2', file_name: 'abstract.docx', file_url: '#', document_type: 'abstract', created_at: '' }]
                }
            ];
            setSubmissions(mockSubmissions);
            setIsLoading(false);
        }, 1200);
    }, []);

    const handleOpenReview = (submission: EventSubmission) => {
        setSelectedSubmission(submission);
        setIsModalOpen(true);
    };

    const handleStatusChange = (status: SubmissionStatus) => {
        if (!selectedSubmission) return;
        setSubmissions(prev => prev.map(sub => sub.id === selectedSubmission.id ? { ...sub, status } : sub));
        setSelectedSubmission(prev => prev ? { ...prev, status } : null);
    };

    const filteredSubmissions = submissions.filter(sub => {
        const matchesEvent = selectedEventId === 'all' || sub.main_event_id === selectedEventId;
        const matchesEdition = selectedEditionId === 'all' || sub.edition_id === selectedEditionId;
        return matchesEvent && matchesEdition;
    });

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-800">Administrador General de Trabajos</h1>
                    <p className="text-sm text-muted-foreground">Revisa y gestiona postulaciones a través de todos los eventos.</p>
                </div>
            </div>

            {/* BARRA DE FILTROS GENERALES */}
            <div className="flex gap-4 p-4 bg-white rounded-xl border shadow-sm">
                <div className="flex-1 space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Filtrar por Evento</label>
                    <select
                        value={selectedEventId}
                        onChange={(e) => setSelectedEventId(e.target.value)}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        <option value="all">Todos los Eventos</option>
                        {events.map(ev => <option key={ev.id} value={ev.id}>{ev.name}</option>)}
                    </select>
                </div>
                <div className="flex-1 space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Filtrar por Edición</label>
                    <select
                        value={selectedEditionId}
                        onChange={(e) => setSelectedEditionId(e.target.value)}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        <option value="all">Todas las Ediciones</option>
                        {editions.map(ed => <option key={ed.id} value={ed.id}>{ed.name}</option>)}
                    </select>
                </div>
            </div>

            <Tabs defaultValue="dashboard" className="space-y-4">
                <TabsList className="bg-muted px-1 py-1 rounded-lg">
                    <TabsTrigger value="dashboard" className="flex items-center gap-1.5 text-xs px-3">
                        <LayoutDashboard className="h-4 w-4" /> Panel Activo
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="flex items-center gap-1.5 text-xs px-3">
                        <UploadCloud className="h-4 w-4" /> Subida Directa
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard">
                    {isLoading ? (
                        <Card className="p-12 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                            Cargando postulados...
                        </Card>
                    ) : (
                        <SubmissionsDashboard submissions={filteredSubmissions} onReviewClick={handleOpenReview} />
                    )}
                </TabsContent>

                <TabsContent value="upload">
                    <div className="max-w-xl">
                        <AdminDirectUpload editionId={selectedEditionId !== 'all' ? selectedEditionId : ''} onSuccess={() => { }} />
                    </div>
                </TabsContent>
            </Tabs>

            <ReviewSubmissionModal
                submission={selectedSubmission}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onStatusChange={handleStatusChange}
            />
        </div>
    );
}
