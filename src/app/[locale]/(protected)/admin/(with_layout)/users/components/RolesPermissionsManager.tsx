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
        <div className="space-y-10 animate-in fade-in duration-700">
            <header className="space-y-1 px-2">
                <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Roles y Permisos</h2>
                <p className="text-sm text-slate-500 italic">Configura perfiles organizacionales y su matriz de acceso granular.</p>
            </header>

            {/* Roles Selection Section */}
            <section className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                            Perfiles Organizacionales
                            <span className="text-[10px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">{roles.length}</span>
                        </h3>
                        <p className="text-xs text-slate-500 italic">Selecciona un perfil para configurar su acceso.</p>
                    </div>
                    <Dialog open={isCreatingRole} onOpenChange={setIsCreatingRole}>
                        <DialogTrigger asChild>
                            <Button className="h-9 px-4 rounded-md bg-slate-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-2">
                                <IconPlus size={16} />
                                Nuevo Rol
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-xl border-none shadow-2xl p-0 overflow-hidden">
                            <DialogHeader className="p-6 pb-2">
                                <DialogTitle className="text-lg font-semibold text-slate-900">Crear Nuevo Perfil</DialogTitle>
                                <DialogDescription className="text-sm italic">Define un nuevo rol operativo.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreateRole} className="p-6 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-widest pl-1">Nombre</label>
                                    <Input
                                        placeholder="Ej: Editor Senior"
                                        value={newRoleName}
                                        onChange={e => setNewRoleName(e.target.value)}
                                        className="h-10 rounded-md border-slate-200"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-widest pl-1">Descripción</label>
                                    <Input
                                        placeholder="Propósito de este rol"
                                        value={newRoleDesc}
                                        onChange={e => setNewRoleDesc(e.target.value)}
                                        className="h-10 rounded-md border-slate-200"
                                    />
                                </div>
                                <Button type="submit" className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md" disabled={isPending}>
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
                                    "p-4 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between h-32",
                                    selectedRoleId === role.id
                                        ? "border-slate-900 bg-slate-900 text-white ring-1 ring-slate-900"
                                        : "border-slate-100 bg-white hover:border-slate-300"
                                )}
                            >
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-xs font-semibold uppercase tracking-wide truncate pr-6">
                                            {role.name}
                                        </h4>
                                        {selectedRoleId === role.id && <IconCircleCheck size={16} className="text-indigo-400 shrink-0" />}
                                    </div>
                                    <p className={cn("text-[10px] line-clamp-2 leading-relaxed italic", selectedRoleId === role.id ? "text-slate-400" : "text-slate-400")}>
                                        {role.description || 'Sin descripción detallada.'}
                                    </p>
                                </div>
                                
                                <div className="flex items-center justify-between pt-2">
                                    <span className={cn("text-[9px] font-semibold uppercase px-2 py-0.5 rounded border tracking-tighter", 
                                        selectedRoleId === role.id ? "bg-white/10 border-white/20 text-white" : "bg-slate-50 border-slate-100 text-slate-400")}>
                                        {role.permissions?.length || 0} PERMISOS
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setRoleToDelete(role.id)
                                        }}
                                        className={cn("p-1 rounded transition-colors opacity-0 group-hover:opacity-100", 
                                            selectedRoleId === role.id ? "hover:bg-red-500/20 text-slate-400" : "hover:bg-red-50 text-slate-300 hover:text-red-500")}
                                        disabled={isPending}
                                    >
                                        <IconTrash size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-10 text-center border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/20 italic">
                            <p className="text-xs text-slate-400">No hay roles definidos.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Matriz de Permisos Section */}
            <section className="space-y-6 pt-6 border-t border-slate-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                            Matriz de Permisos
                            {selectedRole && <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 uppercase tracking-tighter">{selectedRole.name}</span>}
                        </h3>
                        <p className="text-xs text-slate-500 italic">Configura acciones específicas para este perfil.</p>
                    </div>

                    <Dialog open={isCreatingPerm} onOpenChange={setIsCreatingPerm}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="h-9 px-4 rounded-md border-slate-200 text-xs font-semibold hover:bg-slate-50 flex items-center gap-2">
                                <IconKey size={16} className="text-slate-500" />
                                Nueva Acción
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-xl border-none shadow-2xl p-0 overflow-hidden">
                            <DialogHeader className="p-6 pb-2">
                                <DialogTitle className="text-lg font-semibold text-slate-900">Nueva Acción de Módulo</DialogTitle>
                                <DialogDescription className="text-sm italic">Define una capacidad técnica.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreatePermission} className="p-6 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-widest pl-1">Módulo</label>
                                    <Select value={newPermModuleId} onValueChange={setNewPermModuleId}>
                                        <SelectTrigger className="h-10 rounded-md border-slate-200">
                                            <SelectValue placeholder="Busca un módulo..." />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-lg">
                                            {modules.map(m => (
                                                <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-widest pl-1">Slug (Identificador)</label>
                                    <Input
                                        placeholder="Ej: create, view_all"
                                        value={newPermAction}
                                        onChange={e => setNewPermAction(e.target.value)}
                                        className="h-10 font-mono rounded-md border-slate-200"
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full h-11 bg-slate-900 hover:bg-black text-white font-semibold rounded-md shadow-lg" disabled={isPending || !newPermModuleId}>
                                    {isPending ? <IconLoader2 className="animate-spin" size={18} /> : 'Registrar Acción'}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {!selectedRole ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-200 mb-4">
                            <IconLock size={32} stroke={1.5} />
                        </div>
                        <h4 className="text-slate-900 text-sm font-semibold mb-1">Selecciona un perfil</h4>
                        <p className="text-slate-400 text-xs italic max-w-xs">Haz clic en un rol superior para editar sus permisos asociados.</p>
                    </div>
                ) : (
                    <div className="space-y-10 px-2 divide-y divide-slate-50">
                        {Object.keys(groupedPermissions).length > 0 ? (
                            Object.entries(groupedPermissions).map(([moduleName, { module, perms }]) => (
                                <div key={moduleName} className="pt-8 first:pt-0 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("w-7 h-7 rounded bg-slate-900 flex items-center justify-center text-white shrink-0", module?.color_class)}>
                                            <IconShieldCheck size={14} />
                                        </div>
                                        <div className="flex flex-col">
                                            <h5 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">{moduleName}</h5>
                                            <span className="text-[9px] font-mono text-slate-400 uppercase">{module?.code}</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                        {perms.map((perm) => {
                                            const hasPermission = selectedRole.permissions?.some(p => p.id === perm.id) || false
                                            return (
                                                <div
                                                    key={perm.id}
                                                    onClick={() => handleTogglePermission(perm.id, hasPermission)}
                                                    className={cn(
                                                        "flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer relative group",
                                                        hasPermission
                                                            ? "border-slate-200 bg-slate-50/50"
                                                            : "border-slate-100 bg-white hover:border-slate-200"
                                                    )}
                                                >
                                                    <Checkbox
                                                        checked={hasPermission}
                                                        className="rounded-sm border-slate-300 text-indigo-600 h-4 w-4"
                                                    />
                                                    <div className="flex-1 min-w-0 pr-4">
                                                        <span className={cn("text-[11px] font-semibold tracking-tight uppercase", hasPermission ? "text-slate-900" : "text-slate-500")}>
                                                            {perm.action}
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setPermToDelete(perm.id)
                                                        }}
                                                        className="absolute top-1/2 -translate-y-1/2 right-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-1"
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
                            <div className="py-12 text-center text-slate-300 italic text-xs">
                                Sin acciones registradas en este módulo.
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* Modals for deletion */}
            <AlertDialog open={!!roleToDelete} onOpenChange={o => !o && setRoleToDelete(null)}>
                <AlertDialogContent className="rounded-xl border-none p-6">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg font-semibold text-slate-900">¿Eliminar perfil?</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-slate-500 italic">
                            Esta acción revocará el acceso a todos los usuarios asignados a este rol.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-6 gap-2">
                        <AlertDialogCancel className="h-9 rounded-md text-xs font-medium border-slate-200">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => roleToDelete && handleDeleteRole(roleToDelete)}
                            className="h-9 rounded-md text-xs font-medium bg-red-600 hover:bg-red-700 text-white border-none"
                        >
                            Eliminar permanente
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={!!permToDelete} onOpenChange={o => !o && setPermToDelete(null)}>
                <AlertDialogContent className="rounded-xl border-none p-6">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg font-semibold text-slate-900">¿Eliminar acción?</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-slate-500 italic">
                            Se borrará de todos los roles asociados.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-6 gap-2">
                        <AlertDialogCancel className="h-9 rounded-md text-xs font-medium border-slate-200">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => permToDelete && handleDeletePermission(permToDelete)}
                            className="h-9 rounded-md text-xs font-medium bg-red-600 hover:bg-red-700 text-white border-none"
                        >
                            Confirmar baja
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
