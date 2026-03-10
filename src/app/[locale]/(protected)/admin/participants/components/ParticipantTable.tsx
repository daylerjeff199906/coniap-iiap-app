'use client'

import { useState } from 'react'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { IParticipant } from '@/types/participant'
import { IconDatabaseOff, IconExternalLink, IconTrash, IconChevronDown } from '@tabler/icons-react'
import { useLocale } from 'next-intl'
import { deleteParticipantRegistration, updateParticipantRole } from '../actions'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { DynamicTable, Column } from '@/components/general/DataTable/DynamicTable'
import { cn } from '@/lib/utils'
import { RoleChangeModal } from './RoleChangeModal'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



interface ParticipantTableProps {
    participants: IParticipant[]
    roles?: any[]
    showEventInfo?: boolean
    isLoading?: boolean
    totalItems?: number
    currentPage?: number
    pageSize?: number
    onPageChange?: (page: number) => void
}

export function ParticipantTable({
    participants,
    roles = [],
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

    const [roleModalData, setRoleModalData] = useState<{
        isOpen: boolean
        participantId: string
        participantName: string
        currentRoleId: string
    }>({
        isOpen: false,
        participantId: '',
        participantName: '',
        currentRoleId: ''
    })

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

    const handleRoleUpdate = async (participantId: string, roleId: string) => {
        const result = await updateParticipantRole(participantId, roleId)
        if (result.success) {
            toast.success('Rol actualizado correctamente')
            router.refresh()
        } else {
            toast.error(result.error || 'Error al actualizar el rol')
        }
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
                            {profile?.institution && (
                                <span className="text-[10px] text-red-500/80 font-medium mt-1 truncate max-w-[180px]">
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
                        <button
                            onClick={() => setRoleModalData({
                                isOpen: true,
                                participantId: participant.id,
                                participantName: `${participant.profiles?.first_name || ''} ${participant.profiles?.last_name || ''}`,
                                currentRoleId: participant.role_id || ''
                            })}
                            className="outline-none focus:outline-none ring-0 focus:ring-0 group/role"
                        >
                            {role ? (
                                <div
                                    className="text-[10px] font-medium py-0 h-5 px-3 rounded-full flex items-center justify-center uppercase tracking-tight border hover:bg-slate-100 transition-colors cursor-pointer"
                                    style={{
                                        backgroundColor: role.badge_color ? `${role.badge_color}10` : '#f8fafc',
                                        color: role.badge_color || '#64748b',
                                        borderColor: role.badge_color ? `${role.badge_color}20` : '#e2e8f0'
                                    }}
                                >
                                    {roleName || role.slug}
                                    <IconChevronDown size={10} className="ml-1 opacity-40 group-hover/role:opacity-100 transition-opacity" />
                                </div>
                            ) : (
                                <div className="bg-slate-50 text-slate-400 border border-slate-100 text-[10px] font-medium py-0 h-5 px-3 rounded-full flex items-center justify-center uppercase tracking-tight hover:bg-slate-100 transition-colors cursor-pointer">
                                    Normal
                                    <IconChevronDown size={10} className="ml-1 opacity-40 group-hover/role:opacity-100 transition-opacity" />
                                </div>
                            )}
                        </button>
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
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-primary transition-colors border border-transparent hover:border-slate-100"
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
                            className="h-7 w-7 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors border border-transparent hover:border-red-100"
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

            <RoleChangeModal
                isOpen={roleModalData.isOpen}
                onClose={() => setRoleModalData(prev => ({ ...prev, isOpen: false }))}
                onConfirm={(roleId) => handleRoleUpdate(roleModalData.participantId, roleId)}
                currentRoleId={roleModalData.currentRoleId}
                roles={roles}
                userName={roleModalData.participantName}
            />

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
