'use client'

import React, { useState, useTransition, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'react-toastify'
import {
    IconSearch,
    IconLoader2,
    IconUserPlus,
    IconFileText,
    IconX
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
        <div className="w-full space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative w-full md:w-64">
                        <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input
                            placeholder="Filter members..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 h-9 border-slate-200 rounded-md bg-white text-sm focus-visible:ring-indigo-500 shadow-sm"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-9 px-4 gap-2 border-slate-200 text-slate-600 text-[13px] font-medium rounded-md hover:bg-slate-50 shadow-sm transition-all">
                            <IconFileText size={16} />
                            Docs
                        </Button>
                        <Button size="sm" className="h-9 px-4 gap-2 bg-[#50e3c2] hover:bg-[#45d1b1] text-indigo-950 text-[13px] font-semibold rounded-md transition-all border-none shadow-sm active:scale-95">
                            <IconUserPlus size={16} />
                            Invite members
                        </Button>
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
                                    <div className="flex items-center gap-2">
                                        <span className="text-[13px] font-medium text-slate-600 truncate max-w-[200px]">{user.email}</span>
                                        <span className="text-[9px] font-bold text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded uppercase tracking-tighter bg-white">YOU</span>
                                    </div>
                                </div>
                                
                                <div className="col-span-3">
                                    <div className="flex items-center gap-2 text-[13px] text-slate-500">
                                        <span>Active</span>
                                        <IconCircleCheck size={14} className="text-slate-300" />
                                    </div>
                                </div>

                                <div className="col-span-4 flex items-center justify-between">
                                    <div className="flex flex-wrap gap-1.5 min-w-0 flex-1 pr-4">
                                        {user.user_roles?.length > 0 ? (
                                            user.user_roles.map((ur: any) => (
                                                <div
                                                    key={ur.role_id}
                                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium text-slate-700 bg-slate-100 border border-slate-200"
                                                >
                                                    {ur.roles?.name}
                                                    <button
                                                        onClick={() => handleRemove(user.id, ur.role_id)}
                                                        className="hover:text-red-600 transition-colors"
                                                        disabled={isPending}
                                                    >
                                                        <IconX size={12} />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <Select onValueChange={(roleId) => handleAssign(user.id, roleId)}>
                                                <SelectTrigger className="h-8 w-fit min-w-[140px] rounded border-slate-200 bg-white text-[11px] text-slate-500">
                                                    <SelectValue placeholder="Asignar rol..." />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-md">
                                                    {allRoles.map(r => (
                                                        <SelectItem key={r.id} value={r.id} className="text-xs">{r.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}

                                        {user.user_roles?.length > 0 && (
                                            <Select onValueChange={(roleId) => handleAssign(user.id, roleId)}>
                                                <SelectTrigger className="h-6 w-6 rounded-full border-dashed border-slate-300 flex items-center justify-center p-0 hover:border-indigo-400 transition-colors">
                                                    <IconUserPlus size={12} className="text-slate-400" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-md">
                                                    {allRoles
                                                        .filter(r => !user.user_roles?.some((ur: any) => ur.role_id === r.id))
                                                        .map(r => (
                                                            <SelectItem key={r.id} value={r.id} className="text-xs">{r.name}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        )}
                                    </div>

                                    <Button variant="outline" size="sm" className="h-8 px-3 rounded-md border-slate-200 text-slate-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                        Abandonar equipo
                                    </Button>
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
        </div>
    )
}
