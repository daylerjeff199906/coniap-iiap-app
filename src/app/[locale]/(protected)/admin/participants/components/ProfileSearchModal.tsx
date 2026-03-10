'use client'

import { useState, useTransition } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IconSearch, IconLoader2, IconCheck, IconUserPlus } from '@tabler/icons-react'
import { searchProfiles } from '../actions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ProfileSearchModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onProfileSelect: (profile: any) => void
}

export function ProfileSearchModal({ open, onOpenChange, onProfileSelect }: ProfileSearchModalProps) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<any[]>([])
    const [isSearching, setIsSearching] = useState(false)

    const handleSearch = async () => {
        if (!query.trim()) return
        setIsSearching(true)
        try {
            const data = await searchProfiles(query)
            setResults(data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsSearching(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden rounded-2xl shadow-2xl border-none">
                <DialogHeader className="bg-slate-900 text-white p-6">
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                        <IconSearch size={22} className="text-blue-400" />
                        Buscar Perfil Existente
                    </DialogTitle>
                    <DialogDescription className="text-slate-400 mt-1">
                        Busca por nombre o correo para evitar duplicados.
                    </DialogDescription>
                </DialogHeader>

                <div className="p-6 space-y-4 bg-white">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Nombre, apellido o email..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="rounded-xl h-11 bg-slate-50 border-slate-200"
                        />
                        <Button
                            onClick={handleSearch}
                            disabled={isSearching}
                            className="rounded-xl h-11 px-5 bg-slate-900 hover:bg-black text-white"
                        >
                            {isSearching ? <IconLoader2 className="animate-spin" size={18} /> : 'Buscar'}
                        </Button>
                    </div>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                        {results.length > 0 ? (
                            results.map((profile) => (
                                <button
                                    key={profile.id}
                                    onClick={() => onProfileSelect(profile)}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all text-left group"
                                >
                                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                        <AvatarImage src={profile.avatar_url} />
                                        <AvatarFallback className="bg-slate-100 text-slate-500 font-bold text-xs">
                                            {profile.first_name?.[0]}{profile.last_name?.[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-900 truncate group-hover:text-blue-700">
                                            {profile.first_name} {profile.last_name}
                                        </p>
                                        <p className="text-[11px] text-slate-500 truncate">{profile.email}</p>
                                        {profile.institution && (
                                            <p className="text-[10px] text-slate-400 truncate mt-0.5">{profile.institution}</p>
                                        )}
                                    </div>
                                    <IconCheck size={18} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            ))
                        ) : query && !isSearching ? (
                            <div className="py-10 text-center space-y-2">
                                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                                    <IconSearch size={24} />
                                </div>
                                <p className="text-sm text-slate-500 font-medium">No se encontraron resultados</p>
                                <p className="text-xs text-slate-400">Prueba con otro término de búsqueda.</p>
                            </div>
                        ) : (
                            <div className="py-10 text-center text-slate-400">
                                <p className="text-xs italic">Ingresa un nombre o correo para comenzar.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-center">
                    <p className="text-[10px] text-slate-400 flex items-center gap-1.5 font-medium uppercase tracking-wider">
                        <IconUserPlus size={12} />
                        Si no existe, completa el formulario principal
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
