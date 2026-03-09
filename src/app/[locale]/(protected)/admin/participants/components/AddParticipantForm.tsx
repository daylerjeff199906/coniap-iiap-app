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
    IconBuilding,
    IconTrophy,
    IconCalendarEvent,
    IconFileText,
    IconUsers,
    IconLayoutGrid,
    IconUserPlus,
} from '@tabler/icons-react'
import { useRouter, Link } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import { toast } from 'react-toastify'
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
    profile_id_from_search: z.string().min(1),
}).refine((data) => {
    if (data.target_type === 'edition' && (!data.edition_id || data.edition_id === 'none' || data.edition_id === '')) {
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
            target_type: 'event',
            main_event_id: initialEventId || '',
            edition_id: '',
            profile_id_from_search: 'new',
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
                {/* Sticky Header */}
                <div className="sticky top-0 z-40 w-full mb-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-slate-100 py-4 px-1">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
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
                                <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">Registrar Participante</h1>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mt-1.5">
                                    Módulo de Participantes
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                type="button"
                                variant="ghost"
                                className="rounded-xl h-10 px-6 text-slate-500 font-semibold hover:bg-slate-100"
                                onClick={() => router.back()}
                                disabled={isPending}
                            >
                                Descartar
                            </Button>
                            <Button
                                type="submit"
                                className="bg-slate-900 hover:bg-black rounded-xl h-10 px-8 font-bold shadow-md shadow-slate-200/60 transition-all active:scale-95 text-sm"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <>
                                        <IconLoader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                                        Registrando...
                                    </>
                                ) : (
                                    <span className="flex items-center gap-2 text-white">
                                        <IconUserPlus size={18} />
                                        Confirmar Registro
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* ── MAIN CONTENT ── */}
                <div className="flex flex-col gap-10 px-4 sm:px-0 mt-4">
                    {/* SECTION 1: Datos Personales */}
                    <section>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-[15px]">Datos Personales</h3>
                                <p className="text-[11px] text-muted-foreground">Información básica y profesional del participante.</p>
                            </div>
                        </div>
                        <hr className="my-5 border-slate-100" />

                        <div className="grid gap-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="first_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">Nombres</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Juan Carlos" {...field} className="rounded-xl h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all shadow-none" />
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
                                            <FormLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">Apellidos</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Pérez García" {...field} className="rounded-xl h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all shadow-none" />
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
                                        <FormLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">Correo Electrónico <span className="text-primary">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="email@dominio.com" {...field} className="rounded-xl h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all shadow-none" />
                                        </FormControl>
                                        <FormDescription className="text-[10px] ml-0.5">Se usará para la vinculación de eventos.</FormDescription>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="institution"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-0.5 flex items-center gap-1.5">
                                            <IconBuilding size={12} />
                                            Institución <span className="font-normal normal-case opacity-60">(opcional)</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nombre de la organización" {...field} className="rounded-xl h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all shadow-none" />
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
                                        <FormLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">Reseña Biográfica <span className="font-normal normal-case opacity-60">(opcional)</span></FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Breve reseña biográfica..." {...field} className="rounded-xl min-h-[100px] bg-slate-50 border-slate-200 resize-none focus:bg-white transition-all shadow-none" />
                                        </FormControl>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </section>

                    {/* SECTION 2: Asignación al Evento */}
                    <section>
                        <div>
                            <h3 className="font-bold text-[15px]">Asignación al Evento</h3>
                            <p className="text-[11px] text-muted-foreground">Configura el rol y nivel de participación según la regla de negocio.</p>
                        </div>
                        <hr className="my-5 border-slate-100" />

                        <div className="grid gap-6">
                            <FormField
                                control={form.control}
                                name="role_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">Rol Designado</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="rounded-xl h-11 bg-slate-50 border-slate-200 shadow-none">
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
                                        <FormLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">Nivel de Asignación <span className="text-primary italic font-normal normal-case ml-2">(Regla XOR: Evento o Edición)</span></FormLabel>
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
                                                    <FormLabel className={`flex flex-col items-center justify-between rounded-xl border-2 p-4 hover:bg-slate-50 cursor-pointer transition-all ${field.value === 'event' ? 'border-primary bg-primary/[0.03] ring-1 ring-primary/20' : 'border-slate-100 opacity-60'}`}>
                                                        <IconCalendarEvent size={22} className={field.value === 'event' ? 'text-primary' : 'text-slate-400'} />
                                                        <div className="text-center mt-2">
                                                            <span className="font-bold text-xs block">Evento Global</span>
                                                            <span className="text-[9px] text-muted-foreground font-normal">Sin edición específica</span>
                                                        </div>
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem>
                                                    <FormControl>
                                                        <RadioGroupItem value="edition" className="sr-only" />
                                                    </FormControl>
                                                    <FormLabel className={`flex flex-col items-center justify-between rounded-xl border-2 p-4 hover:bg-slate-50 cursor-pointer transition-all ${field.value === 'edition' ? 'border-primary bg-primary/[0.03] ring-1 ring-primary/20' : 'border-slate-100 opacity-60'}`}>
                                                        <IconTrophy size={22} className={field.value === 'edition' ? 'text-primary' : 'text-slate-400'} />
                                                        <div className="text-center mt-2">
                                                            <span className="font-bold text-xs block">Edición Especial</span>
                                                            <span className="text-[9px] text-muted-foreground font-normal">Asignar a un año/versión</span>
                                                        </div>
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
                                            <FormLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">Evento Principal</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="rounded-xl h-11 bg-slate-50 border-slate-200 shadow-none">
                                                        <SelectValue placeholder="Seleccionar..." />
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
                                            <FormLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">
                                                Edición {targetType === 'edition' && <span className="text-primary">*</span>}
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                disabled={targetType !== 'edition' || !selectedEventId || isLoadingEditions}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className={`rounded-xl h-11 bg-slate-50 border-slate-200 shadow-none ${targetType !== 'edition' ? 'opacity-40 grayscale cursor-not-allowed' : ''}`}>
                                                        <SelectValue placeholder={isLoadingEditions ? "..." : (targetType === 'edition' ? "Elegir edición" : "N/A")} />
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
                    <section className="bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200 p-6 opacity-60 grayscale-[0.5]">
                        <div className="mb-6">
                            <span className="text-[9px] uppercase tracking-[0.2em] font-black text-slate-400 border border-slate-300 rounded-full px-2 py-0.5">Próximamente</span>
                            <h3 className="font-bold text-[14px] text-slate-600 mt-3">Módulos de Gestión Avanzada</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {FUTURE_MODULES.map((mod) => (
                                <div key={mod.label} className="p-3 flex items-center gap-3 bg-white rounded-xl border border-slate-100">
                                    <div className={`w-7 h-7 rounded-lg ${mod.bg} ${mod.color} flex items-center justify-center shrink-0`}>
                                        <mod.icon size={14} />
                                    </div>
                                    <p className="font-bold text-[10px] text-slate-500 truncate uppercase tracking-tighter">{mod.label}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </form>
        </Form>
    )
}
