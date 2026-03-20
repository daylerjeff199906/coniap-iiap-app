'use client'

import { useForm } from 'react-hook-form'
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
import { PageHeader } from '@/components/general/PageHeader/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { useLocale } from 'next-intl'

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

    const form = useForm<ActivityFormInput>({
        resolver: zodResolver(activitySchema),
        defaultValues: {
            title: activity?.title || '',
            session_date: activity?.session_date || '',
            start_time: activity?.start_time || '',
            end_time: activity?.end_time || '',
            short_description: activity?.short_description || '',
            room_id: activity?.room_id || null,
            is_active: activity ? activity.is_active : true,
            main_event_id: activity?.main_event_id || defaultMainEventId || '',
            edition_id: activity?.edition_id || defaultEditionId || '',
            custom_content: activity?.custom_content || '',
            session_type: activity?.session_type || 'presentation',
            is_online: activity?.is_online ?? false,
            stream_platform: activity?.stream_platform || '',
            stream_url: activity?.stream_url || '',
            stream_password: activity?.stream_password || '',
        },
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
        startTransition(async () => {
            const result = await upsertActivity(data, activity?.id)
            if (result.error) {
                toast.error(typeof result.error === 'string' ? result.error : 'Error al guardar los datos')
            } else {
                toast.success(isEdit ? 'Sesión actualizada' : 'Sesión creada con éxito')
                router.push(backHref || '/admin/activities')
            }
        })
    }


    const getLocalizedName = (name: string | LocalizedString | undefined) => {
        if (!name) return ''
        if (typeof name === 'string') return name
        return name[locale] || name.es || name.en || ''
    }

    return (
        <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10 w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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


                                <FormField
                                    control={form.control}
                                    name="edition_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-muted-foreground font-medium">Edición (Opcional)</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value || ''}
                                                disabled={!watchMainEvent}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="h-11 rounded-xl">
                                                        <SelectValue placeholder={watchMainEvent ? "Selecciona una edición" : "Selecciona un evento primero"} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="rounded-xl">
                                                    {filteredEditions.map(edition => (
                                                        <SelectItem key={edition.id} value={edition.id}>
                                                            {getLocalizedName(edition.name)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
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
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <FormField
                                    control={form.control}
                                    name="room_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-muted-foreground font-medium">Sala / Aula (Número)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Ej: 1"
                                                    className="h-11 rounded-xl"
                                                    {...field}
                                                    value={field.value === null ? '' : field.value}
                                                    onChange={e => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="is_active"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-xl border p-4 shadow-sm h-11 self-end bg-muted/20">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-sm font-semibold text-foreground">Habilitado</FormLabel>
                                            </div>
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
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2 animate-in fade-in-50 duration-200">
                                    <FormField
                                        control={form.control}
                                        name="stream_platform"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-muted-foreground font-medium">Plataforma</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ej: Zoom, YouTube..." className="h-11 rounded-xl" {...field} value={field.value || ''} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="stream_url"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-1">
                                                <FormLabel className="text-muted-foreground font-medium">URL de Transmisión</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://..." className="h-11 rounded-xl" {...field} value={field.value || ''} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="stream_password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-muted-foreground font-medium">Contraseña / Clave (Opcional)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Clave de acceso..." className="h-11 rounded-xl" {...field} value={field.value || ''} />
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
                            <h3 className="text-base font-semibold text-foreground">Detalles Extra</h3>

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
                        </CardContent>
                    </Card>

                    <div className="flex items-center justify-end gap-3 mt-4">
                        <Button type="button" className="rounded-xl h-11 px-6 bg-secondary text-secondary-foreground hover:bg-secondary/80 border" onClick={() => router.push(backHref || '/admin/activities')} disabled={isPending}>
                            Cancelar
                        </Button>

                        <Button type="submit" className="bg-[#0064e0] hover:bg-[#0057c2] text-white font-medium rounded-xl h-11 px-6 shadow-sm flex items-center gap-2" disabled={isPending}>
                            <IconDeviceFloppy className="h-5 w-5" />
                            {isPending ? 'Guardando...' : (isEdit ? 'Guardar Cambios' : 'Crear Sesion')}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
