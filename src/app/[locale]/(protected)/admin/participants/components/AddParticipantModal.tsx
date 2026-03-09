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
            <DialogContent className="sm:max-w-[500px] rounded-2xl p-0 overflow-hidden border-none shadow-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="bg-[#0064e0] p-6 text-white">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold flex items-center gap-2">
                                <IconUserPlus size={24} />
                                Nuevo Participante
                            </DialogTitle>
                            <DialogDescription className="text-blue-100 mt-1">
                                Registra a una persona en un evento o edición específica.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <div className="p-6 grid gap-5 bg-background">
                        {error && (
                            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-1.5">
                                <Label htmlFor="first_name" className="text-[13px] font-semibold text-muted-foreground ml-1">Nombres</Label>
                                <Input id="first_name" name="first_name" placeholder="Ej: Juan" className="rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="last_name" className="text-[13px] font-semibold text-muted-foreground ml-1">Apellidos</Label>
                                <Input id="last_name" name="last_name" placeholder="Ej: Pérez" className="rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                            </div>
                        </div>

                        <div className="grid gap-1.5">
                            <Label htmlFor="email" className="text-[13px] font-semibold text-muted-foreground ml-1">Correo Electrónico *</Label>
                            <Input id="email" name="email" type="email" placeholder="juan.perez@ejemplo.com" required className="rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                        </div>

                        <div className="grid gap-1.5">
                            <Label htmlFor="role_id" className="text-[13px] font-semibold text-muted-foreground ml-1">Rol en el Evento *</Label>
                            <Select name="role_id" required>
                                <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200 h-10">
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-1.5">
                                <Label htmlFor="main_event_id" className="text-[13px] font-semibold text-muted-foreground ml-1">Evento Principal *</Label>
                                <Select
                                    name="main_event_id"
                                    defaultValue={selectedEventId}
                                    onValueChange={setSelectedEventId}
                                    required
                                >
                                    <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200 h-10">
                                        <SelectValue placeholder="Seleccionar evento..." />
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

                            <div className="grid gap-1.5">
                                <Label htmlFor="edition_id" className="text-[13px] font-semibold text-muted-foreground ml-1">Edición (Opcional)</Label>
                                <Select name="edition_id">
                                    <SelectTrigger
                                        className="rounded-xl bg-slate-50 border-slate-200 h-10"
                                        disabled={!selectedEventId || isLoadingEditions}
                                    >
                                        <SelectValue placeholder={isLoadingEditions ? "Cargando..." : "Cualquiera"} />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectItem value="none">Ninguna / General</SelectItem>
                                        {editions.map((edition) => (
                                            <SelectItem key={edition.id} value={edition.id}>
                                                {locale === 'es' ? edition.name.es : edition.name.en} ({edition.year})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="p-6 pt-0 bg-background flex sm:justify-between items-center">
                        <p className="text-[11px] text-muted-foreground italic">* Campos obligatorios</p>
                        <div className="flex gap-3">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setOpen(false)}
                                className="rounded-xl"
                                disabled={isPending}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="bg-[#0064e0] hover:bg-[#0057c2] rounded-xl px-8 min-w-[120px]"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <>
                                        <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Guardando...
                                    </>
                                ) : "Registrar"}
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
