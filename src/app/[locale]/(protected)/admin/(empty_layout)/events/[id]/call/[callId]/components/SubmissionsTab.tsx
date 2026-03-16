'use client'

import { DynamicTable, Column } from '@/components/general/DataTable/DynamicTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IconExternalLink, IconFileText, IconCircleFilled } from '@tabler/icons-react'
import { Link } from '@/i18n/routing'
import { EventSubmission, SubmissionStatus } from '@/types/submissions'

interface SubmissionsTabProps {
    submissions: EventSubmission[]
}

const statusConfig: Record<SubmissionStatus, { label: string, color: string, badge: string }> = {
    draft: { label: 'Borrador', color: 'text-slate-400', badge: 'bg-slate-100/80 text-slate-700 border-slate-200' },
    submitted: { label: 'Presentado', color: 'text-blue-500', badge: 'bg-blue-50 text-blue-700 border-blue-200' },
    under_review: { label: 'En Revisión', color: 'text-yellow-500', badge: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    changes_requested: { label: 'Cambios Solicitados', color: 'text-orange-500', badge: 'bg-orange-50 text-orange-700 border-orange-200' },
    approved: { label: 'Aprobado', color: 'text-green-500', badge: 'bg-green-50 text-green-700 border-green-200' },
    rejected: { label: 'Rechazado', color: 'text-red-500', badge: 'bg-red-50 text-red-700 border-red-200' },
}

export function SubmissionsTab({ submissions }: SubmissionsTabProps) {
    const columns: Column<EventSubmission>[] = [
        {
            header: 'Título del Trabajo',
            className: 'min-w-[300px]',
            render: (sub) => (
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-blue-50 rounded-lg text-blue-500 flex-shrink-0">
                        <IconFileText size={16} />
                    </div>
                    <span className="font-semibold text-[13px] text-slate-800 line-clamp-1 max-w-[280px]">
                        {sub.title}
                    </span>
                </div>
            )
        },
        {
            header: 'Autor / Participante',
            render: (sub) => {
                const profile = sub.profile
                const fullName = `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() || 'Sin nombre'
                return (
                    <div className="flex flex-col">
                        <span className="font-medium text-[12px] text-slate-800 leading-tight mb-0.5">{fullName}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{profile?.email || '-'}</span>
                    </div>
                )
            }
        },
        {
            header: 'Estado',
            render: (sub) => {
                const config = statusConfig[sub.status] || { label: sub.status, color: 'text-slate-400', badge: 'bg-slate-50' }
                return (
                    <div className="flex items-center">
                        <Badge 
                            variant="outline" 
                            className={`rounded-full px-2 py-0 h-5 text-[10px] font-bold uppercase tracking-tight flex items-center gap-1 ${config.badge}`}
                        >
                            <IconCircleFilled size={8} className={`${config.color}`} />
                            {config.label}
                        </Badge>
                    </div>
                )
            }
        },
        {
            header: 'Archivos',
            render: (sub) => {
                const count = sub.files?.length || 0
                return (
                    <span className="text-xs text-slate-500 font-medium">
                        {count} {count === 1 ? 'Archivo' : 'Archivos'}
                    </span>
                )
            }
        },
        {
            header: 'Revisión',
            headerClassName: 'text-right',
            cellClassName: 'text-right',
            render: (sub) => (
                <Link href={`/admin/submissions/${sub.id}`} target="_blank" rel="noopener noreferrer" className="inline-block ml-auto">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 gap-1 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-100/50 transition-colors text-xs font-semibold"
                    >
                        <IconExternalLink size={16} />
                        Revisar
                    </Button>
                </Link>
            )
        }
    ]

    return (
        <div className="flex flex-col gap-4">
            <DynamicTable
                data={submissions}
                columns={columns as any}
                emptyMessage="No se encontraron postulaciones registradas"
            />
        </div>
    )
}
