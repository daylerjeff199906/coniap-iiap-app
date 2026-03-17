'use client'

import { useState } from 'react'
import { DynamicTable, Column } from '@/components/general/DataTable/DynamicTable'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { IconFileText, IconEye, IconFileDownload, IconBrandMailgun } from '@tabler/icons-react'
import { EventSubmission } from '@/types/submissions'
import { IProfile } from '@/types/profile'

interface ParticipantsTabProps {
    submissions: EventSubmission[]
}

export function ParticipantsTab({ submissions }: ParticipantsTabProps) {
    const [selectedParticipant, setSelectedParticipant] = useState<IProfile | null>(null)
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    // Extract unique profiles from submissions
    const uniqueProfilesMap = new Map<string, IProfile>()
    submissions.forEach(s => {
        if (s.profile) {
            uniqueProfilesMap.set(s.profile.id, s.profile)
        }
    })
    const participants = Array.from(uniqueProfilesMap.values())

    // Get submissions for a specific participant
    const getSubmissionsForParticipant = (profileId: string) => {
        return submissions.filter(s => s.profile_id === profileId)
    }

    const columns: Column<IProfile>[] = [
        {
            header: 'Participante',
            className: 'min-w-[280px]',
            render: (profile) => {
                const fullName = `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() || 'Sin nombre'
                const initial = fullName.charAt(0).toUpperCase() || 'P'
                return (
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-slate-100">
                            {profile?.avatar_url ? (
                                <img
                                    src={profile.avatar_url}
                                    alt={fullName}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none'
                                    }}
                                />
                            ) : null}
                            <AvatarFallback>
                                {initial}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="font-medium text-[13px] text-slate-900 leading-none mb-1">{fullName}</span>
                            <span className="text-[11px] text-slate-400 font-medium leading-none">{profile?.email || 'Sin correo'}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            header: 'Institución',
            render: (profile) => (
                <span className="text-xs text-slate-600 font-medium">
                    {profile?.institution || 'Sin institución'}
                </span>
            )
        },
        {
            header: 'Postulaciones',
            render: (profile) => {
                const count = getSubmissionsForParticipant(profile.id).length
                return (
                    <Badge variant="secondary" className="rounded-full px-2 py-0 text-[11px]">
                        {count} {count === 1 ? 'Trabajo' : 'Trabajos'}
                    </Badge>
                )
            }
        },
        {
            header: 'Acciones',
            headerClassName: 'text-right',
            cellClassName: 'text-right',
            render: (profile) => (
                <button
                    onClick={() => {
                        setSelectedParticipant(profile)
                        setIsSheetOpen(true)
                    }}
                    className="h-8 px-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-1 justify-end ml-auto text-xs"
                >
                    <IconEye size={16} />
                    Ver Detalles
                </button>
            )
        }
    ]

    const participantSubmissions = selectedParticipant ? getSubmissionsForParticipant(selectedParticipant.id) : []

    return (
        <div className="flex flex-col gap-4">
            <DynamicTable
                data={participants}
                columns={columns as any}
                emptyMessage="No se encontraron participantes en esta convocatoria"
            />

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="sm:max-w-md rounded-l-2xl border-l p-0 flex flex-col h-full bg-white">
                    {selectedParticipant && (
                        <div className="flex flex-col h-full">
                            <SheetHeader className="p-6 border-b">
                                <SheetTitle className="text-slate-900 flex items-center gap-2 text-xl font-bold">
                                    Detalle del Participante
                                </SheetTitle>
                                <SheetDescription className="text-slate-500 text-xs">
                                    Información y postulaciones del usuario.
                                </SheetDescription>
                            </SheetHeader>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {/* Profile Info Card */}
                                <div className="p-4 border rounded-xl bg-slate-50 flex items-center gap-4">
                                    <Avatar className="h-12 w-12 border">
                                        {selectedParticipant.avatar_url ? (
                                            <img src={selectedParticipant.avatar_url} alt="Profile" className="h-full w-full object-cover" />
                                        ) : null}
                                        <AvatarFallback className="text-xl bg-primary/10 text-primary">
                                            {selectedParticipant.first_name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <h3 className="font-semibold text-slate-900 leading-tight">
                                            {selectedParticipant.first_name} {selectedParticipant.last_name}
                                        </h3>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                            <IconBrandMailgun size={14} /> {selectedParticipant.email}
                                        </p>
                                        <Badge variant="outline" className="text-[10px] mt-1 self-start font-medium text-blue-600 border-blue-200 bg-blue-50/50">
                                            {selectedParticipant.institution || 'Sin Institución'}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Submissions List */}
                                <div className="space-y-3">
                                    <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                                        Postulaciones ({participantSubmissions.length})
                                    </h4>

                                    {participantSubmissions.length > 0 ? (
                                        <div className="grid gap-3">
                                            {participantSubmissions.map((sub) => (
                                                <div key={sub.id} className="p-3 border rounded-xl hover:border-slate-300 transition-colors flex flex-col gap-2 bg-white shadow-sm">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className="flex items-start gap-2 min-w-0">
                                                            <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600 flex-shrink-0">
                                                                <IconFileText size={16} />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="font-semibold text-slate-900 text-xs truncate max-w-[220px]">
                                                                    {sub.title}
                                                                </p>
                                                                <p className="text-[10px] text-muted-foreground mt-0.5">
                                                                    ID: {sub.id.split('-')[0]}...
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <Badge className="text-[10px] px-1.5 rounded-full shadow-none" variant={sub.status === 'approved' ? 'default' : 'secondary'}>
                                                            {sub.status === 'approved' ? 'Aprobado' : 'Pendiente'}
                                                        </Badge>
                                                    </div>

                                                    {sub.files && sub.files.length > 0 && (
                                                        <div className="flex flex-col gap-1 mt-1 border-t pt-2">
                                                            {sub.files.map((file: any) => (
                                                                <div key={file.id} className="flex items-center justify-between text-[11px]">
                                                                    <span className="text-slate-600 truncate max-w-[200px]">{file.file_name}</span>
                                                                    <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-0.5 shrink-0">
                                                                        <IconFileDownload size={14} /> Descargar
                                                                    </a>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-muted-foreground text-center border p-4 border-dashed rounded-xl">
                                            No hay постулаcioнes registradas.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    )
}
