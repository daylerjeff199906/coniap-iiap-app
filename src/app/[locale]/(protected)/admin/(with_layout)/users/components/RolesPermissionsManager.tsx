'use client'

import React, { useState, useTransition } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'react-toastify'
import { IconShieldCheck, IconPlus, IconTrash, IconLoader2, IconCircleCheck, IconLock } from '@tabler/icons-react'
import { 
    createRole, 
    deleteRole, 
    assignPermissionToRole, 
    removePermissionFromRole, 
    createPermission, 
    IRoleWithPermissions, 
    IPermission,
    deletePermission 
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
    DialogFooter,
} from "@/components/ui/dialog"
import { useRouter } from '@/i18n/routing'

interface RolesPermissionsManagerProps {
    roles: IRoleWithPermissions[]
    allPermissions: IPermission[]
}

export function RolesPermissionsManager({ roles, allPermissions }: RolesPermissionsManagerProps) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const [selectedRoleId, setSelectedRoleId] = useState<string | null>(roles.length > 0 ? roles[0].id : null)

    const [newRoleName, setNewRoleName] = useState('')
    const [newRoleDesc, setNewRoleDesc] = useState('')
    const [isCreatingRole, setIsCreatingRole] = useState(false)

    const [newPermModule, setNewPermModule] = useState('')
    const [newPermAction, setNewPermAction] = useState('')
    const [newPermDesc, setNewPermDesc] = useState('')
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
        if (!newPermModule.trim() || !newPermAction.trim()) return

        startTransition(async () => {
            const result = await createPermission(newPermModule, newPermAction, newPermDesc)
            if (result.success) {
                toast.success('Permiso creado correctamente')
                setNewPermModule('')
                setNewPermAction('')
                setNewPermDesc('')
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
                toast.success('Módulo/Acción eliminado')
                setPermToDelete(null)
                router.refresh()
            } else {
                toast.error(result.error)
            }
        })
    }

    // Group permissions by module_name
    const groupedPermissions: Record<string, IPermission[]> = {}
    allPermissions.forEach(p => {
        if (!groupedPermissions[p.module_name]) {
            groupedPermissions[p.module_name] = []
        }
        groupedPermissions[p.module_name].push(p)
    })

    return (
        <div className="flex flex-col gap-10">
            {/* Roles Section */}
            <section className="flex flex-col md:flex-row gap-8 pb-10 border-b border-slate-100">
                <div className="w-full md:w-80 shrink-0">
                    <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Perfiles y Roles</h2>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        Define los perfiles administrativos y operativos. Cada rol agrupa un conjunto de permisos que determinan el acceso a los módulos del sistema.
                    </p>
                    <Dialog open={isCreatingRole} onOpenChange={setIsCreatingRole}>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="mt-6 rounded-lg text-xs font-semibold px-4 h-9 border-slate-200 hover:bg-slate-50 flex items-center gap-2"
                            >
                                <IconPlus size={16} />
                                <span>Añadir Nuevo Rol</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] rounded-2xl">
                            <DialogHeader>
                                <DialogTitle className="text-sm font-semibold">Nuevo Perfil Organizacional</DialogTitle>
                                <DialogDescription className="text-xs">Identifica el rol por su nombre y añade una descripción breve.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreateRole} className="space-y-4 py-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">Nombre del Rol</label>
                                    <Input
                                        placeholder="Ej: Administrador, Editor, Lector"
                                        value={newRoleName}
                                        onChange={e => setNewRoleName(e.target.value)}
                                        className="h-9 text-sm rounded-lg border-slate-200"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">Descripción</label>
                                    <Input
                                        placeholder="Propósito de este rol"
                                        value={newRoleDesc}
                                        onChange={e => setNewRoleDesc(e.target.value)}
                                        className="h-9 text-sm rounded-lg border-slate-200"
                                    />
                                </div>
                                <DialogFooter className="pt-2">
                                    <Button
                                        type="submit"
                                        className="h-9 text-[11px] font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm w-full"
                                        disabled={isPending || !newRoleName.trim()}
                                    >
                                        {isPending ? <IconLoader2 className="animate-spin" size={14} /> : 'Guardar Perfil'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="flex-1 min-w-0">
                    {roles.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {roles.map((role) => (
                                <div
                                    key={role.id}
                                    onClick={() => setSelectedRoleId(role.id)}
                                    className={cn(
                                        "p-4 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between h-32",
                                        selectedRoleId === role.id 
                                            ? "border-indigo-600 bg-indigo-50/30 ring-1 ring-indigo-600/20" 
                                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                                    )}
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className={cn("text-xs font-bold uppercase tracking-wide", selectedRoleId === role.id ? "text-indigo-900" : "text-slate-900")}>
                                                {role.name}
                                            </h4>
                                            {selectedRoleId === role.id && <IconCircleCheck size={16} className="text-indigo-600" />}
                                        </div>
                                        {role.description && (
                                            <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{role.description}</p>
                                        )}
                                    </div>
                                    <div className="flex justify-end pt-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setRoleToDelete(role.id)
                                            }}
                                            disabled={isPending}
                                        >
                                            <IconTrash size={14} />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 border border-slate-200 border-dashed rounded-xl">
                            <p className="text-xs text-slate-400 italic">No hay roles definidos aún.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Permissions Section */}
            <section className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-80 shrink-0">
                    <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Matriz de Permisos</h2>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        Configura las capacidades específicas de cada rol. Puedes activar o desactivar el acceso a módulos completos o acciones individuales.
                    </p>
                    
                    {selectedRole && (
                        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Rol Editando:</span>
                            <div className="flex items-center gap-2 mt-1">
                                <IconShieldCheck size={16} className="text-indigo-600" />
                                <span className="text-sm font-semibold text-slate-900">{selectedRole.name}</span>
                            </div>
                        </div>
                    )}

                    <Dialog open={isCreatingPerm} onOpenChange={setIsCreatingPerm}>
                        <DialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="mt-4 rounded-lg text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-0 h-auto flex items-center gap-2"
                            >
                                <IconPlus size={14} />
                                <span>Registrar Nuevo Módulo/Acción</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md rounded-2xl">
                            <DialogHeader>
                                <DialogTitle className="text-sm font-semibold">Nuevo Módulo / Acción</DialogTitle>
                                <DialogDescription className="text-xs">Añade módulos al sistema que luego podrás asignar a roles.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreatePermission} className="space-y-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">Módulo</label>
                                        <Input
                                            placeholder="Ej: taxonomía"
                                            value={newPermModule}
                                            onChange={e => setNewPermModule(e.target.value)}
                                            className="h-9 text-sm rounded-lg border-slate-200"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">Acción</label>
                                        <Input
                                            placeholder="Ej: create, read"
                                            value={newPermAction}
                                            onChange={e => setNewPermAction(e.target.value)}
                                            className="h-9 text-sm rounded-lg border-slate-200"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">Descripción</label>
                                    <Input
                                        placeholder="Descripción técnica del permiso"
                                        value={newPermDesc}
                                        onChange={e => setNewPermDesc(e.target.value)}
                                        className="h-9 text-sm rounded-lg border-slate-200"
                                    />
                                </div>
                                <DialogFooter>
                                    <Button
                                        type="submit"
                                        className="h-9 text-[11px] font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm w-full"
                                        disabled={isPending || !newPermModule.trim() || !newPermAction.trim()}
                                    >
                                        {isPending ? <IconLoader2 className="animate-spin" size={14} /> : 'Registrar Módulo'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="flex-1 min-w-0">
                    {!selectedRole ? (
                        <div className="flex flex-col items-center justify-center p-16 text-center border border-slate-200 border-dashed rounded-xl bg-slate-50/30">
                            <IconLock size={40} className="text-slate-200 mb-4" />
                            <h3 className="text-slate-600 font-medium text-sm">Selecciona un Rol</h3>
                            <p className="text-slate-400 text-xs mt-1 max-w-sm">Haz clic en uno de los roles superiores para habilitar la edición de su matriz de permisos.</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="space-y-10">
                                {Object.entries(groupedPermissions).map(([moduleName, perms]) => (
                                    <div key={moduleName} className="space-y-4">
                                        <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                                            <IconShieldCheck className="text-indigo-600" size={18} />
                                            <h5 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">{moduleName}</h5>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {perms.map((perm) => {
                                                const hasPermission = selectedRole.permissions?.some(p => p.id === perm.id) || false
                                                return (
                                                    <div
                                                        key={perm.id}
                                                        onClick={() => handleTogglePermission(perm.id, hasPermission)}
                                                        className={cn(
                                                            "flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer bg-white group",
                                                            hasPermission 
                                                                ? "border-indigo-100 bg-indigo-50/20" 
                                                                : "border-slate-100 hover:border-slate-200 hover:bg-slate-50/50"
                                                        )}
                                                    >
                                                        <Checkbox
                                                            id={perm.id}
                                                            checked={hasPermission}
                                                            onCheckedChange={() => handleTogglePermission(perm.id, hasPermission)}
                                                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 mt-0.5"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs font-bold text-slate-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 uppercase tracking-tighter">
                                                                    {perm.action}
                                                                </span>
                                                                <div className="flex items-center gap-1.5">
                                                                    {hasPermission && <IconCircleCheck size={14} className="text-indigo-600" />}
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation()
                                                                            setPermToDelete(perm.id)
                                                                        }}
                                                                        className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                                    >
                                                                        <IconTrash size={12} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            {perm.description && (
                                                                <p className="text-[10px] text-slate-400 mt-1 leading-normal group-hover:text-slate-500">{perm.description}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Confirm Removal Role Dialog */}
            <AlertDialog open={!!roleToDelete} onOpenChange={(open) => !open && setRoleToDelete(null)}>
                <AlertDialogContent className="rounded-2xl border-slate-200 bg-white shadow-2xl p-6">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-base font-semibold text-slate-900">¿Confirmar eliminación de Rol?</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-slate-500 mt-2 leading-relaxed">
                            Se eliminará el rol de forma permanente. Los usuarios asignados a este perfil perderán sus privilegios asociados de inmediato.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-6 gap-3">
                        <AlertDialogCancel className="rounded-xl h-10 text-xs font-semibold border-slate-200 w-full sm:w-auto hover:bg-slate-50">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => roleToDelete && handleDeleteRole(roleToDelete)}
                            className="rounded-xl h-10 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white border-none shadow-md w-full sm:w-auto"
                        >
                            Eliminar Rol Permanente
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Confirm Removal Permission Dialog */}
            <AlertDialog open={!!permToDelete} onOpenChange={(open) => !open && setPermToDelete(null)}>
                <AlertDialogContent className="rounded-2xl border-slate-200 bg-white shadow-2xl p-6">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-base font-semibold text-slate-900">¿Eliminar Módulo/Acción?</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-slate-500 mt-2 leading-relaxed">
                            Esta acción eliminará el registro de la matriz. Solo se podrá completar si no hay roles que dependan actualmente de este permiso.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-6 gap-3">
                        <AlertDialogCancel className="rounded-xl h-10 text-xs font-semibold border-slate-200 w-full sm:w-auto hover:bg-slate-50">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => permToDelete && handleDeletePermission(permToDelete)}
                            className="rounded-xl h-10 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white border-none shadow-md w-full sm:w-auto"
                        >
                            Eliminar Permanentemente
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
