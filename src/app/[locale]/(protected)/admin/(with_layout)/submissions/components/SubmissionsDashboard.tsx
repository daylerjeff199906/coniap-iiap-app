'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, Clock, Calendar, FileText, CheckCircle2, AlertTriangle, XCircle, Eye } from 'lucide-react';
import { EventSubmission, SubmissionStatus } from '@/types/submissions';
import { useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface SubmissionsDashboardProps {
    submissions: EventSubmission[];
}

const statusConfig: Record<SubmissionStatus, { label: string, color: string, icon: React.ReactNode }> = {
    draft: { label: 'Borrador', color: 'bg-slate-500 hover:bg-slate-600', icon: <FileText className="h-4 w-4" /> },
    submitted: { label: 'Presentado', color: 'bg-blue-500 hover:bg-blue-600', icon: <Clock className="h-4 w-4" /> },
    under_review: { label: 'En Revisión', color: 'bg-yellow-500 hover:bg-yellow-600 text-black', icon: <Settings className="h-4 w-4" /> },
    changes_requested: { label: 'Cambios Solicitados', color: 'bg-orange-500 hover:bg-orange-600', icon: <AlertTriangle className="h-4 w-4" /> },
    approved: { label: 'Aprobado', color: 'bg-green-600 hover:bg-green-700', icon: <CheckCircle2 className="h-4 w-4" /> },
    rejected: { label: 'Rechazado', color: 'bg-red-600 hover:bg-red-700', icon: <XCircle className="h-4 w-4" /> },
};

export function SubmissionsDashboard({ submissions }: SubmissionsDashboardProps) {
    const router = useRouter();

    return (
        <div className="space-y-6">
            {submissions.length > 0 ? (
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="pl-6 h-12">Título del Trabajo</TableHead>
                                <TableHead className="h-12">Autor</TableHead>
                                <TableHead className="h-12">Evento / Edición</TableHead>
                                <TableHead className="h-12">Estado</TableHead>
                                <TableHead className="h-12">Fecha</TableHead>
                                <TableHead className="text-center w-[120px] h-12 pr-6">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {submissions.map((submission) => {
                                const locale = useLocale();
                                const config = statusConfig[submission.status];

                                const mainEventData = (submission as any).main_events?.name;
                                const mainEvent = typeof mainEventData === 'object' && mainEventData !== null
                                    ? mainEventData?.[locale] || mainEventData?.es || '-'
                                    : mainEventData || '-';

                                const editionData = (submission as any).editions?.name;
                                const editionName = typeof editionData === 'object' && editionData !== null
                                    ? editionData?.[locale] || editionData?.es || 'Edición'
                                    : editionData || 'Edición';
                                const editionYear = (submission as any).editions?.year;
                                const edition = (submission as any).editions
                                    ? `${editionName} (${editionYear})`
                                    : '-';

                                return (
                                    <TableRow
                                        key={submission.id}
                                        className="hover:bg-muted/30 cursor-pointer"
                                        onClick={() => router.push(`/admin/submissions/${submission.id}`)}
                                    >
                                        <TableCell className="pl-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-[15px] leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-2 max-w-[350px]">
                                                    {submission.title}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarImage src={submission.profile?.avatar_url || ''} />
                                                    <AvatarFallback className="text-xs">
                                                        {submission.profile?.first_name?.[0]}{submission.profile?.last_name?.[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <p className="text-xs font-medium text-muted-foreground">
                                                    {submission.profile?.first_name} {submission.profile?.last_name}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="flex flex-col max-w-[200px]">
                                                <span className="text-sm font-medium truncate">{mainEvent}</span>
                                                <span className="text-[11px] text-muted-foreground">{edition}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <Badge className={`${config.color} text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1`}>
                                                {config.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-4 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(submission.created_at).toLocaleDateString()}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center py-4 pr-6">
                                            <div
                                                className="flex items-center justify-center gap-1"
                                                onClick={(e) => e.stopPropagation()} // Prevent row click
                                            >
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-9 w-9 rounded-lg text-slate-500 hover:text-[#0064e0] hover:bg-blue-50 transition-colors"
                                                    title="Revisar"
                                                    onClick={() => router.push(`/admin/submissions/${submission.id}`)}
                                                >
                                                    <Eye className="h-[1.1rem] w-[1.1rem]" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-lg bg-muted/20">
                    <FileText className="h-10 w-10 text-muted-foreground opacity-50" />
                    <p className="mt-2 text-sm text-muted-foreground">No se encontraron trabajos.</p>
                </div>
            )}
        </div>
    );
}

