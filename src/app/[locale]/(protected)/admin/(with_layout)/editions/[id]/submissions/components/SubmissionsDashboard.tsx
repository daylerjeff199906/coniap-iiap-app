'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Settings, Eye, Clock, Calendar, FileText, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { EventSubmission, SubmissionStatus } from '@/types/submissions';
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
    onReviewClick: (submission: EventSubmission) => void;
}

const statusConfig: Record<SubmissionStatus, { label: string, color: string, icon: React.ReactNode }> = {
    draft: { label: 'Borrador', color: 'bg-slate-500 hover:bg-slate-600', icon: <FileText className="h-4 w-4" /> },
    submitted: { label: 'Presentado', color: 'bg-blue-500 hover:bg-blue-600', icon: <Clock className="h-4 w-4" /> },
    under_review: { label: 'En Revisión', color: 'bg-yellow-500 hover:bg-yellow-600 text-black', icon: <Settings className="h-4 w-4" /> },
    changes_requested: { label: 'Cambios Solicitados', color: 'bg-orange-500 hover:bg-orange-600', icon: <AlertTriangle className="h-4 w-4" /> },
    approved: { label: 'Aprobado', color: 'bg-green-600 hover:bg-green-700', icon: <CheckCircle2 className="h-4 w-4" /> },
    rejected: { label: 'Rechazado', color: 'bg-red-600 hover:bg-red-700', icon: <XCircle className="h-4 w-4" /> },
};

export function SubmissionsDashboard({ submissions, onReviewClick }: SubmissionsDashboardProps) {
    const [selectedStatus, setSelectedStatus] = React.useState<string>('all');
    const [filterQuery, setFilterQuery] = React.useState('');

    const filteredSubmissions = submissions.filter((sub) => {
        const matchesStatus = selectedStatus === 'all' || sub.status === selectedStatus;
        const matchesQuery = sub.title.toLowerCase().includes(filterQuery.toLowerCase()) || 
                             (sub.profile?.first_name && sub.profile.first_name.toLowerCase().includes(filterQuery.toLowerCase()));
        return matchesStatus && matchesQuery;
    });

    const statusCounts = submissions.reduce((acc, sub) => {
        acc[sub.status] = (acc[sub.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                {/* Filtros Status */}
                <div className="flex gap-2 flex-wrap">
                    <Button 
                        variant={selectedStatus === 'all' ? 'default' : 'outline'} 
                        size="sm" 
                        onClick={() => setSelectedStatus('all')}
                        className="rounded-full text-xs"
                    >
                        Todos ({submissions.length})
                    </Button>
                    {Object.entries(statusConfig).map(([key, config]) => {
                        const count = statusCounts[key] || 0;
                        if (count === 0) return null;

                        return (
                            <Button
                                key={key}
                                variant={selectedStatus === key ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedStatus(key)}
                                className={`rounded-full text-xs flex items-center gap-1 ${selectedStatus === key ? config.color : ''}`}
                            >
                                {config.icon}
                                {config.label} ({count})
                            </Button>
                        );
                    })}
                </div>

                <div className="w-full md:w-64">
                    <input
                        type="search"
                        placeholder="Buscar por Título o Autor..."
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
            </div>

            {filteredSubmissions.length > 0 ? (
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="pl-6 h-12">Título del Trabajo</TableHead>
                                <TableHead className="h-12">Autor</TableHead>
                                <TableHead className="h-12">Estado</TableHead>
                                <TableHead className="h-12">Fecha</TableHead>
                                <TableHead className="text-center w-[120px] h-12 pr-6">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredSubmissions.map((submission) => {
                                const config = statusConfig[submission.status];

                                return (
                                    <TableRow 
                                        key={submission.id} 
                                        className="hover:bg-muted/30 cursor-pointer"
                                        onClick={() => onReviewClick(submission)}
                                    >
                                        <TableCell className="pl-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-[15px] leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-2 max-w-[400px]">
                                                    {submission.title}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                                        {submission.profile?.first_name?.[0]}{submission.profile?.last_name?.[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <p className="text-xs font-medium text-muted-foreground">
                                                    {submission.profile?.first_name} {submission.profile?.last_name}
                                                </p>
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
                                                    onClick={() => onReviewClick(submission)}
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
                    <p className="mt-2 text-sm text-muted-foreground">No se encontraron trabajos para este filtro.</p>
                </div>
            )}
        </div>
    );
}

