'use client'

import React, { useState, useTransition } from 'react'
import { IProfile } from '@/types/profile'
import { IRole, IUserRole } from '@/types/roles'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'react-toastify'
import { IconUserPlus, IconShieldCheck, IconTrash, IconPlus, IconLoader2, IconAlertCircle, IconLock } from '@tabler/icons-react'
import { createSupabaseAccount, assignRole, removeRole } from '../roles-actions'
import { DynamicTable } from '@/components/general/DataTable/DynamicTable'
import { useRouter } from '@/i18n/routing'

interface RolesManagerProps {
    profile: IProfile
    allRoles: IRole[]
    userRoles: IUserRole[]
}

export function RolesManager({ profile, allRoles, userRoles }: RolesManagerProps) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const [selectedRoleId, setSelectedRoleId] = useState<string>('')

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
        if (!confirm('¿Estás seguro de que deseas eliminar este rol?')) return

        startTransition(async () => {
            const result = await removeRole(profile.id, roleId)
            if (result.success) {
                toast.success('Rol eliminado')
                router.refresh()
            } else {
                toast.error(result.error)
            }
        })
    }

    if (!profile.auth_id) {
        return (
            <Card className="rounded-3xl border-none shadow-2xl shadow-slate-200/50 overflow-hidden bg-white">
                <div className="h-2 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400" />
                <CardContent className="p-12 flex flex-col items-center text-center gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-amber-50 text-amber-500 flex items-center justify-center shadow-inner">
                        <IconLock size={40} />
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-2xl font-medium text-slate-900">Sin cuenta de acceso</CardTitle>
                        <CardDescription className="text-slate-500 text-lg max-w-sm mx-auto">
                            Este perfil aún no está vinculado a una cuenta de Supabase Auth. Debes crearle una para gestionar sus roles.
                        </CardDescription>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 w-full max-w-md flex items-center gap-4 text-left">
                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                            <IconAlertCircle size={20} className="text-slate-400" />
                        </div>
                        <p className="text-sm text-slate-600 font-medium">
                            Se enviará un correo de confirmación a <span className="font-medium text-slate-900">{profile.email}</span> con sus credenciales.
                        </p>
                    </div>

                    <Button
                        size="lg"
                        onClick={handleCreateAccount}
                        disabled={isPending}
                        className="rounded-2xl px-8 h-14 bg-slate-900 hover:bg-black text-white font-medium flex items-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-slate-200"
                    >
                        {isPending ? <IconLoader2 className="animate-spin" /> : <IconUserPlus size={22} />}
                        Crear Cuenta de Supabase
                    </Button>
                </CardContent>
            </Card>
        )
    }

    const assignedRoleIds = userRoles.map(ur => ur.role_id)
    const availableRoles = allRoles.filter(role => !assignedRoleIds.includes(role.id))

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Account Status */}
            <div className="flex items-center gap-4 p-6 rounded-3xl bg-emerald-50 border border-emerald-100/50 shadow-sm shadow-emerald-100/20">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-emerald-500 shadow-sm">
                    <IconShieldCheck size={24} />
                </div>
                <div>
                    <h3 className="text-emerald-900 font-medium text-sm">Cuenta Vinculada</h3>
                    <p className="text-emerald-700/70 text-xs font-medium">UID: {profile.auth_id}</p>
                </div>
                <Badge className="ml-auto bg-emerald-500 text-white border-none rounded-lg px-3 py-1 font-black text-[10px] uppercase">ACTIVO</Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Assign Role Panel */}
                <div className="lg:col-span-4">
                    <Card className="rounded-3xl border-none shadow-xl shadow-slate-200/50 bg-white sticky top-24">
                        <CardHeader>
                            <CardTitle className="text-xl font-medium text-slate-900">Asignar Nuevo Rol</CardTitle>
                            <CardDescription>Selecciona un rol de los disponibles para este usuario.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-medium text-slate-400 uppercase tracking-widest pl-1">Roles Disponibles</label>
                                <select
                                    value={selectedRoleId}
                                    onChange={(e) => setSelectedRoleId(e.target.value)}
                                    className="w-full h-12 rounded-2xl border-slate-100 bg-slate-50 px-4 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                                >
                                    <option value="">Seleccionar rol...</option>
                                    {availableRoles.map(role => (
                                        <option key={role.id} value={role.id}>{role.name}</option>
                                    ))}
                                </select>
                            </div>

                            {selectedRoleId && (
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 animate-in zoom-in-95 duration-200">
                                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                        {allRoles.find(r => r.id === selectedRoleId)?.description || 'Sin descripción disponible.'}
                                    </p>
                                </div>
                            )}

                            <Button
                                className="w-full h-12 rounded-2xl bg-primary text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                                onClick={handleAssignRole}
                                disabled={!selectedRoleId || isPending}
                            >
                                {isPending ? <IconLoader2 className="animate-spin" size={20} /> : <IconPlus size={20} />}
                                Asignar Rol
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Roles List */}
                <div className="lg:col-span-8">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <h2 className="text-xl font-medium text-slate-900">Roles Asignados</h2>
                            <Badge variant="outline" className="rounded-lg border-slate-100 bg-white text-slate-400 font-medium px-3 py-1">
                                {userRoles.length} ROLES
                            </Badge>
                        </div>

                        <DynamicTable
                            data={userRoles.map(ur => ({
                                id: ur.role_id,
                                name: ur.roles?.name || 'Desconocido',
                                description: ur.roles?.description || 'Sin descripción',
                                assigned_at: ur.assigned_at
                            }))}
                            emptyMessage="Este usuario no tiene roles asignados."
                            columns={[
                                {
                                    header: 'Rol',
                                    headerClassName: 'pl-8',
                                    render: (item) => (
                                        <div className="flex flex-col pl-2">
                                            <span className="font-medium text-sm text-slate-900 group-hover:text-primary transition-colors">{item.name}</span>
                                            <span className="text-[11px] text-slate-400 font-medium truncate max-w-[200px]">{item.description}</span>
                                        </div>
                                    )
                                },
                                {
                                    header: 'Fecha de Asignación',
                                    render: (item) => (
                                        <div className="text-slate-500 font-medium text-xs tabular-nums">
                                            {new Date(item.assigned_at).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    )
                                },
                                {
                                    header: '',
                                    className: 'w-[80px]',
                                    render: (item) => (
                                        <div className="flex justify-end">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-9 w-9 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleRemoveRole(item.id)
                                                }}
                                                disabled={isPending}
                                            >
                                                <IconTrash size={18} />
                                            </Button>
                                        </div>
                                    )
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
