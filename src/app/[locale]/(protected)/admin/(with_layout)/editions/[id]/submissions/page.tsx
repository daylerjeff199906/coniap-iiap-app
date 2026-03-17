'use client';

import * as React from 'react';
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
