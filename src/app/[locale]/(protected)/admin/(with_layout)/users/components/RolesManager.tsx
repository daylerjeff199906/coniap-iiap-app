'use client'

import React, { useState, useTransition, useEffect } from 'react'
import { IProfile } from '@/types/profile'
import { IRole, IUserRole } from '@/types/roles'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import { IconUserPlus, IconShieldCheck, IconTrash, IconPlus, IconLoader2, IconAlertCircle, IconLock, IconMailForward, IconPower, IconRotate } from '@tabler/icons-react'
import { createSupabaseAccount, assignRole, removeRole, sendPasswordResetLink, toggleUserStatus, getAuthUserInfo } from '../roles-actions'
import { DynamicTable } from '@/components/general/DataTable/DynamicTable'
import { useRouter } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
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

interface RolesManagerProps {
    profile: IProfile
    allRoles: IRole[]
    userRoles: IUserRole[]
}

export function RolesManager({ profile, allRoles, userRoles }: RolesManagerProps) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const [selectedRoleId, setSelectedRoleId] = useState<string>('')
    const [roleToRemove, setRoleToRemove] = useState<string | null>(null)
    const [authInfo, setAuthInfo] = useState<any>(null)
    const [isLoadingAuth, setIsLoadingAuth] = useState(false)

    useEffect(() => {
        if (profile.auth_id) {
            fetchAuthInfo()
        }
    }, [profile.auth_id])

    const fetchAuthInfo = async () => {
        if (!profile.auth_id) return
        setIsLoadingAuth(true)
        const info = await getAuthUserInfo(profile.auth_id)
        setAuthInfo(info)
        setIsLoadingAuth(false)
    }

    const handleCreateAccount = () => {
        if (!profile.email) {
            toast.error('El usuario no tiene un correo electrónico asignado.')
            return
        }

        startTransition(async () => {
            const result = await createSupabaseAccount(profile.id, profile.email!)
            if (result.success) {
                toast.success(result.message, { autoClose: 10000 })
                router.refresh()
            } else {
                toast.error(result.error)
            }
        })
    }

    const handleAssignRole = () => {
        if (!selectedRoleId) return

        startTransition(async () => {
            const result = await assignRole(profile.id, selectedRoleId)
            if (result.success) {
                toast.success('Rol asignado correctamente')
                setSelectedRoleId('')
                router.refresh()
            } else {
                toast.error(result.error)
            }
        })
    }

    const handleRemoveRole = (roleId: string) => {
        startTransition(async () => {
            const result = await removeRole(profile.id, roleId)
            if (result.success) {
                toast.success('Rol eliminado')
                setRoleToRemove(null)
                router.refresh()
            } else {
                toast.error(result.error)
            }
        })
    }

    const handleSendResetLink = () => {
        if (!profile.email) return
        startTransition(async () => {
            const result = await sendPasswordResetLink(profile.email!)
            if (result.success) {
                toast.success(result.message)
            } else {
                toast.error(result.error)
            }
        })
    }

    const handleToggleStatus = () => {
        if (!profile.auth_id || !authInfo) return
        startTransition(async () => {
            const result = await toggleUserStatus(profile.auth_id!, authInfo.is_active)
            if (result.success) {
                toast.success(result.message)
                fetchAuthInfo()
            } else {
                toast.error(result.error)
            }
        })
    }

    if (!profile.auth_id) {
        return (
            <Card className="overflow-hidden border border-slate-200 rounded-xl bg-white shadow-sm">
                <CardContent className="p-12 flex flex-col items-center text-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center border border-slate-100 italic">
                        <IconLock size={32} />
                    </div>
                    <div className="space-y-1">
                        <CardTitle className="text-xl font-medium text-slate-900">Sin cuenta de acceso</CardTitle>
                        <CardDescription className="text-slate-500 text-sm max-w-sm mx-auto">
                            Este perfil aún no está vinculado a una cuenta de acceso. Debes crearle una para gestionar sus roles.
                        </CardDescription>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 w-full max-w-md flex items-center gap-4 text-left">
                        <IconAlertCircle size={18} className="text-slate-400 shrink-0" />
                        <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                            Se enviará un correo a <span className="text-slate-900">{profile.email}</span> con las instrucciones de acceso.
                        </p>
                    </div>

                    <Button
                        size="lg"
                        onClick={handleCreateAccount}
                        disabled={isPending}
                        className="rounded-xl px-8 h-12 bg-slate-900 hover:bg-black text-white font-medium flex items-center gap-2 transition-all shadow-sm"
                    >
                        {isPending ? <IconLoader2 className="animate-spin" size={18} /> : <IconUserPlus size={18} />}
                        Configurar cuenta de acceso
                    </Button>
                </CardContent>
            </Card>
        )
    }

    const assignedRoleIds = userRoles.map(ur => ur.role_id)
    const availableRoles = allRoles.filter(role => !assignedRoleIds.includes(role.id))

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Account Status Card */}
            <Card className="rounded-xl border border-slate-200 shadow-sm bg-white overflow-hidden flex flex-col justify-between">
                <div>
                    <CardHeader className="border-b border-slate-50 px-8 py-5">
                        <CardTitle className="text-[15px] font-medium text-slate-900">Estado del Acceso</CardTitle>
                        <CardDescription className="text-xs">Identidad verificada en el sistema.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="px-8 py-5 flex items-center justify-between">
                            <div className="space-y-0.5">
                                <span className="text-[13px] font-medium text-slate-900">Identificador (UID)</span>
                                <p className="text-[11px] text-slate-400 font-medium font-mono truncate max-w-[150px]">{profile.auth_id}</p>
                            </div>
                            <div className={cn(
                                "flex items-center gap-2 px-3 py-1 rounded-lg border text-[10px] uppercase font-medium tracking-tight h-6",
                                isLoadingAuth
                                    ? "bg-slate-50 text-slate-400 border-slate-100"
                                    : (authInfo?.is_active !== false ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100")
                            )}>
                                {isLoadingAuth ? (
                                    <IconLoader2 className="animate-spin" size={12} />
                                ) : (
                                    authInfo?.is_active === false ? 'Cuenta Suspendida' : 'Cuenta Activa'
                                )}
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>

            {/* Recovery Settings Card */}
            <Card className="rounded-xl border border-slate-200 shadow-sm bg-white overflow-hidden">
                <CardHeader className="border-b border-slate-50 px-8 py-5">
                    <CardTitle className="text-[15px] font-medium text-slate-900">Configuración de Recuperación</CardTitle>
                    <CardDescription className="text-xs">Seguridad y acceso a la cuenta.</CardDescription>
                </CardHeader>
                <CardContent className="px-8 py-5 space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-[11px] uppercase font-medium text-slate-400 tracking-wider">Correo Electrónico</label>
                            <Button
                                variant="link"
                                className="p-0 h-auto text-[11px] text-slate-900 font-medium flex items-center gap-1 hover:no-underline hover:text-indigo-600 transition-colors"
                                onClick={handleSendResetLink}
                                disabled={isPending}
                            >
                                {isPending ? <IconLoader2 size={14} className="animate-spin" /> : <IconMailForward size={14} />}
                                Enviar enlace
                            </Button>
                        </div>
                        <div className="relative">
                            <Input
                                value={profile.email || ''}
                                disabled
                                className="bg-slate-50 border-slate-200 text-[13px] font-medium rounded-lg h-10 px-4 text-slate-500"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Deactivate Account Action Section */}
            <Card className="rounded-xl border border-red-100 shadow-sm bg-red-50/10 overflow-hidden">
                <CardContent className="px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h3 className="text-[15px] font-medium text-slate-900">
                            {authInfo?.is_active ? 'Desactivar Cuenta del Usuario' : 'Activar Cuenta del Usuario'}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-xl">
                            {authInfo?.is_active
                                ? 'Esto impedirá que el usuario inicie sesión en la plataforma. Podrás reactivarla en cualquier momento.'
                                : 'Habilitará nuevamente el acceso del usuario para que pueda operar normalmente.'}
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={handleToggleStatus}
                        disabled={isPending || isLoadingAuth}
                        className={cn(
                            "rounded-xl h-10 px-6 font-medium text-[12px] flex items-center gap-2 transition-all",
                            authInfo?.is_active
                                ? "border-red-200 text-red-600 hover:bg-red-50 hover:border-red-600"
                                : "border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-600"
                        )}
                    >
                        {isPending ? <IconLoader2 className="animate-spin" size={16} /> : <IconPower size={16} />}
                        {authInfo?.is_active ? 'Desactivar Usuario' : 'Activar Usuario'}
                    </Button>
                </CardContent>
            </Card>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {/* Available Roles Panel */}
                <Card className="rounded-xl border border-slate-200 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="border-b border-slate-50 px-8 py-5">
                        <CardTitle className="text-[15px] font-medium text-slate-900">Gestión de Permisos</CardTitle>
                        <CardDescription className="text-xs">Selecciona un rol para ampliar las capacidades del usuario en la plataforma.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="grid grid-cols-1 divide-y divide-slate-50">
                            {availableRoles.length > 0 ? (
                                availableRoles.map((role) => (
                                    <div
                                        key={role.id}
                                        onClick={() => setSelectedRoleId(role.id)}
                                        className={cn(
                                            "flex items-center gap-6 px-8 py-5 cursor-pointer transition-all",
                                            selectedRoleId === role.id ? "bg-slate-50/50" : "hover:bg-slate-50/20"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200",
                                            selectedRoleId === role.id
                                                ? "border-slate-800 bg-slate-800"
                                                : "border-slate-300 bg-white"
                                        )}>
                                            {selectedRoleId === role.id && (
                                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                            )}
                                        </div>

                                        <div className="space-y-0.5 flex-1 pr-4">
                                            <label className="text-[13px] font-medium text-slate-900 cursor-pointer">{role.name}</label>
                                            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                                                {role.description || 'Habilita accesos específicos para este perfil en el panel administrativo.'}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-12 text-center bg-slate-50/10 italic">
                                    <p className="text-sm text-slate-400 font-medium">No hay más roles disponibles para asignar.</p>
                                </div>
                            )}
                        </div>

                        {availableRoles.length > 0 && (
                            <div className="px-8 py-6 border-t border-slate-50 flex justify-end bg-slate-50/20">
                                <Button
                                    className="h-10 px-8 rounded-xl bg-slate-900 text-white font-medium flex items-center gap-2 transition-all hover:bg-black shadow-sm disabled:opacity-50"
                                    onClick={handleAssignRole}
                                    disabled={!selectedRoleId || isPending}
                                >
                                    {isPending ? <IconLoader2 className="animate-spin" size={16} /> : <IconPlus size={16} />}
                                    Guardar Cambios de Rol
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Assigned Roles List */}
                <Card className="rounded-xl border border-slate-200 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="px-8 py-5 border-b border-slate-50 bg-slate-50/10">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[15px] font-medium text-slate-900">Roles Asignados</h2>
                            <span className="text-[10px] font-medium text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-100">
                                {userRoles.length} ACTIVOS
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <DynamicTable
                            data={userRoles.map(ur => ({
                                id: ur.role_id,
                                name: ur.roles?.name || 'Desconocido',
                                description: ur.roles?.description || 'Sin descripción',
                                assigned_at: ur.assigned_at
                            }))}
                            emptyMessage="Este usuario no tiene roles asignados todavía."
                            rowClassName="hover:bg-transparent"
                            columns={[
                                {
                                    header: 'Rol',
                                    headerClassName: 'pl-8 text-[11px] uppercase tracking-widest font-medium text-slate-400',
                                    render: (item) => (
                                        <div className="flex flex-col pl-2">
                                            <span className="font-medium text-slate-900 text-[13px]">{item.name}</span>
                                            <span className="text-[11px] text-slate-400 font-medium">{item.description}</span>
                                        </div>
                                    )
                                },
                                {
                                    header: 'Alta',
                                    headerClassName: 'text-[11px] uppercase tracking-widest font-medium text-slate-400',
                                    render: (item) => (
                                        <div className="text-slate-500 font-medium text-[12px] tabular-nums">
                                            {new Date(item.assigned_at).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    )
                                },
                                {
                                    header: '',
                                    className: 'w-[100px]',
                                    render: (item) => (
                                        <div className="flex justify-end pr-6">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setRoleToRemove(item.id)
                                                }}
                                                disabled={isPending}
                                            >
                                                <IconTrash size={16} />
                                            </Button>
                                        </div>
                                    )
                                }
                            ]}
                        />
                    </CardContent>
                </Card>
            </div>

            {/* Confirm Removal Dialog */}
            <AlertDialog open={!!roleToRemove} onOpenChange={(open) => !open && setRoleToRemove(null)}>
                <AlertDialogContent className="rounded-xl border-slate-200 bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-base font-medium text-slate-900">¿Confirmar eliminación?</AlertDialogTitle>
                        <AlertDialogDescription className="text-xs text-slate-500 font-medium">
                            Esta acción revocará los permisos asociados a este rol de forma inmediata.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel className="rounded-lg h-9 text-xs font-medium border-slate-200">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => roleToRemove && handleRemoveRole(roleToRemove)}
                            className="rounded-lg h-9 text-xs font-medium bg-red-600 hover:bg-red-700 text-white border-none shadow-sm"
                        >
                            Revocar Accesos
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
