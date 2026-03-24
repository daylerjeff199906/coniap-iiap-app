'use client'

import React, { useState, useTransition } from 'react'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'react-toastify'
import { IconShieldCheck, IconPlus, IconTrash, IconLoader2, IconCircleCheck, IconLock } from '@tabler/icons-react'
import { createRole, deleteRole, assignPermissionToRole, removePermissionFromRole, createPermission, IRoleWithPermissions, IPermission } from '../roles-permissions-actions'
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
                // Update selected role if it is first one
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

    // Group permissions by module_name
    const groupedPermissions: Record<string, IPermission[]> = {}
    allPermissions.forEach(p => {
        if (!groupedPermissions[p.module_name]) {
            groupedPermissions[p.module_name] = []
        }
        groupedPermissions[p.module_name].push(p)
    })

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
            {/* Roles List */}
            <div className="md:col-span-1 space-y-4">
                <Card className="rounded-xl border border-slate-200 shadow-sm bg-white overflow-hidden h-fit">
                    <CardHeader className="border-b border-slate-50 px-6 py-4 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-sm font-medium text-slate-900">Roles</CardTitle>
                            <CardDescription className="text-xs">Definición de perfiles organizacionales.</CardDescription>
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-lg text-slate-600 border-slate-200 hover:bg-slate-50"
                            onClick={() => setIsCreatingRole(!isCreatingRole)}
                        >
                            <IconPlus size={16} />
                        </Button>
                    </CardHeader>
                    {isCreatingRole && (
                        <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                            <form onSubmit={handleCreateRole} className="space-y-3">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-medium text-slate-500">Nombre del Rol</label>
                                    <Input
                                        placeholder="Ej: Biólogo Investigador"
                                        value={newRoleName}
                                        onChange={e => setNewRoleName(e.target.value)}
                                        className="h-9 text-xs rounded-lg border-slate-200"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-medium text-slate-500">Descripción</label>
                                    <Input
                                        placeholder="Descripción"
                                        value={newRoleDesc}
                                        onChange={e => setNewRoleDesc(e.target.value)}
                                        className="h-9 text-xs rounded-lg border-slate-200"
                                    />
                                </div>
                                <div className="flex justify-end gap-2 pt-1">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="h-8 text-xs rounded-lg text-slate-500"
                                        onClick={() => setIsCreatingRole(false)}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="h-8 text-xs rounded-lg bg-slate-900 text-white hover:bg-black"
                                        disabled={isPending || !newRoleName.trim()}
                                    >
                                        {isPending ? <IconLoader2 className="animate-spin" size={14} /> : 'Crear'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                    <CardContent className="p-0">
                        {roles.length > 0 ? (
                            <div className="divide-y divide-slate-50">
                                {roles.map((role) => (
                                    <div
                                        key={role.id}
                                        onClick={() => setSelectedRoleId(role.id)}
                                        className={cn(
                                            "flex items-center justify-between px-6 py-4 cursor-pointer transition-colors relative group",
                                            selectedRoleId === role.id ? "bg-slate-50" : "hover:bg-slate-50/20"
                                        )}
                                    >
                                        {selectedRoleId === role.id && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-900" />
                                        )}
                                        <div className="space-y-0.5">
                                            <h4 className="text-xs font-medium text-slate-900">{role.name}</h4>
                                            {role.description && (
                                                <p className="text-[11px] text-slate-400 line-clamp-1">{role.description}</p>
                                            )}
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setRoleToDelete(role.id)
                                            }}
                                            disabled={isPending}
                                        >
                                            <IconTrash size={14} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="p-6 text-center text-xs text-slate-400 italic">No hay roles definidos.</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Permissions Panel */}
            <div className="md:col-span-2 space-y-4">
                {selectedRole ? (
                    <Card className="rounded-xl border border-slate-200 shadow-sm bg-white overflow-hidden">
                        <CardHeader className="border-b border-slate-50 px-6 py-4 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-sm font-medium text-slate-900">Permisos para: {selectedRole.name}</CardTitle>
                                <CardDescription className="text-xs">Asigna qué módulos puede acceder el usuario y su nivel de acción.</CardDescription>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 rounded-lg text-xs text-slate-600 border-slate-200 hover:bg-slate-50 flex items-center gap-1.5"
                                onClick={() => setIsCreatingPerm(!isCreatingPerm)}
                            >
                                <IconLock size={14} />
                                <span>Nuevo Módulo/Acción</span>
                            </Button>
                        </CardHeader>
                        {isCreatingPerm && (
                            <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                                <form onSubmit={handleCreatePermission} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-semibold text-slate-500 tracking-wide">Módulo</label>
                                        <Input
                                            placeholder="Ej: fonoteca"
                                            value={newPermModule}
                                            onChange={e => setNewPermModule(e.target.value)}
                                            className="h-9 text-xs rounded-lg border-slate-200"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-semibold text-slate-500 tracking-wide">Acción</label>
                                        <Input
                                            placeholder="Ej: read, write, admin"
                                            value={newPermAction}
                                            onChange={e => setNewPermAction(e.target.value)}
                                            className="h-9 text-xs rounded-lg border-slate-200"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1 md:col-span-2">
                                        <label className="text-[10px] uppercase font-semibold text-slate-500 tracking-wide">Descripción</label>
                                        <Input
                                            placeholder="Descripción del permiso"
                                            value={newPermDesc}
                                            onChange={e => setNewPermDesc(e.target.value)}
                                            className="h-9 text-xs rounded-lg border-slate-200"
                                        />
                                    </div>
                                    <div className="flex justify-end gap-2 md:col-span-2 pt-1 border-t border-slate-100">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            className="h-8 text-xs rounded-lg text-slate-500"
                                            onClick={() => setIsCreatingPerm(false)}
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="h-8 text-xs rounded-lg bg-slate-900 text-white hover:bg-black"
                                            disabled={isPending || !newPermModule.trim() || !newPermAction.trim()}
                                        >
                                            {isPending ? <IconLoader2 className="animate-spin" size={14} /> : 'Registrar'}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}
                        <CardContent className="p-6 space-y-6">
                            {Object.keys(groupedPermissions).length > 0 ? (
                                Object.entries(groupedPermissions).map(([moduleName, perms]) => (
                                    <div key={moduleName} className="space-y-3 pb-6 border-b border-slate-50 last:border-b-0 last:pb-0">
                                        <div className="flex items-center gap-2">
                                            <IconShieldCheck className="text-slate-400" size={16} />
                                            <h5 className="text-[11px] uppercase font-semibold tracking-wider text-slate-800">{moduleName}</h5>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-6">
                                            {perms.map((perm) => {
                                                const hasPermission = selectedRole.permissions?.some(p => p.id === perm.id) || false
                                                return (
                                                    <div
                                                        key={perm.id}
                                                        className={cn(
                                                            "flex items-start items-center space-x-3 p-3 rounded-xl border border-slate-100 bg-white transition-all cursor-pointer",
                                                            hasPermission ? "border-indigo-100 bg-indigo-50/10" : "hover:bg-slate-50/30"
                                                        )}
                                                        onClick={() => handleTogglePermission(perm.id, hasPermission)}
                                                    >
                                                        <Checkbox
                                                            id={perm.id}
                                                            checked={hasPermission}
                                                            onCheckedChange={() => handleTogglePermission(perm.id, hasPermission)}
                                                            className="rounded border-slate-200 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xs font-semibold text-slate-900 tracking-wide font-mono bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">
                                                                    {perm.action}
                                                                </span>
                                                            </div>
                                                            {perm.description && (
                                                                <p className="text-[11px] text-slate-400 mt-0.5 max-w-[180px] break-words">{perm.description}</p>
                                                            )}
                                                        </div>
                                                        {hasPermission && (
                                                            <IconCircleCheck className="text-indigo-600 shrink-0" size={16} />
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-xs text-slate-400 italic">No hay módulos registrados en permissions.</p>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="rounded-xl border border-slate-200 border-dashed bg-slate-50/50 backdrop-blur-sm">
                        <CardContent className="flex flex-col items-center justify-center p-16 text-center">
                            <IconShieldCheck size={40} className="text-slate-300 mb-4" />
                            <h3 className="text-slate-600 font-medium text-sm">Gestionar Permisos</h3>
                            <p className="text-slate-400 text-xs mt-1 max-w-sm">Selecciona o crea un rol en el panel de la izquierda para ver y editar sus permisos de acceso.</p>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Confirm Removal Dialog */}
            <AlertDialog open={!!roleToDelete} onOpenChange={(open) => !open && setRoleToDelete(null)}>
                <AlertDialogContent className="rounded-xl border-slate-200 bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-sm font-medium text-slate-900">¿Confirmar eliminación?</AlertDialogTitle>
                        <AlertDialogDescription className="text-xs text-slate-500 font-medium">
                            Se eliminará el rol de forma permanente. Los usuarios asignados a este rol perderán sus accesos asociados.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel className="rounded-lg h-9 text-xs font-medium border-slate-200">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => roleToDelete && handleDeleteRole(roleToDelete)}
                            className="rounded-lg h-9 text-xs font-medium bg-red-600 hover:bg-red-700 text-white border-none shadow-sm"
                        >
                            Eliminar Rol
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
