'use client'

import React, { useState, useTransition, useEffect } from 'react'
import { IProfile } from '@/types/profile'
import { IRole, IUserRole } from '@/types/roles'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import { 
    IconUserPlus, 
    IconShieldCheck, 
    IconTrash, 
    IconPlus, 
    IconLoader2, 
    IconAlertCircle, 
    IconLock, 
    IconMailForward, 
    IconPower, 
    IconRotate 
} from '@tabler/icons-react'
import { 
    createSupabaseAccount, 
    assignRole, 
    removeRole, 
    sendPasswordResetLink, 
    toggleUserStatus, 
    getAuthUserInfo 
} from '../roles-actions'
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
import { IModule } from '../roles-permissions-actions'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface RolesManagerProps {
    profile: IProfile
    allRoles: IRole[]
    userRoles: IUserRole[]
    allModules: IModule[]
}

export function RolesManager({ profile, allRoles, userRoles, allModules }: RolesManagerProps) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const [selectedRoleId, setSelectedRoleId] = useState<string>('')
    const [selectedModuleId, setSelectedModuleId] = useState<string>('global')
    const [roleToRemove, setRoleToRemove] = useState<any | null>(null)
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
            const result = await assignRole(
                profile.id, 
                selectedRoleId, 
                undefined, 
                selectedModuleId === 'global' ? undefined : selectedModuleId
            )
            if (result.success) {
                toast.success('Rol asignado correctamente')
                setSelectedRoleId('')
                setSelectedModuleId('global')
                router.refresh()
            } else {
                toast.error(result.error)
            }
        })
    }

    const handleRemoveRole = (roleId: string, moduleId?: string) => {
        startTransition(async () => {
            const result = await removeRole(profile.id, roleId, moduleId)
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
            <Card className="overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-xl shadow-slate-200/20">
                <CardContent className="p-16 flex flex-col items-center text-center gap-8">
                    <div className="w-20 h-20 rounded-3xl bg-slate-50 text-slate-300 flex items-center justify-center border border-slate-100/50 shadow-inner">
                        <IconLock size={40} />
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-2xl font-bold text-slate-900 tracking-tight">Acceso No Configurado</CardTitle>
                        <CardDescription className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                            Este usuario aún no posee credenciales en la plataforma. Es necesario crear una cuenta de acceso antes de asignar roles.
                        </CardDescription>
                    </div>

                    <div className="p-5 rounded-2xl bg-indigo-50/30 border border-indigo-100/50 w-full max-w-md flex items-center gap-4 text-left">
                        <div className="p-2 rounded-lg bg-white shadow-sm">
                            <IconAlertCircle size={20} className="text-indigo-500 shrink-0" />
                        </div>
                        <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                            Se enviarán instrucciones de inicio a <span className="text-indigo-600 font-bold">{profile.email}</span> de forma automática.
                        </p>
                    </div>

                    <Button
                        size="lg"
                        onClick={handleCreateAccount}
                        disabled={isPending}
                        className="rounded-xl px-10 h-14 bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-widest flex items-center gap-3 transition-all shadow-xl shadow-slate-200"
                    >
                        {isPending ? <IconLoader2 className="animate-spin" size={18} /> : <IconUserPlus size={18} />}
                        Inicializar Credenciales
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Account Status Card */}
                <Card className="rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden flex flex-col h-full group">
                    <CardHeader className="border-b border-slate-50 px-6 py-5 bg-slate-50/20">
                        <CardTitle className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Seguridad de Cuenta</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col justify-between flex-1 gap-6">
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold text-slate-300 tracking-[0.15em]">Sincronización ID</span>
                            <p className="text-[12px] text-slate-500 font-bold font-mono truncate">{profile.auth_id}</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "h-2.5 w-2.5 rounded-full",
                                authInfo?.is_active === false ? "bg-red-500 animate-pulse" : "bg-emerald-500"
                            )} />
                            <span className={cn(
                                "text-[12px] font-bold uppercase tracking-tight",
                                authInfo?.is_active === false ? "text-red-600" : "text-emerald-600"
                            )}>
                                {isLoadingAuth ? 'Consultando...' : (authInfo?.is_active === false ? 'Acceso Denegado' : 'Acceso Autorizado')}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* Status Toggle Card */}
                <Card className={cn(
                    "rounded-2xl border shadow-sm overflow-hidden md:col-span-2 flex flex-col transition-all",
                    authInfo?.is_active 
                        ? "border-emerald-100 bg-emerald-50/10" 
                        : "border-red-100 bg-red-50/10"
                )}>
                    <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                        <div className="space-y-2">
                            <h3 className="text-[16px] font-bold text-slate-900 tracking-tight flex items-center gap-2">
                                {authInfo?.is_active ? 'Control de Acceso Activo' : 'Cuenta de Acceso Suspendida'}
                                <div className={cn("w-1.5 h-1.5 rounded-full", authInfo?.is_active ? "bg-emerald-500" : "bg-red-500")} />
                            </h3>
                            <p className="text-[12px] text-slate-500 font-medium leading-relaxed max-w-md italic">
                                {authInfo?.is_active
                                    ? 'El usuario puede operar en la plataforma. Al suspenderlo, su sesión será revocada y no podrá ingresar.'
                                    : 'Acción requerida: La cuenta está bloqueada. Habilítala para que el usuario recupere sus permisos.'}
                            </p>
                        </div>
                        <Button
                            onClick={handleToggleStatus}
                            disabled={isPending || isLoadingAuth}
                            className={cn(
                                "rounded-xl h-12 px-8 font-bold text-[11px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-md group",
                                authInfo?.is_active
                                    ? "bg-white text-red-600 border border-red-200 hover:bg-red-600 hover:text-white"
                                    : "bg-slate-900 text-white hover:bg-emerald-600 shadow-emerald-200"
                            )}
                        >
                            {isPending ? <IconLoader2 className="animate-spin" size={16} /> : <IconPower size={16} />}
                            {authInfo?.is_active ? 'Suspender Acceso' : 'Rehabilitar Usuario'}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-5 gap-8'>
                {/* Available Roles Panel */}
                <Card className="rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden lg:col-span-2 h-fit sticky top-24">
                    <CardHeader className="border-b border-slate-50 px-8 py-6 bg-slate-50/30">
                        <CardTitle className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Nuevos Permisos</CardTitle>
                        <CardDescription className="text-xs italic text-slate-500 mt-1">Define el rol y su alcance de aplicación.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        {/* Role Selection */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-1">Seleccionar Perfil</label>
                            <div className="grid grid-cols-1 gap-3">
                                {allRoles.map((role) => (
                                    <div
                                        key={role.id}
                                        onClick={() => setSelectedRoleId(role.id)}
                                        className={cn(
                                            "flex items-center gap-4 px-5 py-4 cursor-pointer transition-all rounded-xl border group",
                                            selectedRoleId === role.id 
                                                ? "border-slate-900 bg-slate-900 shadow-lg shadow-slate-200" 
                                                : "border-slate-100 hover:border-slate-300 bg-white"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-2.5 h-2.5 rounded-full transition-all shrink-0",
                                            selectedRoleId === role.id ? "bg-indigo-400 scale-125" : "bg-slate-200 group-hover:bg-slate-300"
                                        )} />
                                        <div className="space-y-0.5">
                                            <label className={cn(
                                                "text-[12px] font-bold cursor-pointer transition-colors",
                                                selectedRoleId === role.id ? "text-white" : "text-slate-700"
                                            )}>{role.name}</label>
                                            <p className={cn(
                                                "text-[10px] font-medium leading-tight",
                                                selectedRoleId === role.id ? "text-slate-400" : "text-slate-400"
                                            )}>
                                                {role.description || 'Accesos administrativos estándar.'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Module Selection */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-1">Alcance del Módulo (Opcional)</label>
                            <Select value={selectedModuleId} onValueChange={setSelectedModuleId}>
                                <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-slate-50/50 text-slate-700 font-medium">
                                    <SelectValue placeholder="Acceso Global" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-slate-100">
                                    <SelectItem value="global" className="text-xs font-bold text-indigo-600">Acceso Global del Sistema</SelectItem>
                                    {allModules.map(m => (
                                        <SelectItem key={m.id} value={m.id} className="text-xs font-medium">{m.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            className="w-full h-14 rounded-2xl bg-slate-900 text-white font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all hover:bg-black shadow-xl shadow-slate-200/50"
                            onClick={handleAssignRole}
                            disabled={!selectedRoleId || isPending}
                        >
                            {isPending ? <IconLoader2 className="animate-spin" size={16} /> : <IconShieldCheck size={18} />}
                            Efectuar Asignación
                        </Button>
                    </CardContent>
                </Card>

                {/* Assigned Roles List */}
                <Card className="rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden lg:col-span-3">
                    <CardHeader className="px-8 py-6 border-b border-slate-50 bg-slate-50/10">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[13px] font-bold text-slate-900 uppercase tracking-widest">Matriz de Roles Activos</h2>
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-100 shadow-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-slate-500">{userRoles.length} POSICIONES</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <DynamicTable
                            data={userRoles}
                            emptyMessage="Este usuario no tiene roles asignados todavía."
                            rowClassName="hover:bg-slate-50/30 group"
                            columns={[
                                {
                                    header: 'Perfil',
                                    headerClassName: 'pl-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400',
                                    render: (ur: IUserRole) => (
                                        <div className="flex flex-col pl-2 py-2">
                                            <span className="font-bold text-slate-900 text-[13px] uppercase tracking-tight">{ur.roles?.name}</span>
                                            <span className="text-[11px] text-slate-400 font-medium italic">{ur.roles?.description}</span>
                                        </div>
                                    )
                                },
                                {
                                    header: 'Módulo / Alcance',
                                    headerClassName: 'py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400',
                                    render: (ur: IUserRole) => (
                                        <div className="py-2">
                                            {ur.modules ? (
                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-100/50">
                                                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{ur.modules.name}</span>
                                                </div>
                                            ) : (
                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-50 border border-slate-100">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global</span>
                                                </div>
                                            )}
                                        </div>
                                    )
                                },
                                {
                                    header: 'Asignación',
                                    headerClassName: 'py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400',
                                    render: (ur: IUserRole) => (
                                        <div className="text-slate-500 font-bold text-[11px]">
                                            {new Date(ur.assigned_at).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            }).toUpperCase()}
                                        </div>
                                    )
                                },
                                {
                                    header: '',
                                    className: 'w-[80px]',
                                    render: (ur: IUserRole) => (
                                        <div className="flex justify-end pr-8">
                                            <button
                                                className="h-9 w-9 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 hover:shadow-inner transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center border border-transparent hover:border-red-100"
                                                onClick={() => setRoleToRemove(ur)}
                                                disabled={isPending}
                                            >
                                                <IconTrash size={16} />
                                            </button>
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
                <AlertDialogContent className="rounded-2xl border-none bg-white p-8 shadow-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold text-slate-900 tracking-tight">¿Revocar este acceso?</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-slate-500 font-medium italic mt-2">
                            Se eliminarán todos los privilegios asociados al rol <span className="text-slate-900 font-bold">"{roleToRemove?.roles?.name}"</span> 
                            {roleToRemove?.modules ? ` para el módulo "${roleToRemove.modules.name}"` : ' de forma global'}.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-8 gap-3">
                        <AlertDialogCancel className="rounded-xl h-11 px-6 text-xs font-bold uppercase tracking-widest border-slate-200">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => roleToRemove && handleRemoveRole(roleToRemove.role_id, roleToRemove.module_id)}
                            className="rounded-xl h-11 px-6 text-xs font-bold uppercase tracking-widest bg-red-600 hover:bg-red-700 text-white border-none shadow-lg shadow-red-100"
                        >
                            Confirmar Baja
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
