'use client'

import React, { useState, useTransition } from 'react'
import { Card, CardContent } from '@/components/ui/card'
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
    IconHierarchy2,
    IconKey,
    IconInfoCircle,
    IconChevronRight,
    IconUserShield
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
    DialogFooter,
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
        <div className="flex flex-col gap-12 animate-in fade-in duration-700">
            {/* Instruction Header */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="space-y-2 text-center md:text-left">
                        <h2 className="text-xl font-semibold tracking-tight">Arquitectura de Seguridad y Roles</h2>
                        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                            Configura la matriz de acceso de tu organización. Los roles definen grupos de capacidades, mientras que los permisos especifican acciones granulares sobre los módulos operativos del sistema.
                        </p>
                    </div>
                </div>
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
            </div>

            {/* Steps Guide */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Definir Roles', desc: 'Crea perfiles como "Administrador" o "Científico".', icon: IconHierarchy2, color: 'text-blue-500' },
                    { label: 'Configurar Matriz', desc: 'Asocia permisos específicos a cada rol seleccionado.', icon: IconKey, color: 'text-indigo-500' },
                    { label: 'Validar Acceso', desc: 'Los cambios se aplican en tiempo real a los usuarios.', icon: IconCircleCheck, color: 'text-emerald-500' }
                ].map((step, idx) => (
                    <div key={idx} className="p-5 rounded-2xl border border-slate-100 bg-white/50 backdrop-blur-sm flex items-start gap-4">
                        <div className={cn("w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100", step.color)}>
                            <step.icon size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-slate-900">{step.label}</h4>
                            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Roles Selection Section */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                            Perfiles Organizacionales
                            <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100">{roles.length}</span>
                        </h3>
                        <p className="text-xs text-slate-500 italic">Selecciona un perfil para editar su matriz de permisos asociada.</p>
                    </div>
                    <Dialog open={isCreatingRole} onOpenChange={setIsCreatingRole}>
                        <DialogTrigger asChild>
                            <Button className="h-10 px-5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold transition-all shadow-md flex items-center gap-2">
                                <IconPlus size={16} />
                                Nuevo Rol
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-3xl border-none shadow-2xl p-0 overflow-hidden">
                            <DialogHeader className="p-8 pb-0">
                                <DialogTitle className="text-lg font-semibold text-slate-900">Crear Nuevo Perfil</DialogTitle>
                                <DialogDescription className="text-sm italic">Define un nuevo rol operativo para la plataforma.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreateRole} className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-widest pl-1">Nombre del Rol</label>
                                    <Input
                                        placeholder="Ej: Editor Senior"
                                        value={newRoleName}
                                        onChange={e => setNewRoleName(e.target.value)}
                                        className="h-11 rounded-xl border-slate-200"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest pl-1">Propósito / Descripción</label>
                                    <Input
                                        placeholder="Breve explicación de sus responsabilidades"
                                        value={newRoleDesc}
                                        onChange={e => setNewRoleDesc(e.target.value)}
                                        className="h-11 rounded-xl border-slate-200"
                                    />
                                </div>
                                <Button type="submit" className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-100" disabled={isPending}>
                                    {isPending ? <IconLoader2 className="animate-spin" size={18} /> : 'Registrar Perfil'}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {roles.length > 0 ? (
                        roles.map((role) => (
                            <div
                                key={role.id}
                                onClick={() => setSelectedRoleId(role.id)}
                                className={cn(
                                    "p-5 rounded-2xl border transition-all cursor-pointer relative group flex flex-col justify-between h-36",
                                    selectedRoleId === role.id
                                        ? "border-indigo-500 bg-indigo-50/20 ring-1 ring-indigo-500/30 shadow-xl shadow-indigo-100/50"
                                        : "border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50/50"
                                )}
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className={cn("text-xs font-semibold uppercase tracking-wide", selectedRoleId === role.id ? "text-indigo-900" : "text-slate-900")}>
                                            {role.name}
                                        </h4>
                                        {selectedRoleId === role.id && <IconCircleCheck size={18} className="text-indigo-500" stroke={2} />}
                                    </div>
                                    <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed italic group-hover:text-slate-500">{role.description || 'Sin descripción detallada.'}</p>
                                </div>
                                <div className="flex items-center justify-between pt-3">
                                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tighter bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                                        {role.permissions?.length || 0} CAPACIDADES
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
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
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/20 italic">
                            <p className="text-sm text-slate-400 font-medium">No hay roles definidos para gestionar.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Matriz de Permisos Section */}
            <section className="space-y-8 bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50 pb-6">
                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                            Matriz de Permisos Granulares
                            {selectedRole && <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">EDITANDO: {selectedRole.name}</span>}
                        </h3>
                        <p className="text-xs text-slate-500 italic">Activa o desactiva las acciones específicas que este rol puede ejecutar en cada módulo.</p>
                    </div>

                    <Dialog open={isCreatingPerm} onOpenChange={setIsCreatingPerm}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="h-10 px-5 rounded-xl border-slate-200 text-xs font-semibold hover:bg-slate-50 flex items-center gap-2">
                                <IconKey size={16} className="text-indigo-600" />
                                Registrar Acción de Sistema
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-3xl border-none shadow-2xl p-0 overflow-hidden">
                            <DialogHeader className="p-8 pb-0">
                                <DialogTitle className="text-lg font-semibold text-slate-900">Nueva Acción de Módulo</DialogTitle>
                                <DialogDescription className="text-sm italic">Define una capacidad técnica que luego podrá ser asignada a roles.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreatePermission} className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest pl-1">Seleccionar Módulo</label>
                                    <Select value={newPermModuleId} onValueChange={setNewPermModuleId}>
                                        <SelectTrigger className="h-11 rounded-xl border-slate-200">
                                            <SelectValue placeholder="Busca un módulo..." />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-2xl">
                                            {modules.map(m => (
                                                <SelectItem key={m.id} value={m.id} className="rounded-xl">{m.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest pl-1">Nombre de la Acción (Slug)</label>
                                    <Input
                                        placeholder="Ej: create, download_report, admin_all"
                                        value={newPermAction}
                                        onChange={e => setNewPermAction(e.target.value)}
                                        className="h-11 font-mono rounded-xl border-slate-200"
                                        required
                                    />
                                    <p className="text-[10px] text-slate-400 italic">Este identificador se usa en las validaciones de código (if hasPermission("action")).</p>
                                </div>
                                <Button type="submit" className="w-full h-12 bg-slate-900 hover:bg-black text-white font-semibold rounded-xl shadow-lg" disabled={isPending || !newPermModuleId}>
                                    {isPending ? <IconLoader2 className="animate-spin" size={18} /> : 'Registrar Acción'}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {!selectedRole ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-200 mb-6 group-hover:scale-110 transition-transform">
                            <IconLock size={40} stroke={1.5} />
                        </div>
                        <h4 className="text-slate-900 font-semibold mb-2">Editor Bloqueado</h4>
                        <p className="text-slate-500 text-xs max-w-sm italic">Debes seleccionar un perfil organizacional de la lista superior para poder configurar su matriz de privilegios operativa.</p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {Object.keys(groupedPermissions).length > 0 ? (
                            Object.entries(groupedPermissions).map(([moduleName, { module, perms }]) => (
                                <div key={moduleName} className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm", module?.color_class || 'bg-slate-900')}>
                                            <IconShieldCheck size={18} />
                                        </div>
                                        <div className="flex flex-col">
                                            <h5 className="text-xs font-semibold text-slate-900 uppercase tracking-tight">{moduleName}</h5>
                                            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter">{module?.code}</span>
                                        </div>
                                        <div className="h-px flex-1 bg-slate-50 ml-2" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {perms.map((perm) => {
                                            const hasPermission = selectedRole.permissions?.some(p => p.id === perm.id) || false
                                            return (
                                                <div
                                                    key={perm.id}
                                                    onClick={() => handleTogglePermission(perm.id, hasPermission)}
                                                    className={cn(
                                                        "flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer group relative",
                                                        hasPermission
                                                            ? "border-indigo-100 bg-indigo-50/10 shadow-sm"
                                                            : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50"
                                                    )}
                                                >
                                                    <Checkbox
                                                        checked={hasPermission}
                                                        className="rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500 mt-0.5"
                                                    />
                                                    <div className="flex-1 min-w-0 pr-4">
                                                        <span className={cn("text-xs font-semibold tracking-tight uppercase", hasPermission ? "text-indigo-900" : "text-slate-600")}>
                                                            {perm.action}
                                                        </span>
                                                        <p className="text-[9px] text-slate-400 mt-1 uppercase italic leading-tight">Acción de {moduleName}</p>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setPermToDelete(perm.id)
                                                        }}
                                                        className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                    >
                                                        <IconTrash size={12} />
                                                    </button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-50 rounded-3xl bg-slate-50/10 text-center">
                                <IconInfoCircle className="text-slate-300 mb-4" size={32} />
                                <h5 className="text-slate-900 font-semibold mb-1">Sin Acciones Registradas</h5>
                                <p className="text-slate-400 text-xs italic max-w-xs">Registra acciones granulares para tus módulos para comenzar a poblar la matriz de seguridad.</p>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* Role Removal Confirmation */}
            <AlertDialog open={!!roleToDelete} onOpenChange={o => !o && setRoleToDelete(null)}>
                <AlertDialogContent className="rounded-3xl border-none shadow-2xl p-8">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-semibold text-slate-900">¿Revocar perfil permanentemente?</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-slate-500 mt-2 leading-relaxed italic">
                            Esta acción eliminará el rol de la base de datos. Todos los usuarios que dependen de este perfil perderán sus privilegios de forma inmediata y no podrán acceder a las secciones protegidas.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-8 gap-3 sm:gap-4">
                        <AlertDialogCancel className="h-11 rounded-xl text-[13px] font-semibold border-slate-200 hover:bg-slate-50 w-full sm:w-auto">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => roleToDelete && handleDeleteRole(roleToDelete)}
                            className="h-11 rounded-xl text-[13px] font-semibold bg-red-600 hover:bg-red-700 text-white border-none shadow-lg shadow-red-100 w-full sm:w-auto"
                        >
                            Confirmar Baja de Rol
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Permission Removal Confirmation */}
            <AlertDialog open={!!permToDelete} onOpenChange={o => !o && setPermToDelete(null)}>
                <AlertDialogContent className="rounded-3xl border-none shadow-2xl p-8">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-semibold text-slate-900">¿Eliminar capacidad del sistema?</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-slate-500 mt-2 leading-relaxed italic">
                            Si eliminas esta acción, se borrará de todos los roles que la tengan asignada. Las validaciones de seguridad en el código que dependan de este slug podrian fallar.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-8 gap-3 sm:gap-4">
                        <AlertDialogCancel className="h-11 rounded-xl text-[13px] font-semibold border-slate-200 hover:bg-slate-50 w-full sm:w-auto">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => permToDelete && handleDeletePermission(permToDelete)}
                            className="h-11 rounded-xl text-[13px] font-semibold bg-red-600 hover:bg-red-700 text-white border-none shadow-lg shadow-red-100 w-full sm:w-auto"
                        >
                            Eliminar Acción Permanente
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
