'use client'

import React, { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'react-toastify'
import {
    IconShieldCheck,
    IconPlus,
    IconTrash,
    IconLoader2,
    IconCircleCheck,
    IconLock,
    IconKey,
    IconInfoCircle,
    IconX
} from '@tabler/icons-react'
import {
    createRole,
    deleteRole,
    assignPermissionToRole,
    removePermissionFromRole,
    createPermission,
    IRoleWithPermissions,
    IPermission,
    deletePermission,
    IModule
} from '../roles-permissions-actions'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from '@/i18n/routing'

interface RolesPermissionsManagerProps {
    roles: IRoleWithPermissions[]
    allPermissions: IPermission[]
    modules: IModule[]
}

export function RolesPermissionsManager({ roles, allPermissions, modules }: RolesPermissionsManagerProps) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const [selectedRoleId, setSelectedRoleId] = useState<string | null>(roles.length > 0 ? roles[0].id : null)

    const [newRoleName, setNewRoleName] = useState('')
    const [newRoleDesc, setNewRoleDesc] = useState('')
    const [isCreatingRole, setIsCreatingRole] = useState(false)

    const [newPermModuleId, setNewPermModuleId] = useState('')
    const [newPermAction, setNewPermAction] = useState('')
    const [isCreatingPerm, setIsCreatingPerm] = useState(false)

    const [roleToDelete, setRoleToDelete] = useState<string | null>(null)
    const [permToDelete, setPermToDelete] = useState<string | null>(null)

    const selectedRole = roles.find(r => r.id === selectedRoleId)

    const handleCreateRole = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newRoleName.trim()) return

        startTransition(async () => {
            const result = await createRole(newRoleName, newRoleDesc)
            if (result.success) {
                toast.success('Rol creado correctamente')
                setNewRoleName('')
                setNewRoleDesc('')
                setIsCreatingRole(false)
                router.refresh()
                if (!selectedRoleId && result.data?.id) setSelectedRoleId(result.data.id)
            } else {
                toast.error(result.error)
            }
        })
    }

    const handleDeleteRole = async (roleId: string) => {
        startTransition(async () => {
            const result = await deleteRole(roleId)
            if (result.success) {
                toast.success('Rol eliminado')
                setRoleToDelete(null)
                if (selectedRoleId === roleId) {
                    setSelectedRoleId(roles.find(r => r.id !== roleId)?.id || null)
                }
                router.refresh()
            } else {
                toast.error(result.error)
            }
        })
    }

    const handleTogglePermission = async (permissionId: string, hasPermission: boolean) => {
        if (!selectedRoleId) return

        startTransition(async () => {
            let result;
            if (hasPermission) {
                result = await removePermissionFromRole(selectedRoleId, permissionId)
                if (result.success) toast.success('Permiso removido')
            } else {
                result = await assignPermissionToRole(selectedRoleId, permissionId)
                if (result.success) toast.success('Permiso asignado')
            }

            if (!result.success) {
                toast.error(result.error)
            } else {
                router.refresh()
            }
        })
    }

    const handleCreatePermission = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newPermModuleId || !newPermAction.trim()) return

        startTransition(async () => {
            const result = await createPermission(newPermModuleId, newPermAction)
            if (result.success) {
                toast.success('Permiso registrado correctamente')
                setNewPermModuleId('')
                setNewPermAction('')
                setIsCreatingPerm(false)
                router.refresh()
            } else {
                toast.error(result.error)
            }
        })
    }

    const handleDeletePermission = async (permId: string) => {
        startTransition(async () => {
            const result = await deletePermission(permId)
            if (result.success) {
                toast.success('Acción eliminada del sistema')
                setPermToDelete(null)
                router.refresh()
            } else {
                toast.error(result.error)
            }
        })
    }

    // Group allPermissions by module
    const groupedPermissions: Record<string, { module: IModule, perms: IPermission[] }> = {}
    allPermissions.forEach(p => {
        const moduleName = p.module?.name || 'Módulo Desconocido'
        if (!groupedPermissions[moduleName]) {
            groupedPermissions[moduleName] = {
                module: p.module as IModule,
                perms: []
            }
        }
        groupedPermissions[moduleName].perms.push(p)
    })

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {/* Roles Selection Section */}
            <section className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Perfiles de Acceso</h2>
                        <p className="text-sm text-slate-500">Define roles jerárquicos y grupos de permisos operativos.</p>
                    </div>
                    <Dialog open={isCreatingRole} onOpenChange={setIsCreatingRole}>
                        <DialogTrigger asChild>
                            <Button className="h-9 px-4 rounded-md bg-slate-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-2">
                                <IconPlus size={16} />
                                Nuevo Perfil
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-xl border-none shadow-2xl p-0 overflow-hidden">
                            <DialogHeader className="p-6 pb-2">
                                <DialogTitle className="text-lg font-semibold text-slate-900">Crear Nuevo Perfil</DialogTitle>
                                <DialogDescription className="text-sm">Define un nuevo rol administrativo.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreateRole} className="p-6 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-widest">Nombre del Rol</label>
                                    <Input
                                        placeholder="Ej: Administrador"
                                        value={newRoleName}
                                        onChange={e => setNewRoleName(e.target.value)}
                                        className="h-10 rounded-md border-slate-200"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-widest">Descripción</label>
                                    <Input
                                        placeholder="Descripción breve..."
                                        value={newRoleDesc}
                                        onChange={e => setNewRoleDesc(e.target.value)}
                                        className="h-10 rounded-md border-slate-200"
                                    />
                                </div>
                                <Button type="submit" className="w-full h-11 bg-slate-900 hover:bg-black text-white font-semibold rounded-md" disabled={isPending}>
                                    {isPending ? <IconLoader2 className="animate-spin" size={18} /> : 'Registrar Perfil'}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
                    {roles.length > 0 ? (
                        roles.map((role) => (
                            <div
                                key={role.id}
                                onClick={() => setSelectedRoleId(role.id)}
                                className={cn(
                                    "p-5 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between h-36",
                                    selectedRoleId === role.id
                                        ? "border-slate-900 bg-white ring-1 ring-slate-900 shadow-sm"
                                        : "border-slate-200 bg-white hover:border-slate-400"
                                )}
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-[13px] font-bold uppercase tracking-wide truncate max-w-[120px] text-slate-900">
                                            {role.name}
                                        </h4>
                                        {selectedRoleId === role.id && <IconCircleCheck size={18} className="text-slate-900" />}
                                    </div>
                                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed italic">
                                        {role.description || 'Sin descripción detallada.'}
                                    </p>
                                </div>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest">
                                        {role.permissions?.length || 0} Acciones
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setRoleToDelete(role.id)
                                        }}
                                        className="p-1 rounded text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                                        disabled={isPending}
                                    >
                                        <IconTrash size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-10 text-center border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/20">
                            <p className="text-xs text-slate-400">No hay perfiles configurados.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Matrix Section */}
            <section className="space-y-8 pt-10 border-t border-slate-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
                    <div className="space-y-1">
                        <h3 className="text-xl font-semibold text-slate-900 tracking-tight flex items-center gap-3">
                            Matriz de Permisos
                            {selectedRole && <span className="text-xs font-bold text-slate-400 border border-slate-200 px-2 py-0.5 rounded uppercase tracking-tighter bg-slate-50">{selectedRole.name}</span>}
                        </h3>
                        <p className="text-sm text-slate-500">Configura el alcance operativo de cada perfil en el sistema.</p>
                    </div>

                    <Dialog open={isCreatingPerm} onOpenChange={setIsCreatingPerm}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="h-9 px-4 rounded-md border-slate-200 text-xs font-semibold hover:bg-slate-50 flex items-center gap-2">
                                <IconKey size={16} className="text-slate-400" />
                                Nueva Acción
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-xl border-none shadow-2xl p-0 overflow-hidden">
                            <DialogHeader className="p-6 pb-2">
                                <DialogTitle className="text-lg font-semibold text-slate-900">Nueva Capacidad del Sistema</DialogTitle>
                                <DialogDescription className="text-sm">Define una acción técnica dentro de un módulo.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreatePermission} className="p-6 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-widest">Módulo Destino</label>
                                    <Select value={newPermModuleId} onValueChange={setNewPermModuleId}>
                                        <SelectTrigger className="h-10 rounded-md border-slate-200">
                                            <SelectValue placeholder="Selecciona..." />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-lg">
                                            {modules.map(m => (
                                                <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-widest pl-1">Código de Acción (Slug)</label>
                                    <Input
                                        placeholder="Ej: create_entries"
                                        value={newPermAction}
                                        onChange={e => setNewPermAction(e.target.value)}
                                        className="h-10 font-mono rounded-md border-slate-200 bg-slate-50"
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full h-11 bg-slate-900 hover:bg-black text-white font-semibold rounded-md" disabled={isPending || !newPermModuleId}>
                                    {isPending ? <IconLoader2 className="animate-spin" size={18} /> : 'Registrar Acción'}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {!selectedRole ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-slate-100 rounded-3xl bg-slate-50/20">
                        <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-200 mb-4 shadow-sm">
                            <IconLock size={28} stroke={1.5} />
                        </div>
                        <h4 className="text-slate-900 text-sm font-semibold">Selección de Perfil Requerida</h4>
                        <p className="text-slate-400 text-xs mt-1 italic max-w-xs">Elige un perfil para ajustar sus capacidades de acceso.</p>
                    </div>
                ) : (
                    <div className="space-y-12 px-2 divide-y divide-slate-100">
                        {Object.keys(groupedPermissions).length > 0 ? (
                            Object.entries(groupedPermissions).map(([moduleName, { module, perms }]) => (
                                <div key={moduleName} className="pt-10 first:pt-0">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                                            <IconShieldCheck size={18} />
                                        </div>
                                        <div>
                                            <h5 className="text-[12px] font-bold text-slate-900 uppercase tracking-widest">{moduleName}</h5>
                                            <p className="text-[10px] text-slate-400 italic font-mono uppercase tracking-tighter">{module?.code}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {perms.map((perm) => {
                                            const hasPermission = selectedRole.permissions?.some(p => p.id === perm.id) || false
                                            return (
                                                <div
                                                    key={perm.id}
                                                    onClick={() => handleTogglePermission(perm.id, hasPermission)}
                                                    className={cn(
                                                        "group flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer relative",
                                                        hasPermission
                                                            ? "border-slate-300 bg-slate-50/50"
                                                            : "border-slate-100 bg-white hover:border-slate-200"
                                                    )}
                                                >
                                                    <Checkbox
                                                        checked={hasPermission}
                                                        className="h-4 w-4 rounded-sm border-slate-300 text-slate-900"
                                                    />
                                                    <span className={cn("text-[11px] font-bold uppercase tracking-tight truncate flex-1", hasPermission ? "text-slate-900" : "text-slate-400")}>
                                                        {perm.action}
                                                    </span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setPermToDelete(perm.id)
                                                        }}
                                                        className="p-1 rounded text-slate-200 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                    >
                                                        <IconX size={12} />
                                                    </button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 text-center text-slate-300 text-xs italic">
                                Sin acciones configuradas.
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* Confirmation Modals */}
            <AlertDialog open={!!roleToDelete} onOpenChange={o => !o && setRoleToDelete(null)}>
                <AlertDialogContent className="rounded-3xl border-none p-8">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-semibold text-slate-900">¿Eliminar perfil permanente?</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-slate-500 leading-relaxed italic">
                            Todos los usuarios que posean este rol perderán sus accesos asociados de forma inmediata.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-8 gap-3">
                        <AlertDialogCancel className="h-11 rounded-xl text-xs font-semibold border-slate-200 px-6">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => roleToDelete && handleDeleteRole(roleToDelete)}
                            className="h-11 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white border-none shadow-lg shadow-red-50 px-6"
                        >
                            Confirmar Eliminación
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={!!permToDelete} onOpenChange={o => !o && setPermToDelete(null)}>
                <AlertDialogContent className="rounded-3xl border-none p-8">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-semibold text-slate-900">¿Remover acción del sistema?</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-slate-500 leading-relaxed italic">
                            Se eliminará la capacidad de asignar esta acción a cualquier perfil administrativo.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-8 gap-3">
                        <AlertDialogCancel className="h-11 rounded-xl text-xs font-semibold border-slate-200 px-6">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => permToDelete && handleDeletePermission(permToDelete)}
                            className="h-11 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white border-none shadow-lg shadow-red-100 px-6"
                        >
                            Confirmar Baja
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

