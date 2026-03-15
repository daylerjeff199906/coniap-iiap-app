'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Settings, Clock, Calendar, FileText, CheckCircle2, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';
import { EventSubmission, SubmissionStatus } from '@/types/submissions';
import { Link } from '@/i18n/routing';

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


    return (
        <div className="space-y-6">
            {submissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {submissions.map((submission) => {
                        const config = statusConfig[submission.status];
                        return (
                            <Card key={submission.id} className="shadow hover:shadow-md transition-all border-l-4">
                                <CardHeader className="p-4 pb-2">
                                    <div className="flex justify-between items-start">
                                        <Badge className={`${config.color} text-[10px] px-2 py-0.5 rounded-full`}>{config.label}</Badge>
                                        <div className="flex items-center text-xs text-muted-foreground gap-1"><Calendar className="h-3 w-3" />{new Date(submission.created_at).toLocaleDateString()}</div>
                                    </div>
                                    <CardTitle className="text-sm font-semibold mt-2 line-clamp-2">{submission.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-2">
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6"><AvatarFallback className="text-xs">{submission.profile?.first_name?.[0]}{submission.profile?.last_name?.[0]}</AvatarFallback></Avatar>
                                            <p className="text-xs font-medium text-muted-foreground">{submission.profile?.first_name} {submission.profile?.last_name}</p>
                                        </div>
                                        <Button size="sm" variant="ghost" className="h-8 text-xs gap-1 group" asChild>
                                            <Link href={`/admin/submissions/${submission.id}`}>
                                                Revisar <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-lg bg-muted/20"><FileText className="h-10 w-10 text-muted-foreground opacity-50" /><p className="mt-2 text-sm text-muted-foreground">No se encontraron trabajos.</p></div>
            )}
        </div>
    );
}
