'use client'

import React, { useState, useTransition, useEffect } from 'react'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'react-toastify'
import {
    IconSearch,
    IconUserPlus,
    IconTrash,
    IconLoader2,
    IconUserShield,
    IconCircleCheck,
    IconUsers,
    IconArrowsExchange
} from '@tabler/icons-react'
import { assignRole, removeRole } from '../roles-actions'
import { getUsersWithRoles } from '../roles-actions'
import { IRole } from '@/types/roles'
import { cn } from '@/lib/utils'
import { useRouter } from '@/i18n/routing'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface GlobalUserRoleAssignerProps {
    allRoles: IRole[]
}

export function GlobalUserRoleAssigner({ allRoles }: GlobalUserRoleAssignerProps) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')
    const [users, setUsers] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchUsers()
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchQuery])

    const fetchUsers = async () => {
        setIsLoading(true)
        const data = await getUsersWithRoles(searchQuery)
        setUsers(data)
        setIsLoading(false)
    }

    const handleAssign = (profileId: string, roleId: string) => {
        startTransition(async () => {
            const result = await assignRole(profileId, roleId)
            if (result.success) {
                toast.success('Rol asignado')
                fetchUsers()
                router.refresh()
            } else {
                toast.error(result.error)
            }
        })
    }

    const handleRemove = (profileId: string, roleId: string) => {
        startTransition(async () => {
            const result = await removeRole(profileId, roleId)
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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm">
                            <IconArrowsExchange size={22} stroke={1.5} />
                        </div>
                        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Asignación Global de Roles</h1>
                    </div>
                    <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
                        Gestiona los privilegios de los usuarios de forma directa. Busca un perfil para visualizar sus roles actuales o asignar nuevas capacidades administrativas.
                    </p>
                </div>
                <div className="relative w-full md:w-80">
                    <IconSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input
                        placeholder="Buscar por nombre o correo..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-11 h-11 rounded-xl border-slate-200 focus:ring-emerald-500 bg-white"
                    />
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center space-y-4">
                        <IconLoader2 size={40} className="animate-spin text-slate-200" />
                        <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">Consultando base de datos...</p>
                    </div>
                ) : users.length > 0 ? (
                    users.map((user) => (
                        <Card key={user.id} className="group relative overflow-hidden border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-50/50 transition-all duration-300 rounded-3xl bg-white p-6 w-full">
                            <div className="flex items-center gap-4 mb-6">
                                <Avatar className="h-12 w-12 rounded-2xl border-2 border-slate-50 shadow-sm">
                                    <AvatarImage src={user.avatar_url} />
                                    <AvatarFallback className="bg-slate-100 text-slate-500 font-semibold">
                                        {user.first_name?.[0]}{user.last_name?.[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0">
                                    <h3 className="font-semibold text-slate-900 truncate tracking-tight">{user.first_name} {user.last_name}</h3>
                                    <p className="text-[11px] text-slate-400 truncate italic">{user.email}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest pl-1">Roles Asignados</label>
                                    <div className="flex flex-wrap gap-2 min-h-[32px]">
                                        {user.user_roles?.length > 0 ? (
                                            user.user_roles.map((ur: any) => (
                                                <div
                                                    key={ur.role_id}
                                                    className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-semibold uppercase tracking-tight group/tag"
                                                >
                                                    {ur.roles?.name}
                                                    <button
                                                        onClick={() => handleRemove(user.id, ur.role_id)}
                                                        className="hover:bg-emerald-200 rounded p-0.5 transition-colors"
                                                        disabled={isPending}
                                                    >
                                                        <IconTrash size={12} />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-[10px] text-slate-300 italic pl-1">Sin roles asignados todavía.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-50">
                                    <Select onValueChange={(roleId) => handleAssign(user.id, roleId)}>
                                        <SelectTrigger className="h-10 rounded-xl border-slate-100 bg-slate-50/50 text-[11px] font-semibold uppercase tracking-wider text-slate-600 focus:ring-emerald-500 w-full">
                                            <div className="flex items-center gap-2">
                                                <IconUserPlus size={14} />
                                                <SelectValue placeholder="Asignar Nuevo Rol" />
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent className="rounded-2xl border-slate-100">
                                            {allRoles
                                                .filter(r => !user.user_roles?.some((ur: any) => ur.role_id === r.id))
                                                .map(r => (
                                                    <SelectItem key={r.id} value={r.id} className="rounded-xl text-xs font-medium">
                                                        {r.name}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[40px] bg-slate-50/30 text-center w-full">
                        <div className="w-20 h-20 rounded-3xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-200 mb-6">
                            <IconUsers size={40} stroke={1} />
                        </div>
                        <h3 className="text-slate-900 font-semibold text-xl">Sin resultados de búsqueda</h3>
                        <p className="text-slate-500 text-sm max-w-xs mt-2 italic">Ajusta tu consulta para encontrar usuarios y gestionar sus perfiles de acceso.</p>
                    </div>
                )}
            </div>

            {/* Help / Guide Box */}
            <div className="p-8 rounded-[32px] bg-slate-900 text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl overflow-hidden relative w-full">
                <div className="relative z-10 flex-1 space-y-2">
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                        Guía de Gestión de Identidad
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xl italic">
                        La asignación de roles es inmediata. Un usuario con múltiples roles heredará la unión de todos los permisos definidos en cada uno de ellos. Se recomienda usar el principio de "mínimo privilegio necesario".
                    </p>
                </div>
                <div className="relative z-10 grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                        <span className="block text-2xl font-semibold text-emerald-400">∞</span>
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-300">Roles / Usuario</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                        <span className="block text-2xl font-semibold text-emerald-400">LIVE</span>
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-300">Sincronización</span>
                    </div>
                </div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
            </div>
        </div>
    )
}
