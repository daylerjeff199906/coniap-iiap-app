'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { upsertEvent } from '../actions'
import { useLocale } from 'next-intl'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export function EventForm({ eventInfo }: { eventInfo?: any }) {
    const locale = useLocale()
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
                router.push(`/${locale}/admin/events`)
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-3xl w-full pb-8">
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 bg-muted/30 border border-muted rounded-xl mt-2">
                            <div className="grid gap-2">
                                <Label htmlFor="status" className="font-semibold text-muted-foreground">Estado del evento</Label>
                                <Select name="status" defaultValue={eventInfo?.status || 'draft'}>
                                    <SelectTrigger className="rounded-xl h-11 bg-background border">
                                        <SelectValue placeholder="Seleccione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Borrador</SelectItem>
                                        <SelectItem value="published">Publicado</SelectItem>
                                        <SelectItem value="archived">Archivado</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col justify-center gap-3 md:pl-4">
                                <Label htmlFor="is_active" className="font-semibold text-muted-foreground">¿Está Activo (visible)?</Label>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_active"
                                        name="is_active"
                                        defaultChecked={eventInfo ? eventInfo.is_active : true}
                                        value="true"
                                    />
                                    <Label htmlFor="is_active" className="font-normal text-sm cursor-pointer">Sí, mantener activo</Label>
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
