'use client'

import { useState, useTransition, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
    IconSearch,
    IconLoader2,
    IconCheck,
    IconUserPlus,
    IconArrowRight,
    IconArrowLeft,
    IconCalendarEvent,
    IconTrophy,
} from '@tabler/icons-react'
import { searchProfiles, createParticipant, getEditionsByEventList } from '../actions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'react-toastify'
import { useLocale } from 'next-intl'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface AddExistingParticipantModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    roles: any[]
    events: any[]
}

type Step = 'search' | 'configure'

export function AddExistingParticipantModal({ open, onOpenChange, roles, events }: AddExistingParticipantModalProps) {
    const locale = useLocale()
    const [step, setStep] = useState<Step>('search')
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<any[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const [selectedProfile, setSelectedProfile] = useState<any | null>(null)
    const [isPending, startTransition] = useTransition()

    // Form states
    const [roleId, setRoleId] = useState('')
    const [targetType, setTargetType] = useState<'event' | 'edition'>('event')
    const [eventId, setEventId] = useState('')
    const [editionId, setEditionId] = useState('')
    const [editions, setEditions] = useState<any[]>([])
    const [isLoadingEditions, setIsLoadingEditions] = useState(false)

    // Reset on close
    useEffect(() => {
        if (!open) {
            setStep('search')
            setQuery('')
            setResults([])
            setSelectedProfile(null)
            setRoleId('')
            setTargetType('event')
            setEventId('')
            setEditionId('')
        }
    }, [open])

    // Load editions
    useEffect(() => {
        if (eventId) {
            setIsLoadingEditions(true)
            getEditionsByEventList(eventId).then((data) => {
                setEditions(data as any)
                setIsLoadingEditions(false)
            })
        }
    }, [eventId])

    const handleSearch = async () => {
        if (!query.trim()) return
        setIsSearching(true)
        try {
            const data = await searchProfiles(query)
            setResults(data)
        } catch (error) {
            console.error(error)
            toast.error('Error al buscar perfiles')
        } finally {
            setIsSearching(false)
        }
    }

    const handleProfileSelect = (profile: any) => {
        setSelectedProfile(profile)
        setStep('configure')
    }

    const handleConfirm = async () => {
        if (!selectedProfile || !roleId || !eventId || (targetType === 'edition' && !editionId)) {
            toast.warning('Por favor completa todos los campos requeridos')
            return
        }

        const formData = new FormData()
        formData.append('profile_id_from_search', selectedProfile.id)
        formData.append('first_name', selectedProfile.first_name)
        formData.append('last_name', selectedProfile.last_name)
        formData.append('email', selectedProfile.email)
        formData.append('role_id', roleId)
        formData.append('target_type', targetType)
        formData.append('main_event_id', eventId)
        if (targetType === 'edition') formData.append('edition_id', editionId)

        startTransition(async () => {
            const result = await createParticipant(formData)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Participante vinculado con éxito')
                onOpenChange(false)
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] overflow-hidden rounded-2xl border-slate-200 p-0 shadow-lg">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="text-xl font-bold tracking-tight">
                        {step === 'search' ? 'Vincular Perfil' : 'Configurar Participación'}
                    </DialogTitle>
                    <DialogDescription className="text-sm">
                        {step === 'search'
                            ? 'Busca a la persona en la base de datos central.'
                            : `Define el rol y evento para ${selectedProfile?.first_name} ${selectedProfile?.last_name}.`}
                    </DialogDescription>
                </DialogHeader>

                <div className="px-6 py-2 space-y-4">
                    {step === 'search' ? (
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                    <Input
                                        placeholder="Nombre, apellido o email..."
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        className="rounded-xl h-11 pl-10 bg-slate-50/50 border-slate-200"
                                    />
                                </div>
                                <Button
                                    onClick={handleSearch}
                                    disabled={isSearching}
                                    className="rounded-xl h-11 px-6 bg-slate-900 hover:bg-black text-white"
                                >
                                    {isSearching ? <IconLoader2 className="animate-spin" size={18} /> : 'Buscar'}
                                </Button>
                            </div>

                            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                                {results.length > 0 ? (
                                    results.map((profile) => (
                                        <button
                                            key={profile.id}
                                            onClick={() => handleProfileSelect(profile)}
                                            className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all text-left group"
                                        >
                                            <Avatar className="h-10 w-10 border border-slate-100">
                                                <AvatarImage src={profile.avatar_url} />
                                                <AvatarFallback className="bg-slate-100 text-slate-500 text-xs font-bold">
                                                    {profile.first_name?.[0]}{profile.last_name?.[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-slate-900 truncate">
                                                    {profile.first_name} {profile.last_name}
                                                </p>
                                                <p className="text-[11px] text-slate-500 truncate">{profile.email}</p>
                                            </div>
                                            <IconArrowRight size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
                                        </button>
                                    ))
                                ) : query && !isSearching ? (
                                    <div className="py-10 text-center text-slate-400">
                                        <p className="text-sm">No se encontraron resultados</p>
                                    </div>
                                ) : (
                                    <div className="py-10 text-center text-slate-300 text-xs">
                                        Ingresa un nombre para buscar perfiles existentes.
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-5 py-2">
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-slate-500 ml-1">Rol del Participante</Label>
                                <Select onValueChange={setRoleId} value={roleId}>
                                    <SelectTrigger className="rounded-xl h-11 bg-slate-50/50 border-slate-200">
                                        <SelectValue placeholder="Seleccionar rol..." />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {roles.map((role) => (
                                            <SelectItem key={role.id} value={role.id}>
                                                {locale === 'es' ? role.name.es : role.name.en}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-slate-500 ml-1">Ámbito de Registro</Label>
                                <RadioGroup
                                    onValueChange={(val: any) => setTargetType(val)}
                                    value={targetType}
                                    className="grid grid-cols-2 gap-3"
                                >
                                    <div
                                        className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition-all ${targetType === 'event' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
                                        onClick={() => setTargetType('event')}
                                    >
                                        <RadioGroupItem value="event" id="radio-event" className="sr-only" />
                                        <IconCalendarEvent size={18} className={targetType === 'event' ? 'text-primary' : 'text-slate-400'} />
                                        <span className={`text-xs font-bold ${targetType === 'event' ? 'text-primary' : 'text-slate-600'}`}>Global</span>
                                    </div>
                                    <div
                                        className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition-all ${targetType === 'edition' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
                                        onClick={() => setTargetType('edition')}
                                    >
                                        <RadioGroupItem value="edition" id="radio-edition" className="sr-only" />
                                        <IconTrophy size={18} className={targetType === 'edition' ? 'text-primary' : 'text-slate-400'} />
                                        <span className={`text-xs font-bold ${targetType === 'edition' ? 'text-primary' : 'text-slate-600'}`}>Edición</span>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-4 pt-2 border-t border-slate-100">
                                <div className="space-y-2">
                                    <Label className="text-xs font-semibold text-slate-500 ml-1">Evento Principal</Label>
                                    <Select onValueChange={setEventId} value={eventId}>
                                        <SelectTrigger className="rounded-xl h-11 bg-slate-50/50 border-slate-200">
                                            <SelectValue placeholder="Elegir evento..." />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            {events.map((event) => (
                                                <SelectItem key={event.id} value={event.id}>
                                                    {event.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {targetType === 'edition' && (
                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold text-slate-500 ml-1">Elegir Edición</Label>
                                        <Select
                                            onValueChange={setEditionId}
                                            value={editionId}
                                            disabled={!eventId || isLoadingEditions}
                                        >
                                            <SelectTrigger className="rounded-xl h-11 bg-slate-50/50 border-slate-200">
                                                <SelectValue placeholder={isLoadingEditions ? "Cargando..." : "Seleccionar año"} />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl">
                                                {editions.map((e) => (
                                                    <SelectItem key={e.id} value={e.id}>
                                                        {locale === 'es' ? e.name.es : e.name.en} ({e.year})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="p-6 bg-slate-50/80 border-t border-slate-100 flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => step === 'configure' ? setStep('search') : onOpenChange(false)}
                        className="rounded-xl h-11 px-6 font-semibold border-slate-200 shadow-sm"
                    >
                        {step === 'configure' ? 'Atrás' : 'Cancelar'}
                    </Button>
                    {step === 'configure' && (
                        <Button
                            onClick={handleConfirm}
                            disabled={isPending}
                            className="rounded-xl h-11 px-8 bg-black hover:bg-slate-800 text-white font-bold shadow-sm"
                        >
                            {isPending ? <IconLoader2 className="animate-spin" size={20} /> : 'Finalizar Asignación'}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
