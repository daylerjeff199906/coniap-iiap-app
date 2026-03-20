'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { upsertActivity, getMainEventsList, getEditionsList, ActivityItem } from '../actions'
import { ActivityFormInput, activitySchema } from '../schema'
import { toast } from 'react-toastify'
import { useRouter } from '@/i18n/routing'
import { Card, CardContent } from '@/components/ui/card'
import { IconDeviceFloppy, IconClock, IconVideo, IconCalendar, IconMapPin, IconPlus, IconTrash } from '@tabler/icons-react'
import { useLocale } from 'next-intl'
import { BannerUploadModal } from './BannerUploadModal'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'


interface ActivityFormProps {
    activity?: ActivityItem
    defaultMainEventId?: string
    defaultEditionId?: string
    backHref?: string
}

interface LocalizedString {
    en?: string
    es?: string
}

const sessionTypeLabels: Record<string, string> = {
    keynote: 'Charla Magistral',
    presentation: 'Presentación de Paper / Trabajo',
    panel: 'Panel de Discusión',
    workshop: 'Taller Práctico',
    networking: 'Evento Social / Networking',
    break: 'Coffee Break / Almuerzo',
    other: 'Otro'
}

export function ActivityForm({ activity, defaultMainEventId, defaultEditionId, backHref }: ActivityFormProps) {
    const router = useRouter()
    const locale = useLocale() as 'en' | 'es'
    const [isPending, startTransition] = useTransition()
    const [eventsList, setEventsList] = useState<{ id: string; name: string | LocalizedString }[]>([])
    const [editionsList, setEditionsList] = useState<{ id: string; name: string | LocalizedString; main_event_id: string }[]>([])
    const [filteredEditions, setFilteredEditions] = useState<{ id: string; name: string | LocalizedString }[]>([])

    const isEdit = !!activity

    const parsedStreams = (() => {
        if (activity?.stream_url) {
            try {
                const parsed = JSON.parse(activity.stream_url)
                if (Array.isArray(parsed)) return parsed
            } catch (e) {
                if (activity.stream_platform || activity.stream_url) {
                    return [{
                        platform: activity.stream_platform || 'other',
                        url: activity.stream_url || '',
                        password: activity.stream_password || ''
                    }]
                }
            }
        }
        return []
    })()

    const form = useForm<ActivityFormInput>({
        resolver: zodResolver(activitySchema),
        defaultValues: {
            title: activity?.title || '',
            session_date: activity?.session_date || '',
            start_time: activity?.start_time || '',
            end_time: activity?.end_time || '',
            short_description: activity?.short_description || '',
            address: activity?.address || '',
            is_active: activity ? activity.is_active : true,
            main_event_id: activity?.main_event_id || defaultMainEventId || '',
            edition_id: activity?.edition_id || defaultEditionId || '',
            custom_content: activity?.custom_content || '',
            session_type: activity?.session_type || 'presentation',
            is_online: activity?.is_online ?? false,
            streams: parsedStreams,
            banner_url: activity?.banner_url || '',
            submission_id: activity?.submission_id || '',
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "streams"
    })


    useEffect(() => {
        async function loadData() {
            const [events, editions] = await Promise.all([
                getMainEventsList(),
                getEditionsList()
            ])
            setEventsList(events || [])
            setEditionsList(editions || [])
        }
        loadData()
    }, [])

    const watchMainEvent = form.watch('main_event_id')
    const watchIsOnline = form.watch('is_online')
    const watchStartTime = form.watch('start_time')

    const applyDuration = (minutes: number) => {
        if (!watchStartTime) return
        const [hours, mins] = watchStartTime.split(':').map(Number)
        const date = new Date()
        date.setHours(hours, mins + minutes, 0)
        const endHours = String(date.getHours()).padStart(2, '0')
        const endMins = String(date.getMinutes()).padStart(2, '0')
        form.setValue('end_time', `${endHours}:${endMins}`)
    }


    useEffect(() => {
        if (watchMainEvent) {
            const filtered = editionsList.filter(e => e.main_event_id === watchMainEvent)
            setFilteredEditions(filtered)
            const currentEdition = form.getValues('edition_id')
            if (currentEdition && !filtered.some(e => e.id === currentEdition)) {
                form.setValue('edition_id', '')
            }
        } else {
            setFilteredEditions([])
        }
    }, [watchMainEvent, editionsList, form])

    function onSubmit(data: ActivityFormInput) {
        const redirectUrl = backHref || '/admin/activities'
        
        startTransition(async () => {
            const result = await upsertActivity(data, activity?.id, redirectUrl)
            if (result.error) {
                toast.error(typeof result.error === 'string' ? result.error : 'Error al guardar los datos')
            } else {
                toast.success(isEdit ? 'Sesión actualizada' : 'Sesión creada con éxito')
            }
        })
    }


    const getLocalizedName = (name: string | LocalizedString | undefined) => {
        if (!name) return ''
        if (typeof name === 'string') return name
        return name[locale] || name.es || name.en || ''
    }

    return (
        <div className="w-full relative">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full min-h-[calc(100vh-130px)]">
                    <div className="flex-1 space-y-6 pb-20 max-w-5xl mx-auto w-full">
                        <Card className="rounded-2xl border-none shadow-sm bg-card">
                            <CardContent className="p-6 space-y-5">
                                <h3 className="text-base font-semibold text-foreground">Información Básica</h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-2">
                                                <FormLabel className="text-muted-foreground font-medium">Título de la Sesión</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ej: Conferencia Magistral sobre IA..." className="h-11 rounded-xl" {...field} value={field.value || ''} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="session_type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-muted-foreground font-medium">Tipo de Sesión</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value || 'presentation'}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="h-11 rounded-xl">
                                                            <SelectValue placeholder="Selecciona el tipo" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="rounded-xl">
                                                        {Object.entries(sessionTypeLabels).map(([key, label]) => (
                                                            <SelectItem key={key} value={key}>
                                                                {label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="col-span-1 md:col-span-3">
                                        <FormField
                                            control={form.control}
                                            name="short_description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-muted-foreground font-medium">Descripción Breve</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Breve resumen de la sesión..." className="resize-none rounded-xl h-24" {...field} value={field.value || ''} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {
                                        !defaultMainEventId && (
                                            <FormField
                                                control={form.control}
                                                name="main_event_id"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-muted-foreground font-medium">Evento Principal</FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value || ''}
                                                            disabled={!!defaultMainEventId}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger className="h-11 rounded-xl">
                                                                    <SelectValue placeholder="Selecciona un evento" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="rounded-xl">
                                                                {eventsList.map(event => (
                                                                    <SelectItem key={event.id} value={event.id}>
                                                                        {getLocalizedName(event.name)}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )
                                    }

                                    <FormField
                                        control={form.control}
                                        name="edition_id"
                                        render={({ field }) => (
                                            <FormItem className="col-span-1 md:col-span-3">
                                                <FormLabel className="text-muted-foreground font-medium">Edición (Opcional)</FormLabel>
                                                <FormDescription>
                                                    Si no se selecciona una edición, se mostrará en todas las ediciones.
                                                </FormDescription>
                                                <FormControl>
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-1">
                                                        {filteredEditions.map(edition => {
                                                            const isSelected = field.value === edition.id;
                                                            return (
                                                                <div
                                                                    key={edition.id}
                                                                    className={cn(
                                                                        "p-3 border rounded-lg cursor-pointer hover:border-[#0064e0] transition-all flex flex-col justify-center items-start text-center gap-2 bg-background min-h-20",
                                                                        isSelected ? "border-2 border-[#0064e0] bg-blue-50/10" : "border-slate-200"
                                                                    )}
                                                                    onClick={() => field.onChange(isSelected ? '' : edition.id)}
                                                                >
                                                                    <Badge
                                                                        variant={isSelected ? "default" : "outline"}
                                                                        className="text-[10px]"
                                                                    >
                                                                        Evento
                                                                    </Badge>
                                                                    <span className={cn("text-xs font-semibold leading-tight", isSelected ? "text-[#0064e0]" : "text-foreground")}>
                                                                        {getLocalizedName(edition.name)}
                                                                    </span>

                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </FormControl>
                                                {filteredEditions.length === 0 && (
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {watchMainEvent ? "Sin ediciones para este evento" : "Selecciona un evento primero"}
                                                    </p>
                                                )}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Multimedia Banner Card */}
                        <Card className="rounded-2xl border-none shadow-sm bg-card">
                            <CardContent className="p-6 space-y-5">
                                <h3 className="text-base font-semibold text-foreground">Multimedia</h3>
                                <FormField
                                    control={form.control}
                                    name="banner_url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-muted-foreground font-medium">Banner de la Sesión</FormLabel>
                                            <FormControl>
                                                <BannerUploadModal
                                                    value={field.value || ''}
                                                    onChange={field.onChange}
                                                    folder="sessions"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border-none shadow-sm bg-card">
                            <CardContent className="p-6 space-y-5">
                                <h3 className="text-base font-semibold text-foreground">Fecha y Ubicación</h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <FormField
                                        control={form.control}
                                        name="session_date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-muted-foreground font-medium">Fecha</FormLabel>
                                                <FormControl>
                                                    <Input type="date" className="h-11 rounded-xl" {...field} value={field.value || ''} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="start_time"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-muted-foreground font-medium">Hora Inicio</FormLabel>
                                                <FormControl>
                                                    <Input type="time" className="h-11 rounded-xl" {...field} value={field.value || ''} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="end_time"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-muted-foreground font-medium">Hora Fin</FormLabel>
                                                <FormControl>
                                                    <Input type="time" className="h-11 rounded-xl" {...field} value={field.value || ''} />
                                                </FormControl>
                                                <div className="flex flex-wrap gap-1 mt-1.5">
                                                    {[{ label: '20m', v: 20 }, { label: '30m', v: 30 }, { label: '45m', v: 45 }, { label: '1h', v: 60 }].map(preset => (
                                                        <Badge 
                                                            key={preset.label} 
                                                            variant="secondary" 
                                                            onClick={() => applyDuration(preset.v)} 
                                                            className="cursor-pointer text-[10px] px-2 py-0.5 rounded-md hover:bg-violet-50 hover:text-violet-600 transition-colors"
                                                        >
                                                            +{preset.label}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {!watchIsOnline && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-muted-foreground font-medium">Ubicación / Dirección</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Ej: Auditorio Principal o Calle s/n"
                                                            className="h-11 rounded-xl"
                                                            {...field}
                                                            value={field.value || ''}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border-none shadow-sm bg-card">
                            <CardContent className="p-6 space-y-5">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-base font-semibold text-foreground">Soporte Virtual / Streaming</h3>
                                    <FormField
                                        control={form.control}
                                        name="is_online"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center gap-2 space-y-0">
                                                <FormLabel className="text-sm text-muted-foreground mr-1">Transmisión en Vivo</FormLabel>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {watchIsOnline && (
                                    <div className="space-y-4 pt-2 animate-in fade-in-50 duration-200">
                                        {fields.map((field, index) => (
                                            <div key={field.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end border p-4 rounded-xl relative bg-muted/30">
                                                <div className="md:col-span-3">
                                                    <FormField
                                                        control={form.control}
                                                        name={`streams.${index}.platform`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-muted-foreground font-medium">Plataforma</FormLabel>
                                                                <Select onValueChange={field.onChange} value={field.value || ''}>
                                                                    <FormControl>
                                                                        <SelectTrigger className="h-11 rounded-xl">
                                                                            <SelectValue placeholder="Selecciona" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent className="rounded-xl">
                                                                        <SelectItem value="zoom">Zoom</SelectItem>
                                                                        <SelectItem value="meet">Google Meet</SelectItem>
                                                                        <SelectItem value="teams">Microsoft Teams</SelectItem>
                                                                        <SelectItem value="youtube">YouTube</SelectItem>
                                                                        <SelectItem value="other">Otro</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className="md:col-span-5">
                                                    <FormField
                                                        control={form.control}
                                                        name={`streams.${index}.url`}
                                                        render={({ field }) => (
                                                            <FormItem className="mb-0">
                                                                <FormLabel className="text-muted-foreground font-medium">URL de Transmisión</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="https://..." className="h-11 rounded-xl" {...field} value={field.value || ''} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className="md:col-span-3">
                                                    <FormField
                                                        control={form.control}
                                                        name={`streams.${index}.password`}
                                                        render={({ field }) => (
                                                            <FormItem className="mb-0">
                                                                <FormLabel className="text-muted-foreground font-medium">Contraseña (Opcional)</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Clave..." className="h-11 rounded-xl" {...field} value={field.value || ''} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className="md:col-span-1 flex justify-end">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-destructive h-11 w-11 rounded-xl hover:bg-destructive/10"
                                                        onClick={() => remove(index)}
                                                    >
                                                        <IconTrash className="h-5 w-5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}

                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full flex items-center justify-center gap-2 h-11 rounded-xl border-dashed"
                                            onClick={() => append({ platform: 'zoom', url: '', password: '' })}
                                        >
                                            <IconPlus className="h-5 w-5" />
                                            Agregar Plataforma de Transmisión
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                        <Card className="rounded-2xl border-none shadow-sm bg-card mt-6">
                            <CardContent className="p-6 flex items-center justify-between gap-4">
                                <div className="space-y-0.5">
                                    <h3 className="text-base font-semibold text-foreground">Estado de la Sesión</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Habilita o deshabilita la sesión para que sea visible en el cronograma del evento.
                                    </p>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="is_active"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-y-0">
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* STICKY FOOTER */}
                    <div className="sticky bottom-0 -mb-10 left-0 right-0 bg-background/90 backdrop-blur-md border-t p-4 flex justify-end gap-3 z-50 rounded-b-2xl">
                        <Button type="button" className="rounded-xl h-11 px-6" variant='ghost' onClick={() => router.push(backHref || '/admin/activities')} disabled={isPending}>
                            Cancelar
                        </Button>

                        <Button type="submit" className="bg-[#0064e0] hover:bg-[#0057c2] text-white font-medium rounded-xl h-11 px-6 shadow-sm flex items-center gap-2" disabled={isPending}>
                            <IconDeviceFloppy className="h-5 w-5" />
                            {isPending ? 'Guardando...' : (isEdit ? 'Guardar Cambios' : 'Crear Sesión')}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
