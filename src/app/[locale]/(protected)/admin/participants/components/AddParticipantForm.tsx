'use client'

import { useState, useTransition, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
    IconUserPlus,
    IconLoader2,
    IconChevronLeft,
    IconUser,
    IconTrophy,
    IconBuilding,
    IconExternalLink,
    IconCalendarEvent,
    IconFileText,
    IconUsers,
    IconLayoutGrid,
    IconShieldCheck
} from '@tabler/icons-react'
import { createParticipant, getEditionsByEventList } from '../actions'
import { IParticipantRole } from '@/types/participant'
import { useLocale } from 'next-intl'
import { toast } from 'react-toastify'
import { Link, useRouter } from '@/i18n/routing'
import { Badge } from '@/components/ui/badge'

interface AddParticipantFormProps {
    roles: IParticipantRole[]
    events: { id: string; name: string }[]
    initialEventId?: string
}

const FUTURE_MODULES = [
    { icon: IconFileText, label: 'Resúmenes y Ponencias', description: 'Gestiona los resúmenes o abstracts subidos por el participante.', color: 'text-violet-500', bg: 'bg-violet-50' },
    { icon: IconLayoutGrid, label: 'Materiales & Archivos', description: 'Presentaciones, certificados y documentos adjuntos.', color: 'text-amber-500', bg: 'bg-amber-50' },
    { icon: IconUsers, label: 'Grupos & Sesiones', description: 'Asignación a talleres, mesas de trabajo o sesiones específicas.', color: 'text-emerald-500', bg: 'bg-emerald-50' },
]

export function AddParticipantForm({ roles, events, initialEventId }: AddParticipantFormProps) {
    const locale = useLocale()
    const router = useRouter()
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

    const backUrl = initialEventId
        ? `/admin/events/${initialEventId}/participants`
        : '/admin/participants'

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)
        const formData = new FormData(e.currentTarget)

        startTransition(async () => {
            const result = await createParticipant(formData)
            if (result.error) {
                setError(result.error)
                toast.error(result.error)
                window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
                toast.success('¡Participante registrado correctamente!')
                router.push(backUrl as any)
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto pb-20">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    asChild
                    className="rounded-full hover:bg-slate-100 shrink-0"
                >
                    <Link href={backUrl as any}>
                        <IconChevronLeft size={22} />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Registrar Nuevo Participante</h1>
                    <p className="text-sm text-muted-foreground">Añade manualmente una persona a un evento o edición.</p>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 mb-8 flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    <div>
                        <p className="font-semibold text-sm">Error al registrar</p>
                        <p className="text-xs mt-0.5 opacity-80">{error}</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* ── LEFT SIDEBAR ── */}
                <div className="lg:col-span-1 flex flex-col gap-5">
                    {/* Preview Card */}
                    <div className="bg-white rounded-2xl border p-6 shadow-sm sticky top-24">
                        <h3 className="font-bold text-sm mb-4 flex items-center gap-2 text-foreground">
                            <IconUser size={16} className="text-primary" />
                            Previsualización
                        </h3>
                        <div className="flex flex-col items-center py-5 bg-slate-50 rounded-xl mb-4 border border-dashed border-slate-200">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-400 mb-2 shadow-inner">
                                <IconUser size={30} />
                            </div>
                            <span className="text-sm font-semibold text-slate-500">Nuevo Perfil</span>
                            <span className="text-[10px] text-slate-400 mt-0.5">Sin registrar aún</span>
                        </div>

                        <div className="space-y-2.5 text-xs">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Origen:</span>
                                <Badge className="text-[10px] uppercase tracking-tighter px-2 py-0 shadow-none bg-blue-50 text-blue-600 border border-blue-100" variant="secondary">
                                    Manual
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Estado:</span>
                                <span className="text-amber-600 font-semibold">Pendiente</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Evento:</span>
                                <span className="font-medium truncate max-w-[130px] text-right">
                                    {events.find(e => e.id === selectedEventId)?.name || '—'}
                                </span>
                            </div>
                        </div>

                        <hr className="my-5 border-slate-100" />

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full rounded-xl text-xs gap-2 opacity-50 cursor-not-allowed"
                            disabled
                        >
                            Ver Perfil Completo
                            <IconExternalLink size={13} />
                        </Button>
                        <p className="text-[10px] text-center text-muted-foreground mt-2 italic leading-relaxed">
                            Disponible tras el registro inicial desde la tabla de participantes.
                        </p>
                    </div>
                </div>

                {/* ── MAIN CONTENT ── */}
                <div className="lg:col-span-2 flex flex-col gap-7">

                    {/* ── SECTION 1: Datos Personales ── */}
                    <section className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                        <div className="flex items-center gap-3 p-6 border-b bg-slate-50/50">
                            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                                <IconUser size={18} />
                            </div>
                            <div>
                                <h3 className="font-bold text-[15px]">Datos Personales</h3>
                                <p className="text-[11px] text-muted-foreground">Información básica y profesional del participante.</p>
                            </div>
                        </div>
                        <div className="p-6 grid gap-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-1.5">
                                    <Label htmlFor="first_name" className="text-[11px] font-semibold text-muted-foreground ml-0.5 uppercase tracking-wide">Nombres</Label>
                                    <Input id="first_name" name="first_name" placeholder="Ej: Juan Carlos" className="rounded-xl h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors" required />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label htmlFor="last_name" className="text-[11px] font-semibold text-muted-foreground ml-0.5 uppercase tracking-wide">Apellidos</Label>
                                    <Input id="last_name" name="last_name" placeholder="Ej: Pérez García" className="rounded-xl h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors" required />
                                </div>
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="email" className="text-[11px] font-semibold text-muted-foreground ml-0.5 uppercase tracking-wide">
                                    Correo Electrónico <span className="text-[#0064e0]">*</span>
                                </Label>
                                <Input id="email" name="email" type="email" placeholder="juan.perez@ejemplo.com" required className="rounded-xl h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                                <p className="text-[10px] text-muted-foreground ml-0.5">Si el correo ya existe en el sistema, se vinculará automáticamente al perfil existente.</p>
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="institution" className="text-[11px] font-semibold text-muted-foreground ml-0.5 uppercase tracking-wide flex items-center gap-1.5">
                                    <IconBuilding size={12} />
                                    Institución / Organización <span className="font-normal normal-case">(opcional)</span>
                                </Label>
                                <Input id="institution" name="institution" placeholder="Ej: Universidad Nacional de la Amazonía Peruana" className="rounded-xl h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="bio" className="text-[11px] font-semibold text-muted-foreground ml-0.5 uppercase tracking-wide">
                                    Reseña Biográfica <span className="font-normal normal-case">(opcional)</span>
                                </Label>
                                <Textarea id="bio" name="bio" placeholder="Breve semblanza o descripción del participante, utilizada en agendas y perfiles públicos..." className="rounded-xl min-h-[100px] bg-slate-50 border-slate-200 resize-none focus:bg-white transition-colors text-sm" />
                            </div>
                        </div>
                    </section>

                    {/* ── SECTION 2: Asignación al Evento ── */}
                    <section className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                        <div className="flex items-center gap-3 p-6 border-b bg-slate-50/50">
                            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                <IconTrophy size={18} />
                            </div>
                            <div>
                                <h3 className="font-bold text-[15px]">Asignación al Evento</h3>
                                <p className="text-[11px] text-muted-foreground">Configura el rol y en qué evento o edición participará esta persona.</p>
                            </div>
                        </div>
                        <div className="p-6 grid gap-5">
                            <div className="grid gap-1.5">
                                <Label htmlFor="role_id" className="text-[11px] font-semibold text-muted-foreground ml-0.5 uppercase tracking-wide">
                                    Rol Designado <span className="text-[#0064e0]">*</span>
                                </Label>
                                <Select name="role_id" required>
                                    <SelectTrigger className="rounded-xl h-11 bg-slate-50 border-slate-200">
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
                                    <Label className="text-[11px] font-semibold text-muted-foreground ml-0.5 uppercase tracking-wide flex items-center gap-1">
                                        <IconCalendarEvent size={12} />
                                        Evento Principal <span className="text-[#0064e0]">*</span>
                                    </Label>
                                    <Select
                                        name="main_event_id"
                                        defaultValue={selectedEventId}
                                        onValueChange={setSelectedEventId}
                                        required
                                    >
                                        <SelectTrigger className="rounded-xl h-11 bg-slate-50 border-slate-200">
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
                                    <Label className="text-[11px] font-semibold text-muted-foreground ml-0.5 uppercase tracking-wide">
                                        Edición <span className="font-normal normal-case">(opcional)</span>
                                    </Label>
                                    <Select name="edition_id">
                                        <SelectTrigger
                                            className="rounded-xl h-11 bg-slate-50 border-slate-200"
                                            disabled={!selectedEventId || isLoadingEditions}
                                        >
                                            <SelectValue placeholder={isLoadingEditions ? "Cargando..." : "General / No específica"} />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            <SelectItem value="none">General / No específica</SelectItem>
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
                    </section>

                    {/* Hidden Registration Info */}
                    <input type="hidden" name="registration_type" value="manual" />

                    {/* ── SECTION 3: Módulos Futuros ── */}
                    <section className="rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden">
                        <div className="p-6 pb-4">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 border border-slate-200 rounded-full px-2 py-0.5">Próximamente</span>
                            <h3 className="font-bold text-[15px] text-slate-500 mt-3">Módulos de Contenido Adicional</h3>
                            <p className="text-[11px] text-slate-400 mt-1">
                                Estos módulos estarán disponibles desde la ficha de detalle del participante, una vez registrado.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px border-t border-dashed border-slate-200">
                            {FUTURE_MODULES.map((mod) => (
                                <div key={mod.label} className="p-5 flex flex-col gap-2 bg-white/60">
                                    <div className={`w-8 h-8 rounded-lg ${mod.bg} ${mod.color} flex items-center justify-center`}>
                                        <mod.icon size={16} />
                                    </div>
                                    <p className="font-semibold text-[12px] text-slate-600">{mod.label}</p>
                                    <p className="text-[10px] text-slate-400 leading-relaxed">{mod.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── ACTIONS ── */}
                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            variant="ghost"
                            className="rounded-xl h-11 px-8"
                            onClick={() => router.back()}
                            disabled={isPending}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="bg-[#0064e0] hover:bg-[#0057c2] rounded-full h-11 px-10 font-semibold shadow-lg shadow-blue-200/60 transition-all active:scale-95 text-sm"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Procesando...
                                </>
                            ) : (
                                <>
                                    <IconUserPlus className="mr-2 h-4 w-4" />
                                    Registrar Participante
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}
