'use client'

import { useState, useTransition, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'react-toastify'
import {
    IconSearch,
    IconLoader2,
    IconUserPlus,
    IconX,
    IconCircleCheck,
    IconUser
} from '@tabler/icons-react'
import { assignRole, removeRole } from '../roles-actions'
import { getUsersWithRoles } from '../roles-actions'
import { IRole } from '@/types/roles'
import { useRouter } from '@/i18n/routing'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { IModule } from '../roles-permissions-actions'
import { getUser } from '@/utils/functions'

interface GlobalUserRoleAssignerProps {
    allRoles: IRole[]
    allModules: IModule[]
}

export function GlobalUserRoleAssigner({ allRoles, allModules }: GlobalUserRoleAssignerProps) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')
    const [users, setUsers] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null)

    // Assignment State
    const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<any | null>(null)
    const [assignmentRole, setAssignmentRole] = useState<string>('')
    const [assignmentModule, setAssignmentModule] = useState<string>('global')

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchUsers()
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchQuery])

    useEffect(() => {
        const fetchCurrentUserEmail = async () => {
            const data = await getUser()
            if (data?.user?.email) {
                setCurrentUserEmail(data.user.email)
            }
        }
        fetchCurrentUserEmail()
    }, [])

    const fetchUsers = async () => {
        setIsLoading(true)
        const data = await getUsersWithRoles(searchQuery)
        setUsers(data)
        setIsLoading(false)
    }

    const openAssignDialog = (user: any) => {
        setSelectedUser(user)
        setAssignmentRole('')
        setAssignmentModule('global')
        setIsAssignDialogOpen(true)
    }

    const handleConfirmAssign = () => {
        if (!selectedUser || !assignmentRole) return

        startTransition(async () => {
            const result = await assignRole(
                selectedUser.id,
                assignmentRole,
                undefined, // handled by server action
                assignmentModule === 'global' ? undefined : assignmentModule
            )

            if (result.success) {
                toast.success('Rol asignado correctamente')
                setIsAssignDialogOpen(false)
                fetchUsers()
                router.refresh()
            } else {
                toast.error(result.error)
            }
        })
    }

    const handleRemove = (profileId: string, roleId: string, moduleId?: string) => {
        startTransition(async () => {
            const result = await removeRole(profileId, roleId, moduleId)
            if (result.success) {
                toast.success('Rol removido')
                fetchUsers()
                router.refresh()
            } else {
                toast.error(result.error)
            }
        })
    }


    return (
        <div className="w-full space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative w-full md:w-64">
                        <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input
                            placeholder="Buscar usuarios..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 h-9 border-slate-200 rounded-md bg-white text-sm focus-visible:ring-indigo-500 shadow-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-100 bg-slate-50/20">
                    <div className="col-span-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Member</div>
                    <div className="col-span-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Status</div>
                    <div className="col-span-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Role</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-slate-100">
                    {isLoading ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-3">
                            <IconLoader2 size={32} className="animate-spin text-slate-200" />
                            <p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold font-mono">Loading team members...</p>
                        </div>
                    ) : users.length > 0 ? (
                        users.map((user) => (
                            <div key={user.id} className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-slate-50/40 transition-colors group">
                                <div className="col-span-5 flex items-center gap-4">
                                    <Avatar className="h-10 w-10 border border-slate-100 bg-white">
                                        <AvatarImage src={user.avatar_url} />
                                        <AvatarFallback className="bg-white text-slate-300">
                                            <IconUser size={20} />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[13px] font-semibold text-slate-900 truncate">
                                                {user.first_name} {user.last_name}
                                            </span>
                                            {
                                                user.email === currentUserEmail && (
                                                    <span className="text-[9px] font-bold text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded uppercase tracking-tighter bg-white">YOU</span>
                                                )
                                            }
                                        </div>
                                        <span className="text-[11px] text-slate-400 truncate">{user.email}</span>
                                    </div>
                                </div>

                                <div className="col-span-3">
                                    <div className="flex items-center gap-2 text-[12px] font-medium text-slate-500 uppercase tracking-tighter">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <span>Active</span>
                                    </div>
                                </div>

                                <div className="col-span-4 flex items-center justify-between">
                                    <div className="flex flex-wrap gap-1.5 min-w-0 flex-1 pr-4">
                                        {user.user_roles?.length > 0 ? (
                                            user.user_roles.map((ur: any) => (
                                                <div
                                                    key={ur.id}
                                                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-200 uppercase tracking-tight"
                                                >
                                                    <span>{ur.roles?.name}</span>
                                                    {ur.modules && (
                                                        <span className="text-[9px] text-slate-400 border-l border-slate-200 pl-1.5">
                                                            {ur.modules.name}
                                                        </span>
                                                    )}
                                                    <button
                                                        onClick={() => handleRemove(user.id, ur.role_id, ur.module_id)}
                                                        className="hover:text-red-600 transition-colors ml-1 border-l border-slate-200 pl-1"
                                                        disabled={isPending}
                                                    >
                                                        <IconX size={10} />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <button 
                                                onClick={() => openAssignDialog(user)}
                                                className="h-8 px-3 rounded border-slate-200 bg-white text-[10px] font-bold text-slate-400 hover:border-slate-400 hover:text-slate-600 transition-all uppercase tracking-widest"
                                            >
                                                Asignar Rol
                                            </button>
                                        )}

                                        {user.user_roles?.length > 0 && (
                                            <button
                                                onClick={() => openAssignDialog(user)}
                                                className="h-6 w-6 rounded-full border-dashed border-slate-300 flex items-center justify-center p-0 hover:border-slate-500 transition-colors"
                                            >
                                                <IconUserPlus size={12} className="text-slate-400" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-20 text-center italic text-slate-400 text-sm">
                            No se encontraron miembros en este equipo.
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100">
                    <span className="text-xs text-slate-400 font-medium">
                        {users.length} {users.length === 1 ? 'miembro' : 'miembros'}
                    </span>
                </div>
            </div>

            {/* Assignment Dialog */}
            <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
                <DialogContent className="sm:max-w-[400px] rounded-2xl border-none p-0 overflow-hidden shadow-2xl">
                    <DialogHeader className="p-6 pb-0">
                        <DialogTitle className="text-lg font-bold text-slate-900 uppercase tracking-tight">Asignación de Acceso</DialogTitle>
                        <DialogDescription className="text-xs italic text-slate-500">
                            Configura el alcance del nuevo rol para {selectedUser?.email}.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="p-6 space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] pl-1">Seleccionar Perfil</label>
                                <Select value={assignmentRole} onValueChange={setAssignmentRole}>
                                    <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-slate-50/50 text-slate-700">
                                        <SelectValue placeholder="Busca un rol..." />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-slate-100">
                                        {allRoles.map(r => (
                                            <SelectItem key={r.id} value={r.id} className="text-xs">{r.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] pl-1">Alcance del Acceso (Opcional)</label>
                                <Select value={assignmentModule} onValueChange={setAssignmentModule}>
                                    <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-white text-slate-700">
                                        <SelectValue placeholder="Acceso Global" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-slate-100">
                                        <SelectItem value="global" className="text-xs font-bold text-indigo-600">Acceso Global del Sistema</SelectItem>
                                        {allModules.map(m => (
                                            <SelectItem key={m.id} value={m.id} className="text-xs">{m.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <p className="text-[10px] text-slate-400 italic mt-1 leading-tight">
                                    {assignmentModule === 'global' 
                                        ? 'Este rol se aplicará a toda la organización.' 
                                        : `Este rol solo será válido dentro del módulo "${allModules.find(m => m.id === assignmentModule)?.name}".`}
                                </p>
                            </div>
                        </div>

                        <Button
                            className="w-full h-11 bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg transition-all"
                            onClick={handleConfirmAssign}
                            disabled={isPending || !assignmentRole}
                        >
                            {isPending ? <IconLoader2 className="animate-spin" size={18} /> : 'Confirmar Asignación'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
