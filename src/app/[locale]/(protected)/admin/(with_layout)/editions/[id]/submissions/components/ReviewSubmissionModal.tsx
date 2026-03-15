'use client';

import * as React from 'react';
import { MessageSquare, Download, Mail, FileText, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { EventSubmission, SubmissionComment, SubmissionStatus } from '@/types/submissions';
import Link from 'next/link';

interface ReviewSubmissionModalProps {
    submission: EventSubmission | null;
    isOpen: boolean;
    onClose: () => void;
    onStatusChange?: (status: SubmissionStatus) => void;
}

const statusColors: Record<SubmissionStatus, string> = {
    draft: 'bg-slate-500 text-white',
    submitted: 'bg-blue-500 text-white',
    under_review: 'bg-yellow-500 text-black',
    changes_requested: 'bg-orange-500 text-white',
    approved: 'bg-green-600 text-white',
    rejected: 'bg-red-600 text-white',
};

export function ReviewSubmissionModal({ submission, isOpen, onClose, onStatusChange }: ReviewSubmissionModalProps) {
    const [comments, setComments] = React.useState<SubmissionComment[]>([]);
    const [newComment, setNewComment] = React.useState('');
    const [isUpdatingStatus, setIsUpdatingStatus] = React.useState(false);

    React.useEffect(() => {
        if (submission?.comments) {
            setComments(submission.comments);
        } else {
            setComments([]);
        }
    }, [submission]);

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !submission) return;

        const comment: SubmissionComment = {
            id: crypto.randomUUID(),
            submission_id: submission.id,
            profile_id: 'admin-id',
            comment: newComment,
            created_at: new Date().toISOString(),
            profile: {
                id: 'admin-id',
                first_name: 'Administrador',
                last_name: 'Principal',
                email: 'admin@iiap.gob.pe',
                created_at: '',
                bio: null,
                onboarding_completed: null,
                birth_date: null,
                dedication: null,
                areas_of_interest: null,
                expertise_areas: null,
                research_interests: null,
                phone: null,
                location: null,
                institution: null,
                updated_at: null,
                avatar_url: null,
                social_links: null,
                additional_emails: null,
                sex: null,
                auth_id: null,
            }
        };

        setComments([...comments, comment]);
        setNewComment('');
    };

    const handleStatusUpdate = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const nextStatus = e.target.value as SubmissionStatus;
        if (!submission || !onStatusChange) return;

        setIsUpdatingStatus(true);
        // Simular llamada a Supabase update
        setTimeout(() => {
            onStatusChange(nextStatus);
            setIsUpdatingStatus(false);
        }, 800);
    };

    if (!submission) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <DialogTitle className="text-xl font-bold leading-tight">
                                {submission.title}
                            </DialogTitle>
                            <DialogDescription className="mt-1 flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                {submission.is_admin_upload ? 'Carga Administrativa Directa' : 'Envío de Participante'}
                            </DialogDescription>
                        </div>
                        <Badge className={statusColors[submission.status] + ' px-3 py-1 text-sm rounded-full'}>
                            {submission.status}
                        </Badge>
                    </div>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    {/* Información y Archivos */}
                    <div className="md:col-span-2 space-y-4">
                        <section className="bg-muted/30 p-4 rounded-lg border">
                            <h3 className="font-semibold text-sm mb-2 text-muted-foreground">Autor / Participante</h3>
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback><User /></AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{submission.profile?.first_name} {submission.profile?.last_name}</p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Mail className="h-3 w-3" />
                                        {submission.profile?.email}
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-2">
                            <h3 className="font-semibold text-sm text-muted-foreground">Documentos y Archivos Subidos</h3>
                            {submission.files && submission.files.length > 0 ? (
                                <div className="grid gap-2">
                                    {submission.files.map((file) => (
                                        <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-primary/10 rounded">
                                                    <FileText className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">{file.file_name}</p>
                                                    <p className="text-xs text-muted-foreground">{file.document_type || 'Archivo General'}</p>
                                                </div>
                                            </div>
                                            <Link className="gap-1 text-primary hover:text-primary-focus" href={file.file_url} target="_blank">
                                                <Download className="h-4 w-4" /> Descargar
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground border border-dashed rounded-lg p-4 text-center">No hay archivos cargados.</p>
                            )}
                        </section>
                    </div>

                    {/* Gestión de Estado y Feedback */}
                    <div className="md:col-span-1 space-y-4">
                        <section className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                            <Label htmlFor="status" className="font-semibold text-sm mb-2 block">Cambiar Estado</Label>
                            <select
                                id="status"
                                value={submission.status}
                                onChange={handleStatusUpdate}
                                disabled={isUpdatingStatus}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="draft">Borrador</option>
                                <option value="submitted">Presentado</option>
                                <option value="under_review">En Revisión</option>
                                <option value="changes_requested">Cambios Solicitados</option>
                                <option value="approved">Aprobado</option>
                                <option value="rejected">Rechazado</option>
                            </select>
                        </section>

                        <section className="border rounded-lg flex flex-col h-[320px]">
                            <div className="p-3 border-b bg-muted/50 rounded-t-lg">
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4 text-primary" />
                                    <h3 className="font-semibold text-sm">Feedback / Comentarios</h3>
                                </div>
                            </div>

                            {/* Chat Thread */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                {comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <div key={comment.id} className={`flex flex-col ${comment.profile_id === 'admin-id' ? 'items-end' : 'items-start'}`}>
                                            <div className={`p-2 rounded-lg max-w-[85%] text-xs border ${comment.profile_id === 'admin-id' ? 'bg-primary/10 border-primary/20 text-slate-800' : 'bg-muted/60 border-muted-foreground/20 text-slate-700'}`}>
                                                <p className="font-semibold mb-1 opacity-70">
                                                    {comment.profile?.first_name || 'Anónimo'}
                                                </p>
                                                <p className="leading-relaxed">{comment.comment}</p>
                                            </div>
                                            <span className="text-[10px] text-muted-foreground mt-1">
                                                {new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span >
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-xs text-muted-foreground pt-4">No hay comentarios aún.</p>
                                )}
                            </div>

                            {/* Input Form */}
                            <form onSubmit={handleAddComment} className="p-3 border-t flex gap-2">
                                <Input
                                    placeholder="Escribe un comentario..."
                                    className="text-xs h-9 flex-1"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <Button type="submit" size="icon" className="h-9 w-9">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </section>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
