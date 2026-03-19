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
}

interface LocalizedString {
    en?: string
    es?: string
}

export function ActivityForm({ activity }: ActivityFormProps) {
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
            name: activity?.name || '',
            date: activity?.date || '',
            timeStart: activity?.timeStart || '',
            timeEnd: activity?.timeEnd || '',
            shortDescription: activity?.shortDescription || '',
            sala: activity?.sala || null,
            isActived: activity ? activity.isActived : true,
            main_event_id: activity?.main_event_id || '',
            edition_id: activity?.edition_id || '',
            customContent: activity?.customContent || '',
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
                toast.success(isEdit ? 'Actividad actualizada' : 'Actividad creada con éxito')
                router.push('/admin/activities')
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
            <PageHeader
                title={isEdit ? 'Editar Actividad' : 'Nueva Actividad'}
                description={isEdit ? 'Actualiza los detalles de la sesión.' : 'Configura una nueva sesión para tus eventos.'}
                backHref="/admin/activities"
                variant="chevron"
            />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <Card className="rounded-2xl border-none shadow-sm bg-card">
                        <CardContent className="p-6 space-y-5">
                            <h3 className="text-base font-semibold text-foreground">Información Básica</h3>

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-muted-foreground font-medium">Nombre de la Actividad</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ej: Conferencia Magistral sobre IA..." className="h-11 rounded-xl" {...field} value={field.value || ''} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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
                                    name="date"
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
                                    name="timeStart"
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
                                    name="timeEnd"
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
                                    name="sala"
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
                                    name="isActived"
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
                            <h3 className="text-base font-semibold text-foreground">Detalles Extra</h3>

                            <FormField
                                control={form.control}
                                name="shortDescription"
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
                        <Button type="button" variant="outline" className="rounded-xl h-11 px-6" onClick={() => router.push('/admin/activities')} disabled={isPending}>
                            Cancelar
                        </Button>
                        <Button type="submit" className="bg-[#0064e0] hover:bg-[#0057c2] text-white font-medium rounded-xl h-11 px-6 shadow-sm flex items-center gap-2" disabled={isPending}>
                            <IconDeviceFloppy className="h-5 w-5" />
                            {isPending ? 'Guardando...' : (isEdit ? 'Guardar Cambios' : 'Crear Actividad')}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
