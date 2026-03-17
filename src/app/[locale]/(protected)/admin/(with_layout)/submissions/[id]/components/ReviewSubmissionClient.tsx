'use client';

import * as React from 'react';
import { MessageSquare, Download, Mail, FileText, Send, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { EventSubmission, SubmissionComment, SubmissionStatus } from '@/types/submissions';
import { Link } from '@/i18n/routing';
import { updateSubmissionStatus, addSubmissionComment } from '../../actions';
import { toast } from 'react-toastify';

const statusColors: Record<SubmissionStatus, string> = {
    draft: 'bg-slate-500 text-white',
    submitted: 'bg-blue-500 text-white',
    under_review: 'bg-yellow-500 text-black',
    changes_requested: 'bg-orange-500 text-white',
    approved: 'bg-green-600 text-white',
    rejected: 'bg-red-600 text-white',
};

interface ReviewSubmissionClientProps {
    submission: EventSubmission;
    adminId: string;
}

export function ReviewSubmissionClient({ submission: initialSubmission, adminId }: ReviewSubmissionClientProps) {
    const [submission, setSubmission] = React.useState<EventSubmission | any>(initialSubmission);
    const [comments, setComments] = React.useState<SubmissionComment[]>(initialSubmission.comments || []);
    const [newComment, setNewComment] = React.useState('');
    const [isUpdatingStatus, setIsUpdatingStatus] = React.useState(false);

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const res = await addSubmissionComment(submission.id, adminId, newComment);
        if (res.success) {
            const comment: SubmissionComment = {
                id: crypto.randomUUID(),
                submission_id: submission.id,
                profile_id: adminId,
                content: newComment,
                created_at: new Date().toISOString(),
                profile: { id: adminId, first_name: 'Tú', last_name: '(Admin)', email: '' } as any
            };
            setComments([...comments, comment]);
            setNewComment('');
            toast.success('Comentario agregado');
        } else {
            toast.error(res.error || 'Error al agregar comentario');
        }
    };

    const handleStatusUpdate = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const nextStatus = e.target.value as SubmissionStatus;
        setIsUpdatingStatus(true);
        const res = await updateSubmissionStatus(submission.id, nextStatus);
        if (res.success) {
            setSubmission({ ...submission, status: nextStatus });
            toast.success('Estado actualizado');
        } else {
            toast.error(res.error || 'Error al actualizar estado');
        }
        setIsUpdatingStatus(false);
    };

    return (
        <div className="container mx-auto p-6 space-y-6 max-w-6xl text-sm">
            <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" className="rounded-full h-8 w-8" asChild>
                        <Link href="/admin/submissions">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-800 leading-tight">Revisión de Trabajo</h1>
                        <p className="text-xs text-muted-foreground mt-0.5">ID: {submission.id}</p>
                    </div>
                </div>
                <Badge className={`${statusColors[submission.status as SubmissionStatus] || 'bg-slate-500'} px-2.5 py-0.5 text-xs rounded-full`}>
                    {submission.status}
                </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-5">
                    <div className="space-y-4">
                        <div>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Título del Trabajo</span>
                            <h2 className="text-base font-semibold text-slate-900 mt-0.5 leading-snug">{submission.title}</h2>
                        </div>

                        <hr className="border-slate-100" />

                        {/* Metadata / Respuestas Detalles */}
                        {submission.metadata && Object.keys(submission.metadata).length > 0 && (
                            <div className="p-4 border rounded-xl bg-slate-50/50 space-y-2">
                                <h3 className="text-[12px] font-bold text-slate-800 uppercase tracking-wide">Detalles Adicionales</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {Object.entries(submission.metadata).map(([key, value]) => (
                                        <div key={key} className="flex flex-col">
                                            <span className="text-[10px] text-muted-foreground font-semibold capitalize">{key.replace(/_/g, ' ')}</span>
                                            <span className="text-xs font-medium text-slate-700">{String(value || '-')}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Autor / Participante</span>
                                <div className="flex items-center gap-2.5 mt-1.5 p-2 border rounded-lg bg-slate-50/50">
                                    <Avatar className="h-8 w-8"><AvatarFallback className="text-xs bg-primary/10 text-primary"><User className="h-4 w-4" /></AvatarFallback></Avatar>
                                    <div className="min-w-0">
                                        <p className="font-medium text-slate-800 text-xs truncate">{submission.profile?.first_name} {submission.profile?.last_name}</p>
                                        <p className="text-[10px] text-muted-foreground flex items-center gap-1 truncate"><Mail className="h-3 w-3" /> {submission.profile?.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Institución</span>
                                <p className="text-xs font-medium text-slate-700 mt-1.5 p-2 border rounded-lg bg-slate-50/50">{submission.profile?.institution || 'Sin institución'}</p>
                            </div>
                        </div>
                    </div>

                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-3">Documentos y Archivos Subidos</span>
                    {submission.files && submission.files.length > 0 ? (
                        <div className="grid gap-2.5">
                            {submission.files.map((file: any) => (
                                <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50/50 transition-all">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="p-1.5 bg-primary/10 rounded-md text-primary"><FileText className="h-4 w-4" /></div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-medium text-slate-800 truncate max-w-[280px]">{file.file_name}</p>
                                            <Badge variant="outline" className="text-[9px] px-1 shadow-none text-muted-foreground mt-0.5 capitalize">{file.document_type || 'General'}</Badge>
                                        </div>
                                    </div>
                                    <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline shrink-0">
                                        <Download className="h-3.5 w-3.5" /> Descargar
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (<p className="text-xs text-muted-foreground border border-dashed rounded-lg p-4 text-center">No hay archivos cargados.</p>)}

                </div>

                <div className="lg:col-span-1 space-y-4">
                    <Label htmlFor="status" className="text-[10px] font-bold text-muted-foreground uppercase block mb-1.5">Cambiar Estado Técnico</Label>
                    <select id="status" value={submission.status} onChange={handleStatusUpdate} disabled={isUpdatingStatus || submission.status === 'draft'} className="flex h-9 w-full rounded-md border bg-white px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-primary shadow-sm disabled:opacity-50">
                        {submission.status === 'draft' && <option value="draft">Borrador</option>}
                        {submission.status === 'submitted' && <option value="submitted" disabled>Presentado / Enviado</option>}
                        
                        <option value="under_review">En Revisión Comité</option>
                        <option value="changes_requested">Cambios Solicitados</option>
                        <option value="approved">Aprobado</option>
                        <option value="rejected">Rechazado</option>
                    </select>

                    {submission.status === 'draft' && (
                        <p className="text-[11px] text-orange-500 font-medium mt-1">No se pueden realizar cambios en borradores.</p>
                    )}

                    <div className="p-3 border-b bg-slate-50 flex items-center gap-1.5 mt-2">
                        <MessageSquare className="h-4 w-4 text-primary" />
                        <h3 className="font-semibold text-xs text-slate-700">Hilo de Feedback Técnico</h3>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-[400px]">
                        {comments.map((comment) => (
                            <div key={comment.id} className={`flex flex-col ${comment.profile_id === adminId ? 'items-end' : 'items-start'}`}>
                                <div className={`p-2.5 rounded-lg max-w-[85%] text-xs border ${comment.profile_id === adminId ? 'bg-primary/10 border-primary/20 text-slate-800' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                                    <p className="font-bold text-[10px] opacity-70 mb-0.5">{comment.profile_id === adminId ? 'Tú (Administrador)' : comment.profile?.first_name}</p>
                                    <p className="leading-normal">{comment.content as any || (comment as any).comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleAddComment} className="p-3 border-t bg-slate-50/50 flex gap-1.5 items-center">
                        <Input placeholder="Escribe un comentario..." className="text-xs h-8 flex-1 bg-white" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                        <Button type="submit" size="icon" className="h-8 w-8 shrink-0"><Send className="h-3.5 w-3.5" /></Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
