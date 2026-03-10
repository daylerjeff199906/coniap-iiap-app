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
import { DynamicTable, Column } from '@/components/general/DataTable/DynamicTable'
import { cn } from '@/lib/utils'

interface ParticipantTableProps {
    participants: IParticipant[]
    showEventInfo?: boolean
    isLoading?: boolean
    totalItems?: number
    currentPage?: number
    pageSize?: number
    onPageChange?: (page: number) => void
}

export function ParticipantTable({
    participants,
    showEventInfo = true,
    isLoading = false,
    totalItems,
    currentPage,
    pageSize,
    onPageChange
}: ParticipantTableProps) {
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

    const handlePageChange = (page: number) => {
        if (onPageChange) {
            onPageChange(page)
            return
        }
        const params = new URLSearchParams(window.location.search)
        params.set('page', page.toString())
        router.push(`?${params.toString()}`)
    }

    const columns: Column<IParticipant>[] = [
        {
            header: 'Participante',
            className: 'min-w-[280px]',
            render: (participant) => {
                const profile = participant.profiles
                const fullName = `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() || 'Sin nombre'
                const initial = fullName.charAt(0).toUpperCase() || 'P'
                return (
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-slate-100 shadow-sm">
                            <AvatarImage src={profile?.avatar_url || ''} alt={fullName} />
                            <AvatarFallback className="bg-slate-50 text-slate-400 font-medium text-xs">
                                {initial}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="font-medium text-[13px] text-slate-900 leading-none mb-1">{fullName}</span>
                            <span className="text-[11px] text-slate-400 font-medium leading-none">{profile?.email || 'Sin correo'}</span>
                            {profile?.institution && (
                                <span className="text-[10px] text-red-400/80 font-medium mt-1 truncate max-w-[180px]">
                                    {profile.institution}
                                </span>
                            )}
                        </div>
                    </div>
                )
            }
        },
        {
            header: 'Rol',
            render: (participant) => {
                const role = participant.participant_roles
                const roleName = locale === 'es' ? role?.name?.es : role?.name?.en
                return (
                    <div className="flex items-center">
                        {role ? (
                            <div
                                className="text-[10px] font-medium py-0 h-5 px-3 rounded-full flex items-center justify-center uppercase tracking-tight border"
                                style={{
                                    backgroundColor: role.badge_color ? `${role.badge_color}10` : '#f8fafc',
                                    color: role.badge_color || '#64748b',
                                    borderColor: role.badge_color ? `${role.badge_color}20` : '#e2e8f0'
                                }}
                            >
                                {roleName || role.slug}
                            </div>
                        ) : (
                            <div className="bg-slate-50 text-slate-400 border border-slate-100 text-[10px] font-medium py-0 h-5 px-3 rounded-full flex items-center justify-center uppercase tracking-tight">
                                Normal
                            </div>
                        )}
                    </div>
                )
            }
        },
        ...(showEventInfo ? [{
            header: 'Evento / Edición',
            className: 'min-w-[200px]',
            render: (participant: IParticipant) => (
                <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-medium text-slate-700 leading-tight">
                        {participant.main_events?.name || 'Evento general'}
                    </span>
                    {participant.editions && (
                        <span className="text-[11px] text-slate-400 font-medium italic">
                            {locale === 'es' ? participant.editions.name?.es : participant.editions.name?.en} ({participant.editions.year})
                        </span>
                    )}
                </div>
            )
        }] : []),
        {
            header: 'Registro',
            headerClassName: 'text-right',
            cellClassName: 'text-right',
            render: (participant) => (
                <div className="flex flex-col items-end gap-1 group/actions">
                    <span className="text-[11px] text-slate-500 font-medium tabular-nums">
                        {new Date(participant.created_at).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </span>
                    <div className="flex items-center gap-1.5 opacity-0 group-hover/actions:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-primary transition-colors"
                            asChild
                        >
                            <a
                                href={`/${locale}/admin/users/${participant.profiles?.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IconExternalLink size={14} />
                            </a>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                setDeleteId(participant.id)
                                const p = participant.profiles
                                setDeleteName(`${p?.first_name || ''} ${p?.last_name || ''}`)
                            }}
                            className="h-7 w-7 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                            <IconTrash size={14} />
                        </Button>
                    </div>
                </div>
            )
        }
    ]

    return (
        <div className="flex flex-col gap-4">
            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent className="rounded-2xl border-slate-200 shadow-xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-slate-900 font-semibold">¿Eliminar registro de participación?</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500 font-medium">
                            Esta acción quitará a <span className="text-slate-900 font-bold">"{deleteName}"</span> de este evento.
                            El perfil del usuario no se eliminará, solo su participación en esta edición/evento.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2">
                        <AlertDialogCancel className="rounded-xl font-medium border-slate-200">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium shadow-lg shadow-red-200"
                        >
                            Quitar Participante
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <DynamicTable
                data={participants}
                columns={columns as any}
                isLoading={isLoading}
                totalItems={totalItems}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                emptyMessage="No se encontraron participantes inscritos"
            />
        </div>
    )
}
