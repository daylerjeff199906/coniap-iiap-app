'use client'

import { useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { upsertEvent } from '../actions'
import { useRouter } from '@/i18n/routing'

export function EventForm({ eventInfo }: { eventInfo?: any }) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)

    const isEdit = !!eventInfo

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)
        const formData = new FormData(e.currentTarget)

        startTransition(async () => {
            const result = await upsertEvent(formData, eventInfo?.id)
            if (result.error) {
                setError(result.error)
            } else {
                router.push('/admin/events')
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full pb-8">
            <div className="flex flex-col gap-6">
                <div>
                    <h2 className="text-xl font-bold mb-4">{isEdit ? 'Propiedades Iniciales' : 'Empieza tu nuevo Evento'}</h2>
                    {error && (
                        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-xl mb-4">
                            {error}
                        </div>
                    )}

                    <div className="grid gap-5">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="font-semibold text-muted-foreground">Nombre del Evento</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Ej: III Congreso de Informática..."
                                defaultValue={eventInfo?.name}
                                required
                                className="rounded-xl h-11"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="slug" className="font-semibold text-muted-foreground">Slug (URL amigable)</Label>
                            <Input
                                id="slug"
                                name="slug"
                                placeholder="Ej: coniap-2024"
                                defaultValue={eventInfo?.slug}
                                required
                                className="rounded-xl h-11"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="short_description" className="font-semibold text-muted-foreground">Breve descripción</Label>
                            <Textarea
                                id="short_description"
                                name="short_description"
                                placeholder="Describe brevemente de qué trata este evento..."
                                defaultValue={eventInfo?.short_description}
                                className="rounded-xl resize-none h-24"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="website_url" className="font-semibold text-muted-foreground">URL del sitio web externo (opcional)</Label>
                                <Input
                                    id="website_url"
                                    name="website_url"
                                    placeholder="https://ejemplo.com"
                                    defaultValue={eventInfo?.website_url}
                                    className="rounded-xl h-11"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="contact_email" className="font-semibold text-muted-foreground">Email de contacto</Label>
                                <Input
                                    id="contact_email"
                                    name="contact_email"
                                    type="email"
                                    placeholder="contacto@evento.com"
                                    defaultValue={eventInfo?.contact_email}
                                    className="rounded-xl h-11"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 mt-4">
                            <div className="flex flex-col gap-3">
                                <div>
                                    <Label className="font-semibold text-foreground text-base">Estado del Evento</Label>
                                    <p className="text-sm text-muted-foreground mt-1">Selecciona en qué fase de publicación se encuentra el evento.</p>
                                </div>
                                <RadioGroup name="status" defaultValue={eventInfo?.status || 'draft'} className="grid gap-3">
                                    <Label
                                        htmlFor="status-draft"
                                        className="flex items-center justify-between rounded-xl border p-4 hover:bg-muted/50 cursor-pointer [&:has([data-state=checked])]:bg-muted/20 [&:has([data-state=checked])]:border-[#0064e0] [&:has([data-state=checked])]:ring-1 ring-[#0064e0]"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <span className="font-medium text-[15px] text-foreground">Borrador</span>
                                            <span className="font-normal text-[13px] text-muted-foreground">Oculto al público, ideal para configurar detalles iniciales.</span>
                                        </div>
                                        <RadioGroupItem id="status-draft" value="draft" />
                                    </Label>

                                    <Label
                                        htmlFor="status-published"
                                        className="flex items-center justify-between rounded-xl border p-4 hover:bg-muted/50 cursor-pointer [&:has([data-state=checked])]:bg-muted/20 [&:has([data-state=checked])]:border-[#0064e0] [&:has([data-state=checked])]:ring-1 ring-[#0064e0]"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <span className="font-medium text-[15px] text-foreground">Publicado</span>
                                            <span className="font-normal text-[13px] text-muted-foreground">Visible para todos, listo para recibir inscripciones.</span>
                                        </div>
                                        <RadioGroupItem id="status-published" value="published" />
                                    </Label>

                                    <Label
                                        htmlFor="status-archived"
                                        className="flex items-center justify-between rounded-xl border p-4 hover:bg-muted/50 cursor-pointer [&:has([data-state=checked])]:bg-muted/20 [&:has([data-state=checked])]:border-[#0064e0] [&:has([data-state=checked])]:ring-1 ring-[#0064e0]"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <span className="font-medium text-[15px] text-foreground">Archivado</span>
                                            <span className="font-normal text-[13px] text-muted-foreground">El evento ha concluido y solo está disponible de forma histórica.</span>
                                        </div>
                                        <RadioGroupItem id="status-archived" value="archived" />
                                    </Label>
                                </RadioGroup>
                            </div>

                            <div className="border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/10 rounded-xl overflow-hidden p-6 relative">
                                <div className="flex flex-row items-center justify-between gap-6">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-[15px] font-semibold text-red-900 dark:text-red-400">Visibilidad del sistema</h3>
                                        <p className="text-[14px] text-red-700/80 dark:text-red-400/80 leading-relaxed max-w-lg">
                                            Determina si el evento está completamente habilitado en la plataforma. Si lo desactivas, nadie podrá acceder o interactuar, sin importar el estado del mismo.
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <Switch
                                            id="is_active"
                                            name="is_active"
                                            defaultChecked={eventInfo ? eventInfo.is_active : true}
                                            value="true"
                                            className="data-[state=checked]:bg-red-600"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full h-11 rounded-full bg-[#0064e0] hover:bg-[#0057c2] text-white font-medium text-sm mt-4 tracking-wide shadow-sm"
                    disabled={isPending}
                >
                    {isPending ? 'Guardando...' : (isEdit ? 'Actualizar Evento' : 'Crear Evento')}
                </Button>
            </div>
        </form>
    )
}
