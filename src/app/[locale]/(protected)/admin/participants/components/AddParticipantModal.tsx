'use client'

import { useState, useTransition, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { IconUserPlus, IconLoader2 } from '@tabler/icons-react'
import { createParticipant, getEditionsByEventList } from '../actions'
import { IParticipantRole } from '@/types/participant'
import { useLocale } from 'next-intl'
import { toast } from 'react-toastify'

interface AddParticipantModalProps {
    roles: IParticipantRole[]
    events: { id: string; name: string }[]
    initialEventId?: string
}

export function AddParticipantModal({ roles, events, initialEventId }: AddParticipantModalProps) {
    const locale = useLocale()
    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)

    const [selectedEventId, setSelectedEventId] = useState<string>(initialEventId || '')
    const [editions, setEditions] = useState<{ id: string; name: { es: string; en: string }; year: number }[]>([])
    const [isLoadingEditions, setIsLoadingEditions] = useState(false)

    useEffect(() => {
        if (selectedEventId) {
            setIsLoadingEditions(true)
            getEditionsByEventList(selectedEventId).then((data) => {
                setEditions(data as any)
                setIsLoadingEditions(false)
            })
        } else {
            setEditions([])
        }
    }, [selectedEventId])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)
        const formData = new FormData(e.currentTarget)

        startTransition(async () => {
            const result = await createParticipant(formData)
            if (result.error) {
                setError(result.error)
                toast.error(result.error)
            } else {
                toast.success('Participante registrado correctamente')
                setOpen(false)
                // Reset form state if needed, but Dialog unmount usually handles it
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-xl h-10 bg-[#0064e0] hover:bg-[#0057c2] text-white flex items-center gap-2 px-4 shadow-sm transition-all active:scale-95">
                    <IconUserPlus size={18} />
                    <span className="hidden sm:inline">Añadir Participante</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[540px] rounded-2xl border-slate-200 p-0 overflow-hidden shadow-lg">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="p-6 pb-2">
                        <DialogTitle className="text-xl font-bold tracking-tight">
                            Nuevo Registro
                        </DialogTitle>
                        <DialogDescription className="text-sm">
                            Registra a una persona en un evento o edición específica.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="px-6 py-2 grid gap-6">
                        {error && (
                            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first_name" className="text-xs font-semibold text-slate-500 ml-1">Nombres</Label>
                                <Input id="first_name" name="first_name" placeholder="Ej: Juan" className="rounded-xl bg-slate-50/50 border-slate-200 focus:bg-white transition-all h-11" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last_name" className="text-xs font-semibold text-slate-500 ml-1">Apellidos</Label>
                                <Input id="last_name" name="last_name" placeholder="Ej: Pérez" className="rounded-xl bg-slate-50/50 border-slate-200 focus:bg-white transition-all h-11" />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-xs font-semibold text-slate-500 ml-1">Correo Electrónico <span className="text-red-500">*</span></Label>
                            <Input id="email" name="email" type="email" placeholder="juan.perez@ejemplo.com" required className="rounded-xl bg-slate-50/50 border-slate-200 focus:bg-white transition-all h-11" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="role_id" className="text-xs font-semibold text-slate-500 ml-1">Rol en el Evento <span className="text-red-500">*</span></Label>
                            <Select name="role_id" required>
                                <SelectTrigger className="rounded-xl bg-slate-50/50 border-slate-200 h-11">
                                    <SelectValue placeholder="Seleccionar rol..." />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    {roles.map((role) => (
                                        <SelectItem key={role.id} value={role.id} className="rounded-lg my-0.5">
                                            {locale === 'es' ? role.name.es : role.name.en}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="main_event_id" className="text-xs font-semibold text-slate-500 ml-1">Evento Principal <span className="text-red-500">*</span></Label>
                                <Select
                                    name="main_event_id"
                                    defaultValue={selectedEventId}
                                    onValueChange={setSelectedEventId}
                                    required
                                >
                                    <SelectTrigger className="rounded-xl bg-slate-50/50 border-slate-200 h-11">
                                        <SelectValue placeholder="Elegir..." />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {events.map((event) => (
                                            <SelectItem key={event.id} value={event.id} className="rounded-lg my-0.5">
                                                {event.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="edition_id" className="text-xs font-semibold text-slate-500 ml-1">Edición (Opcional)</Label>
                                <Select name="edition_id">
                                    <SelectTrigger
                                        className="rounded-xl bg-slate-50/50 border-slate-200 h-11"
                                        disabled={!selectedEventId || isLoadingEditions}
                                    >
                                        <SelectValue placeholder={isLoadingEditions ? "..." : "Cualquiera"} />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectItem value="none" className="rounded-lg my-0.5 font-medium italic">Ninguna / General</SelectItem>
                                        {editions.map((edition) => (
                                            <SelectItem key={edition.id} value={edition.id} className="rounded-lg my-0.5">
                                                {locale === 'es' ? edition.name.es : edition.name.en} ({edition.year})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="px-6 py-6 border-t border-slate-100 mt-2 bg-slate-50/50">
                        <div className="flex w-full items-center justify-between">
                            <p className="text-[11px] text-muted-foreground italic">* Los campos marcados son obligatorios</p>
                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setOpen(false)}
                                    className="rounded-xl h-11 px-6 font-semibold border-slate-200"
                                    disabled={isPending}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-black hover:bg-slate-800 text-white rounded-xl px-8 h-11 font-bold min-w-[140px] shadow-sm transition-all active:scale-95"
                                    disabled={isPending}
                                >
                                    {isPending ? (
                                        <>
                                            <IconLoader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                                            Registrando...
                                        </>
                                    ) : "Registrar Participante"}
                                </Button>
                            </div>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
