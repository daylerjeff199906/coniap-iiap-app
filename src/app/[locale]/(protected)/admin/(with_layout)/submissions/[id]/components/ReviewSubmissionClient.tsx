'use client';
import * as React from 'react';
import {
    MessageSquare, Download, Mail, FileText, Send, User, ArrowLeft,
    CheckCircle2, XCircle, AlertTriangle, Clock, ChevronDown, RefreshCw, Trash, Plus, Link2, UploadCloud
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EventSubmission, SubmissionComment, SubmissionStatus, SubmissionHistory } from '@/types/submissions';
import { Link } from '@/i18n/routing';
import { reviewSubmission, addSubmissionComment, addSubmissionFile, deleteSubmissionFile } from '../../actions';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";



const statusConfig: Record<SubmissionStatus, { label: string; color: string; border: string; icon: any; iconColor: string; hoverColor: string }> = {
    draft: { label: 'Borrador', color: 'bg-slate-100 text-slate-700', border: 'border-slate-200', icon: Clock, iconColor: 'text-slate-500', hoverColor: 'hover:bg-slate-200/80' },
    submitted: { label: 'Presentado', color: 'bg-blue-50 text-blue-700', border: 'border-blue-200', icon: FileText, iconColor: 'text-blue-500', hoverColor: 'hover:bg-blue-100/80' },
    under_review: { label: 'En Revisión Comité', color: 'bg-amber-50 text-amber-700', border: 'border-amber-200', icon: MessageSquare, iconColor: 'text-amber-500', hoverColor: 'hover:bg-amber-100/80' },
    changes_requested: { label: 'Cambios Solicitados', color: 'bg-orange-50 text-orange-700', border: 'border-orange-200', icon: AlertTriangle, iconColor: 'text-orange-500', hoverColor: 'hover:bg-orange-100/80' },
    approved: { label: 'Aprobado', color: 'bg-emerald-50 text-emerald-700', border: 'border-emerald-200', icon: CheckCircle2, iconColor: 'text-emerald-500', hoverColor: 'hover:bg-emerald-100/80' },
    rejected: { label: 'Rechazado', color: 'bg-rose-50 text-rose-700', border: 'border-rose-200', icon: XCircle, iconColor: 'text-rose-500', hoverColor: 'hover:bg-rose-100/80' },
};

const actionConfigs: Record<string, { label: string; description: string; icon: any; color: string; buttonColor: string }> = {
    comment: {
        label: 'Solo Comentar',
        description: 'Agrega un comentario al hilo sin cambiar el estado técnico.',
        icon: MessageSquare,
        color: 'text-slate-500',
        buttonColor: 'bg-slate-900 hover:bg-slate-800 text-white'
    },
    approve: {
        label: 'Aprobar Trabajo',
        description: 'El trabajo cumple con todos los requisitos y es aceptado.',
        icon: CheckCircle2,
        color: 'text-emerald-500',
        buttonColor: 'bg-emerald-600 hover:bg-emerald-700 text-white'
    },
    request_changes: {
        label: 'Solicitar Cambios',
        description: 'Se requiere que el participante realice correcciones antes de proceder.',
        icon: AlertTriangle,
        color: 'text-amber-500',
        buttonColor: 'bg-amber-500 hover:bg-amber-600 text-white'
    },
    reject: {
        label: 'Rechazar Trabajo',
        description: 'El trabajo no cumple con los criterios de aceptación del comité.',
        icon: XCircle,
        color: 'text-rose-500',
        buttonColor: 'bg-rose-600 hover:bg-rose-700 text-white'
    },
    draft: {
        label: 'Regresar a Borrador',
        description: 'Permite al participante editar sus documentos y volver a presentar el trabajo.',
        icon: Clock,
        color: 'text-slate-500',
        buttonColor: 'bg-indigo-600 hover:bg-indigo-700 text-white'
    }
};

interface ReviewSubmissionClientProps {
    submission: EventSubmission;
    adminId: string;
}

export function ReviewSubmissionClient({ submission: initialSubmission, adminId }: ReviewSubmissionClientProps) {
    const [submission, setSubmission] = React.useState<EventSubmission>(initialSubmission);
    const [comments, setComments] = React.useState<SubmissionComment[]>(initialSubmission.comments || []);
    const [history, setHistory] = React.useState<SubmissionHistory[]>(initialSubmission.history || []);

    const [justification, setJustification] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [selectedAction, setSelectedAction] = React.useState<'comment' | 'approve' | 'request_changes' | 'reject'>('comment');
    const [selectedFileId, setSelectedFileId] = React.useState<string>('');

    // File Management State for Admin Uploads
    const [isAddingFile, setIsAddingFile] = React.useState(false);
    const [newFileType, setNewFileType] = React.useState<'file' | 'link'>('file');
    const [newFileDocType, setNewFileDocType] = React.useState('abstract');
    const [newFile, setNewFile] = React.useState<File | null>(null);
    const [newLinkUrl, setNewLinkUrl] = React.useState('');
    const [isUpdatingFile, setIsUpdatingFile] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [fileToDeleteId, setFileToDeleteId] = React.useState<string | null>(null);

    const handleDeleteFile = async () => {
        if (!fileToDeleteId) return;
        setIsUpdatingFile(true);
        try {
            const res = await deleteSubmissionFile(fileToDeleteId, submission.id);
            if (res.success) {
                setSubmission(prev => ({
                    ...prev,
                    files: prev.files?.filter(f => f.id !== fileToDeleteId) || []
                }));
                toast.success('Archivo eliminado correctamente');
            } else {
                toast.error(res.error || 'Error al eliminar');
            }
        } catch (error) { toast.error('Error al procesar la eliminación'); }
        setIsUpdatingFile(false);
        setFileToDeleteId(null);
    };


    const handleAddFile = async () => {
        if (newFileType === 'file' && !newFile) {
            toast.warning('Por favor selecciona un archivo');
            return;
        }
        if (newFileType === 'link' && !newLinkUrl.trim()) {
            toast.warning('Por favor ingresa un link o URL');
            return;
        }

        setIsUpdatingFile(true);
        try {
            let fileUrl = '';
            let fileName = 'Link Asociado';

            if (newFileType === 'file' && newFile) {
                const formData = new FormData();
                formData.append('file', newFile);
                formData.append('folder', 'applications');
                const response = await fetch('/api/r2/upload', { method: 'POST', body: formData });
                if (!response.ok) throw new Error('Error al cargar archivo');
                const upData = await response.json();
                fileUrl = upData.url;
                fileName = newFile.name;
            } else if (newFileType === 'link') {
                fileUrl = newLinkUrl;
            }

            const res = await addSubmissionFile({
                submissionId: submission.id,
                fileName,
                fileUrl,
                documentType: newFileDocType
            });

            if (res.success && res.data) {
                setSubmission(prev => ({
                    ...prev,
                    files: [...(prev.files || []), res.data as any]
                }));
                setIsAddingFile(false);
                setNewFile(null);
                setNewLinkUrl('');
                toast.success('Archivo agregado correctamente');
            } else {
                toast.error(res.error || 'Error al agregar archivo');
            }
        } catch (e: any) { toast.error(e.message || 'Error en la subida'); }
        setIsUpdatingFile(false);
    };


    // Merge comments and history for Timeline
    const timeline = React.useMemo(() => {
        const items = [
            ...comments.map(c => ({
                type: 'comment' as const,
                id: `comment-${c.id}`,
                date: new Date(c.created_at),
                data: c
            })),
            ...history.map(h => ({
                type: 'history' as const,
                id: `history-${h.id}`,
                date: new Date(h.created_at),
                data: h
            }))
        ];
        return items.sort((a, b) => {
            const diff = a.date.getTime() - b.date.getTime();
            if (diff !== 0) return diff;
            return a.id.localeCompare(b.id);
        });
    }, [comments, history]);

    const handleReview = async (action: 'approve' | 'reject' | 'request_changes' | 'comment') => {
        const text = justification.trim();

        const existingProfile = comments.find(c => c.profile_id === adminId)?.author;
        const mockAuthor = existingProfile ? {
            ...existingProfile,
            user_roles: existingProfile.user_roles || [{ roles: { name: 'Admin' } }]
        } : {
            id: adminId,
            first_name: 'Tú',
            last_name: '(Admin)',
            email: '',
            created_at: new Date().toISOString(),
            bio: null,
            onboarding_completed: false,
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
            user_roles: [{ roles: { name: 'Admin' } }]
        };

        if (action !== 'comment' && action !== 'approve' && !text) {
            toast.warning('Por favor agrega una justificación / comentario para este cambio.');
            return;
        }

        if (action === 'comment' && !text) {
            toast.warning('El comentario no puede estar vacío.');
            return;
        }

        setIsSubmitting(true);
        try {
            if (action === 'comment') {
                const res = await addSubmissionComment(submission.id, adminId, text, selectedFileId || undefined);
                if (res.success) {
                    const mappedFile = selectedFileId && submission.files
                        ? { file_name: submission.files.find(f => f.id === selectedFileId)?.file_name || '' }
                        : undefined;

                    setComments(prev => [...prev, {
                        id: crypto.randomUUID(),
                        submission_id: submission.id,
                        profile_id: adminId,
                        content: text,
                        created_at: new Date().toISOString(),
                        file_id: selectedFileId || null,
                        file: mappedFile,
                        author: mockAuthor
                    }]);
                    setJustification('');
                    setSelectedFileId('');
                    toast.success('Comentario agregado');
                } else {
                    toast.error(res.error || 'Error al agregar comentario');
                }
            } else {
                const mapStatus: Record<string, SubmissionStatus> = {
                    approve: 'approved',
                    reject: 'rejected',
                    request_changes: 'changes_requested',
                    draft: 'draft'
                };
                const nextStatus = mapStatus[action];
                const res = await reviewSubmission(submission.id, nextStatus, text || undefined);
                if (res.success) {
                    setSubmission(prev => ({ ...prev, status: nextStatus }));
                    setHistory(prev => [...prev, {
                        id: crypto.randomUUID(),
                        submission_id: submission.id,
                        changed_by: adminId,
                        old_status: submission.status,
                        new_status: nextStatus as any,
                        justification: text || null,
                        created_at: new Date().toISOString(),
                        profile: mockAuthor
                    }]);
                    setJustification('');
                    toast.success(`Estado actualizado a ${statusConfig[nextStatus].label}`);
                } else {
                    toast.error(res.error || 'Error al actualizar estado');
                }
            }
        } catch (error) {
            toast.error('Ocurrió un error inesperado');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReopen = async () => {
        setIsSubmitting(true);
        try {
            const res = await reviewSubmission(submission.id, 'under_review', 'Reapertura de revisión para auditoría / cambios.');
            if (res.success) {
                setSubmission(prev => ({ ...prev, status: 'under_review' }));
                setHistory(prev => [...prev, {
                    id: crypto.randomUUID(),
                    submission_id: submission.id,
                    changed_by: adminId,
                    old_status: submission.status,
                    new_status: 'under_review',
                    justification: 'Reapertura de revisión para auditoría / cambios.',
                    created_at: new Date().toISOString(),
                    profile: {
                        id: adminId,
                        first_name: 'Tú',
                        last_name: '(Admin)',
                        email: '',
                        user_roles: [{ roles: { name: 'Admin' } }]
                    } as any
                }]);
                toast.success('Revisión reabierta exitosamente.');
            } else {
                toast.error(res.error || 'Error al reabrir la revisión');
            }
        } catch (error) {
            toast.error('Error al reabrir la revisión');
        } finally {
            setIsSubmitting(false);
        }
    };

    const currentAction = actionConfigs[selectedAction];

    const availableActions = Object.entries(actionConfigs).filter(([key]) => {
        if (key === 'approve' && submission.status === 'approved') return false;
        if (key === 'request_changes' && submission.status === 'changes_requested') return false;
        if (key === 'reject' && submission.status === 'rejected') return false;
        if (key === 'draft' && submission.status === 'draft') return false;
        return true;
    });

    return (
        <div className="container mx-auto p-6 space-y-6 text-sm leading-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
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
                <Badge className={`${statusConfig[submission.status].color} ${statusConfig[submission.status].border} ${statusConfig[submission.status].hoverColor} border px-3 py-1 text-xs rounded-full shadow-none font-medium transition-all`}>
                    {statusConfig[submission.status].label}
                </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Content: Timeline & Actions */}
                <div className="lg:col-span-3 space-y-6">
                    <div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Título del Trabajo</span>
                        <h2 className="text-lg font-bold text-slate-900 mt-1 leading-snug">{submission.title}</h2>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Timeline Frame */}
                    <div className="space-y-6 relative before:absolute before:inset-0 before:left-2 before:border-l-1 before:border-slate-200 before:pointer-events-none">
                        {timeline.map((item) => {
                            const roles = item.type === 'comment'
                                ? item.data.author?.user_roles?.map((r: any) => r.roles?.name) || []
                                : item.data.profile?.user_roles?.map((r: any) => r.roles?.name) || [];
                            const isAdmin = roles.some((r: any) => r?.toLowerCase().includes('admin'));

                            const isCommentMe = item.type === 'comment' && (item.data.profile_id === adminId || item.data.author?.id === adminId);
                            const isHistoryMe = item.type === 'history' && (item.data.profile?.id === adminId || item.data.changed_by === adminId);
                            const isMe = isCommentMe || isHistoryMe;

                            return (
                                <div key={item.id} className="relative flex gap-4 items-start">
                                    {item.type === 'comment' ? (
                                        <>
                                            <div className="absolute left-2 w-6 h-6 bg-white border border-slate-300 rounded-full flex items-center justify-center -translate-x-1/2 z-10 mt-1.5 flex-none">
                                                <MessageSquare className="h-3 w-3 text-slate-400" />
                                            </div>
                                            <div className="flex-1 ml-6 bg-white border border-slate-200 rounded-lg shadow-sm">
                                                <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center rounded-t-lg">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-slate-800 text-xs">
                                                            {(item.data.author?.first_name === 'Tú' || item.data.profile?.first_name === 'Tú')
                                                                ? 'Tú (Admin)'
                                                                : `${item.data.author?.first_name || item.data.profile?.first_name || ''} ${item.data.author?.last_name || item.data.profile?.last_name || ''}`} {isMe && (item.data.author?.first_name !== 'Tú' && item.data.profile?.first_name !== 'Tú') && '(Tú)'}
                                                        </span>
                                                        {isAdmin && <Badge className="text-[9px] px-1 py-0 bg-slate-100 text-slate-600 shadow-none font-medium h-4 hover:bg-slate-200/80 cursor-default transition-all">Admin</Badge>}
                                                        <span className="text-slate-500 font-normal text-[11px]">comentó</span>
                                                        {item.data.file?.file_name && (
                                                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-slate-50 border-slate-200 text-slate-500 flex items-center gap-0.5 ml-1 font-medium shadow-none hover:bg-slate-100/80 cursor-default transition-all">
                                                                <FileText className="h-2.5 w-2.5" /> Sobre: {item.data.file.file_name}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <span className="text-[11px] text-slate-400 flex items-center gap-1" suppressHydrationWarning>
                                                        <Clock className="h-3 w-3" />
                                                        {formatDistanceToNow(new Date(item.data.created_at), { addSuffix: true, locale: es })}
                                                    </span>

                                                </div>
                                                <div className="p-4 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                                                    {item.data.content}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className={`absolute left-2 w-6 h-6 ${statusConfig[item.data.new_status].color} border border-transparent rounded-full flex items-center justify-center -translate-x-1/2 z-10 mt-1 flex-none`}>
                                                {React.createElement(statusConfig[item.data.new_status].icon, { className: `h-3 w-3 ${statusConfig[item.data.new_status].iconColor}` })}
                                            </div>
                                            <div className="flex-1 ml-6 pt-2">
                                                <div className="text-xs text-slate-600 flex flex-wrap items-center gap-1.5">
                                                    <span className="font-semibold text-slate-800">
                                                        {(item.data.profile?.first_name === 'Tú')
                                                            ? 'Tú (Admin)'
                                                            : `${item.data.profile?.first_name || 'Sistema'} ${item.data.profile?.last_name || ''}`} {isMe && item.data.profile?.first_name !== 'Tú' && '(Tú)'}
                                                    </span>
                                                    {isAdmin && <Badge className="text-[9px] px-1 py-0 bg-slate-100 text-slate-600 shadow-none font-medium h-4 hover:bg-slate-200/80 cursor-default transition-all">Admin</Badge>}
                                                    <span>{item.data.old_status ? 'cambió el estado de' : 'creó el trabajo con estado'}</span>
                                                    {item.data.old_status && (
                                                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${statusConfig[item.data.old_status].color} ${statusConfig[item.data.old_status].border} border-slate-200 shadow-none font-medium ${statusConfig[item.data.old_status].hoverColor} cursor-default transition-all`}>
                                                            {statusConfig[item.data.old_status].label}
                                                        </Badge>
                                                    )}
                                                    {item.data.old_status && <span>a</span>}
                                                    <Badge className={`text-[10px] px-1.5 py-0 font-medium ${statusConfig[item.data.new_status].color} border ${statusConfig[item.data.new_status].border} ${statusConfig[item.data.new_status].hoverColor} cursor-default shadow-none transition-all`}>
                                                        {statusConfig[item.data.new_status].label}
                                                    </Badge>
                                                    <span className="text-[11px] text-slate-400 ml-auto flex items-center gap-1" suppressHydrationWarning>
                                                        <Clock className="h-3 w-3" />
                                                        {formatDistanceToNow(new Date(item.data.created_at), { addSuffix: true, locale: es })}
                                                    </span>

                                                </div>
                                                {item.data.justification && (
                                                    <div className="mt-1.5 p-3 border border-slate-100 bg-slate-50/50 rounded-sm text-xs text-slate-700 border-l-4 border-l-slate-200 whitespace-pre-wrap">
                                                        <p className="font-semibold text-[10px] text-slate-500 mb-1">Justificación/Comentario:</p>
                                                        {item.data.justification}
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}

                        {/* Connected Action Frame connected inside the Timeline flow alignment frame grid */}
                        {submission.status === 'draft' ? (
                            <div className="relative flex gap-4 items-start pt-1">
                                <div className="absolute left-2 w-6 h-6 bg-white border border-slate-300 rounded-full flex items-center justify-center -translate-x-1/2 z-10 mt-1.5 flex-none">
                                    <Clock className="h-3 w-3 text-slate-400" />
                                </div>
                                <div className="flex-1 ml-6 flex flex-col items-center justify-center p-6 border border-dashed border-slate-200 rounded-lg bg-slate-50/30 space-y-2">
                                    <Badge className="bg-slate-100 text-slate-600 border-slate-200 border px-3 py-1 text-xs rounded-full shadow-none font-medium">
                                        Trabajo en Borrador
                                    </Badge>
                                    <p className="text-xs text-muted-foreground text-center max-w-xs">
                                        El participante aún no ha enviado este trabajo. Las acciones de revisión y los comentarios estarán disponibles una vez que sea presentado.
                                    </p>
                                </div>
                            </div>
                        ) : submission.status === 'approved' || submission.status === 'rejected' ? (
                            <div className="relative flex gap-4 items-start pt-1">
                                <div className="absolute left-2 w-6 h-6 bg-white border border-slate-300 rounded-full flex items-center justify-center -translate-x-1/2 z-10 mt-1.5 flex-none">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400"></div>
                                </div>
                                <div className="flex-1 ml-6 flex flex-col items-center justify-center p-6 border border-slate-200 rounded-lg bg-slate-50/50 space-y-3">
                                    <Badge className={`${statusConfig[submission.status].color} ${statusConfig[submission.status].border} ${statusConfig[submission.status].hoverColor} border px-3 py-1 text-xs rounded-full shadow-none font-medium`}>
                                        Revisión Finalizada: {statusConfig[submission.status].label}
                                    </Badge>
                                    <p className="text-xs text-muted-foreground text-center">
                                        Este trabajo ha sido {submission.status === 'approved' ? 'aprobado' : 'rechazado'}. No se pueden agregar más comentarios o revisiones.
                                    </p>
                                    <Button size="sm" variant="outline" className="flex items-center gap-1.5 text-xs font-semibold h-9" onClick={() => handleReopen()} disabled={isSubmitting}>
                                        <RefreshCw className="h-3.5 w-3.5" /> Reabrir Revisión
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="relative flex gap-4 items-start pt-1">
                                <div className="absolute left-2 w-6 h-6 bg-white border border-slate-300 rounded-full flex items-center justify-center -translate-x-1/2 z-10 mt-1.5 flex-none">
                                    <Avatar className="h-5 w-5"><AvatarFallback className="bg-slate-100"><User className="h-3 w-3 text-slate-500" /></AvatarFallback></Avatar>
                                </div>
                                <div className="flex-1 ml-6 bg-white border border-slate-200 rounded-lg shadow-sm p-4 space-y-4">
                                    <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Agregar Revisión o Comentario</span>
                                        {submission.files && submission.files.length > 0 && selectedAction === 'comment' && (
                                            <select
                                                className="text-[11px] h-7 bg-slate-50 border rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-slate-300 max-w-[150px] truncate"
                                                value={selectedFileId}
                                                onChange={(e) => setSelectedFileId(e.target.value)}
                                                disabled={isSubmitting}
                                            >
                                                <option value="">Sobre: General</option>
                                                {submission.files.map((file) => (
                                                    <option key={file.id} value={file.id}>📄 {file.file_name}</option>
                                                ))}
                                            </select>
                                        )}
                                    </div>

                                    <Textarea
                                        placeholder="Escribe un comentario o la justificación para el cambio de estado opcional..."
                                        className="text-xs resize-none bg-slate-50/50 focus:bg-white min-h-[100px]"
                                        value={justification}
                                        onChange={e => setJustification(e.target.value)}
                                        disabled={isSubmitting}
                                    />

                                    <div className="flex justify-start">
                                        <div className="flex items-center -space-x-px">
                                            <Button
                                                className={`rounded-r-none px-4 flex gap-1.5 items-center font-semibold shadow-sm border ${currentAction.buttonColor} h-12`}
                                                disabled={isSubmitting}
                                                onClick={() => handleReview(selectedAction)}
                                            >
                                                {React.createElement(currentAction.icon, { className: "h-3.5 w-3.5" })}
                                                {currentAction.label}
                                            </Button>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        className={`rounded-l-none px-2 border-l h-11.5 ${currentAction.buttonColor === 'bg-white text-slate-700 border hover:bg-slate-50' ? 'border-slate-200' : 'border-white/20'} ${currentAction.buttonColor}`}
                                                        disabled={isSubmitting}
                                                    >
                                                        <ChevronDown className="h-3.5 w-3.5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="start" className="w-[280px]">
                                                    {availableActions.map(([key, action]) => (
                                                        <DropdownMenuItem
                                                            key={key}
                                                            className="flex flex-col items-start gap-0.5 p-2 rounded-md hover:bg-slate-50 cursor-pointer"
                                                            onClick={() => setSelectedAction(key as any)}
                                                        >
                                                            <div className="flex items-center gap-1.5 font-bold text-[12px] text-slate-800">
                                                                {React.createElement(action.icon, { className: `h-3.5 w-3.5 ${action.color}` })}
                                                                {action.label}
                                                            </div>
                                                            <p className="text-[10px] text-muted-foreground leading-snug">
                                                                {action.description}
                                                            </p>
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar: Details, Metadata, Files */}
                <div className="lg:col-span-1 space-y-5">
                    {/* Participant */}
                    <Card className="shadow-none border-slate-200">
                        <CardHeader className="p-4 bg-slate-50/50 border-b">
                            <CardTitle className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Autor del Trabajo</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-center gap-2.5">
                                <Avatar className="h-9 w-9 border">
                                    <AvatarFallback className="text-xs bg-primary/10 text-primary uppercase font-bold">
                                        {submission.profile?.first_name?.charAt(0)}{submission.profile?.last_name?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0">
                                    <p className="font-semibold text-slate-800 text-xs truncate">{submission.profile?.first_name} {submission.profile?.last_name}</p>
                                    <p className="text-[10px] text-muted-foreground flex items-center gap-1 truncate"><Mail className="h-3 w-3" /> {submission.profile?.email}</p>
                                </div>
                            </div>
                            <hr className="border-slate-100" />
                            <div>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Institución</span>
                                <p className="text-xs font-medium text-slate-700 mt-0.5">{submission.profile?.institution || 'Sin institución'}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Files */}
                    <Card className="shadow-none border-slate-200">
                        <CardHeader className="p-4 bg-slate-50/50 border-b flex flex-row items-center justify-between">
                            <CardTitle className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Documentos Subidos</CardTitle>
                            {submission.is_admin_upload && !isAddingFile && (
                                <Button variant="ghost" size="sm" className="h-6 text-[10px] text-primary px-2 hover:bg-primary/5" onClick={() => setIsAddingFile(true)}>
                                    <Plus className="h-2.5 w-2.5 mr-1" /> Agregar
                                </Button>
                            )}
                        </CardHeader>
                        <CardContent className="p-3 space-y-2">
                            {submission.files && submission.files.length > 0 ? (
                                submission.files.map((file) => (
                                    <div key={file.id} className="flex items-center justify-between p-2.5 border rounded-lg hover:bg-slate-50/50 transition-all">
                                        <div className="flex items-center gap-2 min-w-0 flex-1">
                                            <div className="p-1.5 bg-primary/10 rounded-md text-primary flex-none"><FileText className="h-4 w-4" /></div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-slate-800 truncate max-w-[130px]" title={file.file_name}>{file.file_name}</p>
                                                <Badge variant="outline" className="text-[9px] px-1 shadow-none text-muted-foreground mt-0.5 capitalize font-medium h-5">{file.document_type || 'General'}</Badge>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 hover:text-primary transition-colors">
                                                <Download className="h-4 w-4" />
                                            </a>
                                            {submission.is_admin_upload && (
                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-md" onClick={() => setFileToDeleteId(file.id)} disabled={isUpdatingFile}>
                                                    <Trash className="h-3.5 w-3.5" />
                                                </Button>
                                            )}

                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[11px] text-muted-foreground text-center py-2">No hay archivos cargados.</p>
                            )}

                            {isAddingFile && (
                                <div className="border border-slate-200 rounded-lg p-3 space-y-2.5 bg-slate-50/50 mt-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-slate-700 uppercase">Nuevo Soporte</span>
                                        <Button variant="ghost" size="sm" onClick={() => setIsAddingFile(false)} className="h-5 text-[9px] px-1.5">Cancelar</Button>
                                    </div>

                                    <div className="flex gap-1.5">
                                        <Button type="button" variant={newFileType === 'file' ? 'default' : 'outline'} size="sm" className="text-[10px] h-6 px-2" onClick={() => setNewFileType('file')}>
                                            <UploadCloud className="h-2.5 w-2.5 mr-0.5" /> Archivo
                                        </Button>
                                        <Button type="button" variant={newFileType === 'link' ? 'default' : 'outline'} size="sm" className="text-[10px] h-6 px-2" onClick={() => setNewFileType('link')}>
                                            <Link2 className="h-2.5 w-2.5 mr-0.5" /> Link
                                        </Button>
                                    </div>

                                    <div className="grid gap-1">
                                        <Label className="text-[10px] font-medium text-slate-600">Tipo de Documento</Label>
                                        <Select value={newFileDocType} onValueChange={setNewFileDocType}>
                                            <SelectTrigger className="h-7 text-[10px] bg-white">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="abstract" className="text-xs">Abstract / Resumen</SelectItem>
                                                <SelectItem value="paper" className="text-xs">Paper Completo / Artículo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {newFileType === 'file' ? (
                                        <div className="grid gap-1">
                                            <div
                                                className={`border border-dashed rounded-md p-2 flex flex-col items-center justify-center gap-1 cursor-pointer bg-white hover:bg-slate-50 ${newFile ? 'border-primary' : 'border-slate-200'}`}
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <UploadCloud className={`h-3.5 w-3.5 ${newFile ? 'text-primary' : 'text-slate-400'}`} />
                                                <span className="text-[9px] font-medium text-slate-600 text-center truncate w-full max-w-[140px]">
                                                    {newFile ? newFile.name : 'Subir archivo'}
                                                </span>
                                            </div>
                                            <input type="file" className="hidden" ref={fileInputRef} onChange={(e) => setNewFile(e.target.files?.[0] || null)} />
                                        </div>
                                    ) : (
                                        <div className="grid gap-1">
                                            <Label htmlFor="link" className="text-[10px] font-medium text-slate-600">Link / URL de Referencia</Label>
                                            <Input id="link" placeholder="https://..." value={newLinkUrl} onChange={e => setNewLinkUrl(e.target.value)} className="h-7 text-[10px] bg-white" />
                                        </div>
                                    )}

                                    <Button className="w-full text-[10px] h-7" onClick={handleAddFile} disabled={isUpdatingFile}>
                                        {isUpdatingFile ? 'Guardando...' : 'Agregar'}
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                </div>
            </div>
            {/* Modal de Confirmación para eliminar */}
            <AlertDialog open={!!fileToDeleteId} onOpenChange={(open) => !open && setFileToDeleteId(null)}>
                <AlertDialogContent className="rounded-2xl max-w-sm">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-sm font-bold text-slate-800">¿Eliminar documento?</AlertDialogTitle>
                        <AlertDialogDescription className="text-xs text-slate-500">
                            Esta acción no se puede deshacer. Se removerá el archivo de este trabajo permanentemente de los registros.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2">
                        <AlertDialogCancel className="h-8 text-xs rounded-xl">Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteFile} className="h-8 text-xs rounded-xl bg-rose-600 hover:bg-rose-700 text-white">
                            Confirmar Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

