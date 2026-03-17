'use client';

import * as React from 'react';
import {
    MessageSquare, Download, Mail, FileText, Send, User, ArrowLeft,
    CheckCircle2, XCircle, AlertTriangle, Clock, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EventSubmission, SubmissionComment, SubmissionStatus, SubmissionHistory } from '@/types/submissions';
import { Link } from '@/i18n/routing';
import { reviewSubmission, addSubmissionComment } from '../../actions';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const statusConfig: Record<SubmissionStatus, { label: string; color: string; border: string; icon: any; iconColor: string }> = {
    draft: { label: 'Borrador', color: 'bg-slate-100 text-slate-700', border: 'border-slate-200', icon: Clock, iconColor: 'text-slate-500' },
    submitted: { label: 'Presentado', color: 'bg-blue-50 text-blue-700', border: 'border-blue-200', icon: FileText, iconColor: 'text-blue-500' },
    under_review: { label: 'En Revisión Comité', color: 'bg-amber-50 text-amber-700', border: 'border-amber-200', icon: MessageSquare, iconColor: 'text-amber-500' },
    changes_requested: { label: 'Cambios Solicitados', color: 'bg-orange-50 text-orange-700', border: 'border-orange-200', icon: AlertTriangle, iconColor: 'text-orange-500' },
    approved: { label: 'Aprobado', color: 'bg-emerald-50 text-emerald-700', border: 'border-emerald-200', icon: CheckCircle2, iconColor: 'text-emerald-500' },
    rejected: { label: 'Rechazado', color: 'bg-rose-50 text-rose-700', border: 'border-rose-200', icon: XCircle, iconColor: 'text-rose-500' },
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
        return items.sort((a, b) => a.date.getTime() - b.date.getTime());
    }, [comments, history]);

    const handleReview = async (action: 'approve' | 'reject' | 'request_changes' | 'comment') => {
        const text = justification.trim();

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
                        author: {
                            id: adminId,
                            first_name: 'Tú',
                            last_name: '(Admin)',
                            email: '',
                            avatar_url: null,
                            user_roles: [{ roles: { name: 'Admin' } }]
                        } as any
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
                    request_changes: 'changes_requested'
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
                        profile: { 
                            id: adminId, 
                            first_name: 'Tú', 
                            last_name: '(Admin)', 
                            email: '',
                            user_roles: [{ roles: { name: 'Admin' } }]
                        } as any
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

    const currentAction = actionConfigs[selectedAction];

    const availableActions = Object.entries(actionConfigs).filter(([key]) => {
        if (key === 'approve' && submission.status === 'approved') return false;
        if (key === 'request_changes' && submission.status === 'changes_requested') return false;
        if (key === 'reject' && submission.status === 'rejected') return false;
        return true;
    });

    return (
        <div className="container mx-auto p-6 space-y-6 max-w-7xl text-sm leading-6">
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
                <Badge className={`${statusConfig[submission.status].color} ${statusConfig[submission.status].border} border px-3 py-1 text-xs rounded-full shadow-none font-medium`}>
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
                                                        {item.data.author?.first_name || item.data.profile?.first_name} {item.data.author?.last_name || item.data.profile?.last_name}
                                                    </span>
                                                    {isAdmin && <Badge className="text-[9px] px-1 py-0 bg-slate-100 text-slate-600 shadow-none font-medium h-4">Admin</Badge>}
                                                    <span className="text-slate-500 font-normal text-[11px]">comentó</span>
                                                    {item.data.file?.file_name && (
                                                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-slate-50 border-slate-200 text-slate-500 flex items-center gap-0.5 ml-1 font-medium shadow-none">
                                                            <FileText className="h-2.5 w-2.5" /> Sobre: {item.data.file.file_name}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <span className="text-[11px] text-slate-400 flex items-center gap-1">
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
                                                    {item.data.profile?.first_name || 'Sistema'} {item.data.profile?.last_name || ''}
                                                </span>
                                                {isAdmin && <Badge className="text-[9px] px-1 py-0 bg-slate-100 text-slate-600 shadow-none font-medium h-4">Admin</Badge>}
                                                <span>{item.data.old_status ? 'cambió el estado de' : 'creó el trabajo con estado'}</span>
                                                {item.data.old_status && (
                                                    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${statusConfig[item.data.old_status].color} ${statusConfig[item.data.old_status].border} border-slate-200 shadow-none font-medium`}>
                                                        {statusConfig[item.data.old_status].label}
                                                    </Badge>
                                                )}
                                                {item.data.old_status && <span>a</span>}
                                                <Badge className={`text-[10px] px-1.5 py-0 font-medium ${statusConfig[item.data.new_status].color} border ${statusConfig[item.data.new_status].border} shadow-none`}>
                                                    {statusConfig[item.data.new_status].label}
                                                </Badge>
                                                <span className="text-[11px] text-slate-400 ml-auto flex items-center gap-1">
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

                        {/* Action Frame connected inside the Timeline flow alignment frame grid */}
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
                        <CardHeader className="p-4 bg-slate-50/50 border-b">
                            <CardTitle className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Documentos Subidos</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 space-y-2">
                            {submission.files && submission.files.length > 0 ? (
                                submission.files.map((file) => (
                                    <div key={file.id} className="flex items-center justify-between p-2.5 border rounded-lg hover:bg-slate-50/50 transition-all">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="p-1.5 bg-primary/10 rounded-md text-primary"><FileText className="h-4 w-4" /></div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-slate-800 truncate max-w-[130px]">{file.file_name}</p>
                                                <Badge variant="outline" className="text-[9px] px-1 shadow-none text-muted-foreground mt-0.5 capitalize font-medium">{file.document_type || 'General'}</Badge>
                                            </div>
                                        </div>
                                        <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 hover:text-primary transition-colors">
                                            <Download className="h-4 w-4" />
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[11px] text-muted-foreground text-center py-2">No hay archivos cargados.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
