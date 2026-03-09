'use client'

import { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { IParticipant } from '@/types/participant'
import { IconDatabaseOff, IconExternalLink, IconTrash } from '@tabler/icons-react'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import { deleteParticipantRegistration } from '../actions'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

interface ParticipantTableProps {
    participants: IParticipant[]
    showEventInfo?: boolean
}

export function ParticipantTable({ participants, showEventInfo = true }: ParticipantTableProps) {
    const locale = useLocale()
    const router = useRouter()
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [deleteName, setDeleteName] = useState<string>('')

    const handleDelete = async () => {
        if (!deleteId) return

        const result = await deleteParticipantRegistration(deleteId)
        if (result.success) {
            toast.success('Participante eliminado correctamente')
            router.refresh()
        } else {
            toast.error(result.error || 'Error al eliminar')
        }
        setDeleteId(null)
    }

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent className="rounded-2xl border-slate-200">
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción eliminará el registro de <span className="font-bold text-slate-900">"{deleteName}"</span> de este evento.
                            No se eliminará el perfil de la base de datos, solo su participación actual.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
                        >
                            Quitar Participante
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead className="pl-6 h-12">Participante</TableHead>
                        <TableHead className="h-12">Rol</TableHead>
                        {showEventInfo && <TableHead className="h-12">Evento / Edición</TableHead>}
                        <TableHead className="h-12 text-right pr-6">Registro</TableHead>
                        <TableHead className="h-12 w-[60px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {participants && participants.length > 0 ? (
                        participants.map((participant) => {
                            const profile = participant.profiles
                            const role = participant.participant_roles
                            const fullName = `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() || 'No asignado o sin nombre'
                            const initial = fullName.charAt(0).toUpperCase()
                            const roleName = locale === 'es' ? role?.name?.es : role?.name?.en

                            return (
                                <TableRow key={participant.id} className="hover:bg-muted/30">
                                    <TableCell className="pl-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9 border shadow-sm">
                                                <AvatarImage src={profile?.avatar_url || ''} alt={fullName} />
                                                <AvatarFallback className="bg-slate-100 text-slate-600 font-bold text-xs">
                                                    {initial}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-sm leading-none mb-1">{fullName}</span>
                                                <div className="flex flex-col gap-0.5 mt-0.5">
                                                    <span className="text-[10px] text-muted-foreground">{profile?.email || 'S/E'}</span>
                                                    {profile?.institution && (
                                                        <span className="text-[9px] text-primary/70 font-medium truncate max-w-[150px]">
                                                            {profile.institution}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        {role ? (
                                            <Badge
                                                variant="outline"
                                                className="font-medium text-[10px] px-2 py-0 border-transparent shadow-none"
                                                style={{
                                                    backgroundColor: role.badge_color ? `${role.badge_color}15` : '#f1f5f9',
                                                    color: role.badge_color || '#475569',
                                                    borderColor: role.badge_color ? `${role.badge_color}30` : '#e2e8f0'
                                                }}
                                            >
                                                {roleName || role.slug}
                                            </Badge>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">Normal</span>
                                        )}
                                    </TableCell>
                                    {showEventInfo && (
                                        <TableCell className="py-4 text-xs">
                                            <div className="flex flex-col max-w-[200px]">
                                                <span className="font-medium truncate">{participant.main_events?.name || 'Evento general'}</span>
                                                {participant.editions && (
                                                    <span className="text-[10px] text-muted-foreground">
                                                        {locale === 'es' ? participant.editions.name?.es : participant.editions.name?.en} ({participant.editions.year})
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                    )}
                                    <TableCell className="py-4 text-right pr-6 text-[10px] text-muted-foreground tabular-nums">
                                        {new Date(participant.created_at).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </TableCell>
                                    <TableCell className="py-4 pr-3">
                                        <div className="flex items-center gap-1 justify-end">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 rounded-xl text-muted-foreground hover:bg-slate-100 hover:text-primary"
                                                asChild
                                            >
                                                <a
                                                    href={`/${locale}/admin/users/${profile?.id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center"
                                                >
                                                    <IconExternalLink size={15} />
                                                </a>
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    setDeleteId(participant.id)
                                                    setDeleteName(fullName)
                                                }}
                                                className="h-8 w-8 rounded-xl text-muted-foreground hover:bg-red-50 hover:text-red-600"
                                            >
                                                <IconTrash size={15} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={showEventInfo ? 5 : 4} className="h-[300px] text-center">
                                <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
                                    <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
                                        <IconDatabaseOff size={24} className="opacity-60" />
                                    </div>
                                    <p className="text-[15px] font-medium mt-2">No se encontraron participantes</p>
                                    <p className="text-sm max-w-[300px] text-center mx-auto opacity-70">
                                        Los participantes aparecerán aquí una vez que sus inscripciones o formularios sean aprobados.
                                    </p>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
