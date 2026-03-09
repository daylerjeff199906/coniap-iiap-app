'use client'

import { useTransition, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    IconChevronLeft,
    IconLoader2,
    IconUser,
    IconBuilding,
    IconTrophy,
    IconCalendarEvent,
    IconFileText,
    IconUsers,
    IconLayoutGrid,
    IconExternalLink,
} from '@tabler/icons-react'
import { useRouter, Link } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import { toast } from 'react-toastify'
import { Badge } from '@/components/ui/badge'
import { createParticipant, getEditionsByEventList } from '../actions'
import { IParticipantRole } from '@/types/participant'

const formSchema = z.object({
    first_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    last_name: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
    email: z.string().email('Correo electrónico no válido'),
    institution: z.string().optional(),
    bio: z.string().optional(),
    role_id: z.string().min(1, 'Debes seleccionar un rol'),
    target_type: z.enum(['event', 'edition'], {
        required_error: 'Debes seleccionar si se asigna a nivel global o a una edición',
    }),
    main_event_id: z.string().min(1, 'Debes seleccionar un evento'),
    edition_id: z.string().optional(),
}).refine((data) => {
    if (data.target_type === 'edition' && (!data.edition_id || data.edition_id === 'none')) {
        return false
    }
    return true
}, {
    message: "Debes seleccionar una edición si eliges 'Por Edición'",
    path: ["edition_id"],
})

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
    const [editions, setEditions] = useState<{ id: string; name: { es: string; en: string }; year: number }[]>([])
    const [isLoadingEditions, setIsLoadingEditions] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            institution: '',
            bio: '',
            role_id: '',
            target_type: 'event', // Por defecto a nivel de evento global
            main_event_id: initialEventId || '',
            edition_id: '',
        },
    })

    const selectedEventId = form.watch('main_event_id')
    const targetType = form.watch('target_type')

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

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData()
        Object.entries(values).forEach(([key, value]) => {
            if (value) formData.append(key, value)
        })


        startTransition(async () => {
            const result = await createParticipant(formData)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('¡Participante registrado correctamente!')
                router.push(backUrl as any)
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto pb-20">
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* ── LEFT SIDEBAR (Preview) ── */}
                    <div className="lg:col-span-1 flex flex-col gap-5">
                        <div className=" sticky top-24">
                            <h3 className="font-bold text-sm mb-4 flex items-center gap-2 text-foreground">
                                <IconUser size={16} className="text-primary" />
                                Previsualización
                            </h3>
                            <div className="flex flex-col items-center py-5 bg-slate-50 rounded-xl mb-4 border border-dashed border-slate-200">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-400 mb-2 shadow-inner">
                                    <IconUser size={30} />
                                </div>
                                <span className="text-sm font-semibold text-slate-500">
                                    {form.watch('first_name') || form.watch('last_name')
                                        ? `${form.watch('first_name')} ${form.watch('last_name')}`.trim()
                                        : 'Nuevo Perfil'}
                                </span>
                                <span className="text-[10px] text-slate-400 mt-0.5">Sin registrar aún</span>
                            </div>

                            <div className="space-y-2.5 text-xs">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Asignación:</span>
                                    <Badge className="text-[10px] uppercase tracking-tighter px-2 py-0 shadow-none bg-blue-50 text-blue-600 border border-blue-100" variant="secondary">
                                        {targetType === 'event' ? 'Evento Global' : 'Edición Específica'}
                                    </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Evento:</span>
                                    <span className="font-medium truncate max-w-[130px] text-right">
                                        {events.find(e => e.id === selectedEventId)?.name || '—'}
                                    </span>
                                </div>
                            </div>

                            <hr className="my-5 border-slate-100" />
                            <Button type="button" variant="outline" className="w-full rounded-xl text-xs gap-2 opacity-50 cursor-not-allowed" disabled>
                                Ver Perfil Completo
                                <IconExternalLink size={13} />
                            </Button>
                        </div>
                    </div>

                    {/* ── MAIN CONTENT ── */}
                    <div className="lg:col-span-2 flex flex-col gap-7">
                        {/* SECTION 1: Datos Personales */}
                        <section className="">
                            <div>
                                <h3 className="font-bold text-[15px]">Datos Personales</h3>
                                <p className="text-[11px] text-muted-foreground">Información básica y profesional del participante.</p>
                            </div>
                            <hr className="my-5 border-slate-100" />
                            <div className="grid gap-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="first_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[11px] font-semibold text-muted-foreground uppercase ml-0.5">Nombres</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ej: Juan Carlos" {...field} className="rounded-xl h-11 bg-slate-50 border-slate-200" />
                                                </FormControl>
                                                <FormMessage className="text-[10px]" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="last_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[11px] font-semibold text-muted-foreground uppercase ml-0.5">Apellidos</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ej: Pérez García" {...field} className="rounded-xl h-11 bg-slate-50 border-slate-200" />
                                                </FormControl>
                                                <FormMessage className="text-[10px]" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[11px] font-semibold text-muted-foreground uppercase ml-0.5">Correo Electrónico <span className="text-primary">*</span></FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="juan.perez@ejemplo.com" {...field} className="rounded-xl h-11 bg-slate-50 border-slate-200" />
                                            </FormControl>
                                            <FormDescription className="text-[10px]">Se vinculará automáticamente si el correo ya existe.</FormDescription>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="institution"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[11px] font-semibold text-muted-foreground uppercase ml-0.5 flex items-center gap-1.5">
                                                <IconBuilding size={12} />
                                                Institución <span className="font-normal normal-case">(opcional)</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ej: Universidad Nacional de la Amazonía Peruana" {...field} className="rounded-xl h-11 bg-slate-50 border-slate-200" />
                                            </FormControl>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[11px] font-semibold text-muted-foreground uppercase ml-0.5">Reseña Biográfica <span className="font-normal normal-case">(opcional)</span></FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Breve semblanza..." {...field} className="rounded-xl min-h-[100px] bg-slate-50 border-slate-200 resize-none" />
                                            </FormControl>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </section>

                        {/* SECTION 2: Asignación al Evento */}
                        <section className="">
                            <div>
                                <h3 className="font-bold text-[15px]">Asignación al Evento</h3>
                                <p className="text-[11px] text-muted-foreground">Configura el rol y nivel de participación.</p>
                            </div>
                            <hr className="my-5 border-slate-100" />
                            <div className="grid gap-6">
                                <FormField
                                    control={form.control}
                                    name="role_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[11px] font-semibold text-muted-foreground uppercase ml-0.5">Rol Designado</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="rounded-xl h-11 bg-slate-50 border-slate-200">
                                                        <SelectValue placeholder="Seleccionar rol..." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="rounded-xl">
                                                    {roles.map((role) => (
                                                        <SelectItem key={role.id} value={role.id}>
                                                            {locale === 'es' ? role.name.es : role.name.en}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="target_type"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className="text-[11px] font-semibold text-muted-foreground uppercase ml-0.5">Nivel de Asignación</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="grid grid-cols-2 gap-4"
                                                >
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="event" className="sr-only" />
                                                        </FormControl>
                                                        <FormLabel className={`flex flex-col items-center justify-between rounded-xl border-2 p-4 hover:bg-slate-50 cursor-pointer transition-all ${field.value === 'event' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-slate-100'}`}>
                                                            <IconCalendarEvent size={20} className={field.value === 'event' ? 'text-primary' : 'text-slate-400'} />
                                                            <span className="font-bold text-xs mt-2">Evento Global</span>
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="edition" className="sr-only" />
                                                        </FormControl>
                                                        <FormLabel className={`flex flex-col items-center justify-between rounded-xl border-2 p-4 hover:bg-slate-50 cursor-pointer transition-all ${field.value === 'edition' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-slate-100'}`}>
                                                            <IconTrophy size={20} className={field.value === 'edition' ? 'text-primary' : 'text-slate-400'} />
                                                            <span className="font-bold text-xs mt-2">Edición Específica</span>
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="main_event_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[11px] font-semibold text-muted-foreground uppercase ml-0.5">Evento Principal</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="rounded-xl h-11 bg-slate-50 border-slate-200">
                                                            <SelectValue placeholder="Seleccionar evento..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="rounded-xl">
                                                        {events.map((event) => (
                                                            <SelectItem key={event.id} value={event.id}>
                                                                {event.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-[10px]" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="edition_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[11px] font-semibold text-muted-foreground uppercase ml-0.5">
                                                    Edición {targetType === 'edition' && <span className="text-primary">*</span>}
                                                </FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    disabled={targetType !== 'edition' || !selectedEventId || isLoadingEditions}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className={`rounded-xl h-11 bg-slate-50 border-slate-200 ${targetType !== 'edition' ? 'opacity-50' : ''}`}>
                                                            <SelectValue placeholder={isLoadingEditions ? "Cargando..." : (targetType === 'edition' ? "Seleccionar edición..." : "N/A")} />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="rounded-xl">
                                                        {editions.map((edition) => (
                                                            <SelectItem key={edition.id} value={edition.id}>
                                                                {locale === 'es' ? edition.name.es : edition.name.en} ({edition.year})
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-[10px]" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* SECTION 3: Módulos Futuros */}
                        <section className="rounded-2xl border-2 border-dashed border-slate-200 p-6">
                            <div className="mb-6">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 border border-slate-200 rounded-full px-2 py-0.5">Próximamente</span>
                                <h3 className="font-bold text-[15px] text-slate-500 mt-3">Módulos de Contenido Adicional</h3>
                                <p className="text-[11px] text-slate-400 mt-1">Funcionalidades disponibles tras el registro.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {FUTURE_MODULES.map((mod) => (
                                    <div key={mod.label} className="p-4 flex flex-col gap-2 bg-slate-50 rounded-xl">
                                        <div className={`w-8 h-8 rounded-lg ${mod.bg} ${mod.color} flex items-center justify-center`}>
                                            <mod.icon size={16} />
                                        </div>
                                        <p className="font-semibold text-[11px] text-slate-600 truncate">{mod.label}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* ACTIONS */}
                        <div className="flex justify-end gap-3 pt-4">
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
                                        Registrando...
                                    </>
                                ) : (
                                    'Registrar Participante'
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    )
}
