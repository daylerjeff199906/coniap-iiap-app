'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, LayoutDashboard, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, } from '@/components/ui/card';
import { SubmissionsDashboard } from './components/SubmissionsDashboard';
import { ReviewSubmissionModal } from './components/ReviewSubmissionModal';
import { AdminDirectUpload } from './components/AdminDirectUpload';
import { EventSubmission, SubmissionStatus } from '@/types/submissions';

interface SubmissionsPageProps {
    params: Promise<{ id: string, locale: string }>;
}

export default function SubmissionsPage({ params }: SubmissionsPageProps) {
    const [id, setId] = React.useState<string | null>(null);
    const [locale, setLocale] = React.useState<string>('es');
    const [submissions, setSubmissions] = React.useState<EventSubmission[]>([]);
    const [selectedSubmission, setSelectedSubmission] = React.useState<EventSubmission | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const resolveParams = async () => {
            const resolved = await params;
            setId(resolved.id);
            setLocale(resolved.locale);
        };
        resolveParams();
    }, [params]);

    React.useEffect(() => {
        if (!id) return;

        // Simular carga de Supabase de la tabla de submissions
        setTimeout(() => {
            const mockSubmissions: EventSubmission[] = [
                {
                    id: '1',
                    profile_id: 'user-1',
                    edition_id: id,
                    title: 'Evaluación del impacto del cambio climático en la Amazonía Peruana',
                    status: 'submitted',
                    is_admin_upload: false,
                    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
                    updated_at: new Date().toISOString(),
                    profile: { id: 'user-1', first_name: 'Alex', last_name: 'Gómez', email: 'agomez@iiap.gob.pe', created_at: '', bio: null, onboarding_completed: null, birth_date: null, dedication: null, areas_of_interest: null, expertise_areas: null, research_interests: null, phone: null, location: null, institution: null, updated_at: null, avatar_url: null, social_links: null, additional_emails: null, sex: null, auth_id: null },
                    files: [{ id: 'f1', submission_id: '1', file_name: 'paper_completo.pdf', file_url: '#', document_type: 'paper', created_at: '' }],
                    comments: [{ id: 'c1', submission_id: '1', profile_id: 'admin-id', comment: 'El resumen cumple los requisitos. Esperando revisión por comité.', created_at: new Date(Date.now() - 3600000).toISOString() }]
                },
                {
                    id: '2',
                    profile_id: 'user-2',
                    edition_id: id,
                    title: 'Biotecnología aplicada a la conservación de especies nativas selváticas',
                    status: 'under_review',
                    is_admin_upload: true,
                    created_at: new Date(Date.now() - 86400000).toISOString(),
                    updated_at: new Date().toISOString(),
                    profile: { id: 'user-2', first_name: 'Liliana', last_name: 'Rojas', email: 'lrojas@iiap.gob.pe', created_at: '', bio: null, onboarding_completed: null, birth_date: null, dedication: null, areas_of_interest: null, expertise_areas: null, research_interests: null, phone: null, location: null, institution: null, updated_at: null, avatar_url: null, social_links: null, additional_emails: null, sex: null, auth_id: null },
                    files: [{ id: 'f2', submission_id: '2', file_name: 'abstract.docx', file_url: '#', document_type: 'abstract', created_at: '' }]
                },
                {
                    id: '3',
                    profile_id: 'user-3',
                    edition_id: id,
                    title: 'Sistemas Agroforestales y su impacto en la economía local',
                    status: 'approved',
                    is_admin_upload: false,
                    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
                    updated_at: new Date().toISOString(),
                    profile: { id: 'user-3', first_name: 'Marcos', last_name: 'Valle', email: 'mvalle@iiap.gob.pe', created_at: '', bio: null, onboarding_completed: null, birth_date: null, dedication: null, areas_of_interest: null, expertise_areas: null, research_interests: null, phone: null, location: null, institution: null, updated_at: null, avatar_url: null, social_links: null, additional_emails: null, sex: null, auth_id: null },
                    files: [{ id: 'f3', submission_id: '3', file_name: 'articulo_final.pdf', file_url: '#', document_type: 'paper', created_at: '' }]
                }
            ];
            setSubmissions(mockSubmissions);
            setIsLoading(false);
        }, 1200);
    }, [id]);

    const handleOpenReview = (submission: EventSubmission) => {
        setSelectedSubmission(submission);
        setIsModalOpen(true);
    };

    const handleStatusChange = (status: SubmissionStatus) => {
        if (!selectedSubmission) return;
        setSubmissions(prev => prev.map(sub => sub.id === selectedSubmission.id ? { ...sub, status } : sub));
        setSelectedSubmission(prev => prev ? { ...prev, status } : null);
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" className="rounded-full">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-800">Administrador de Trabajos</h1>
                        <p className="text-sm text-muted-foreground">ID de Edición: {id}</p>
                    </div>
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
                            Cargando postulados y archivos...
                        </Card>
                    ) : (
                        <SubmissionsDashboard submissions={submissions} onReviewClick={handleOpenReview} />
                    )}
                </TabsContent>

                <TabsContent value="upload">
                    <div className="max-w-xl">
                        <AdminDirectUpload editionId={id || ''} onSuccess={() => { }} />
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
