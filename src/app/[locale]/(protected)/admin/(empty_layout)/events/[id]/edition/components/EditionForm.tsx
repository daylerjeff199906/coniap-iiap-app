'use client'

import { useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from '@/i18n/routing'
import { upsertEdition } from '../actions'
import { ImageUpload } from '@/components/general/ImageUpload/ImageUpload'

export function EditionForm({ eventId, editionInfo }: { eventId: string, editionInfo?: any }) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)
    const [coverUrl, setCoverUrl] = useState<string>(editionInfo?.cover_url || '')

    const isEdit = !!editionInfo

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)
        const formData = new FormData(e.currentTarget)

        startTransition(async () => {
            const result = await upsertEdition(formData, eventId, editionInfo?.id)
            if (result.error) {
                setError(result.error)
            } else {
                router.push(`/admin/events/${eventId}/edition`)
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full pb-8">
            <div className="flex flex-col gap-6">
                <div>
                    {error && (
                        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-xl mb-4">
                            {error}
                        </div>
                    )}

                    <div className="grid gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="year" className="font-semibold text-muted-foreground">Año</Label>
                                <Input
                                    id="year"
                                    name="year"
                                    type="number"
                                    placeholder="Ej: 2024"
                                    defaultValue={editionInfo?.year || new Date().getFullYear()}
                                    required
                                    className="rounded-xl h-11"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="slug" className="font-semibold text-muted-foreground">URL (Slug)</Label>
                                <Input
                                    id="slug"
                                    name="slug"
                                    placeholder="Ej: coniap-2024"
                                    defaultValue={editionInfo?.slug}
                                    required
                                    className="rounded-xl h-11"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="name_es" className="font-semibold text-muted-foreground">Nombre (Español)</Label>
                                <Input
                                    id="name_es"
                                    name="name_es"
                                    placeholder="Ej: CONIAP 2024 - Virtual"
                                    defaultValue={editionInfo?.name?.es}
                                    required
                                    className="rounded-xl h-11"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name_en" className="font-semibold text-muted-foreground">Nombre (Inglés)</Label>
                                <Input
                                    id="name_en"
                                    name="name_en"
                                    placeholder="Ej: CONIAP 2024 - Virtual"
                                    defaultValue={editionInfo?.name?.en}
                                    className="rounded-xl h-11"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="desc_es" className="font-semibold text-muted-foreground">Descripción (Español)</Label>
                                <Textarea
                                    id="desc_es"
                                    name="desc_es"
                                    placeholder="Ingresa la descripción..."
                                    defaultValue={editionInfo?.description?.es}
                                    className="rounded-xl resize-none h-24"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="desc_en" className="font-semibold text-muted-foreground">Descripción (Inglés)</Label>
                                <Textarea
                                    id="desc_en"
                                    name="desc_en"
                                    placeholder="Enter description..."
                                    defaultValue={editionInfo?.description?.en}
                                    className="rounded-xl resize-none h-24"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="start_date" className="font-semibold text-muted-foreground">Fecha de inicio</Label>
                                <Input
                                    id="start_date"
                                    name="start_date"
                                    type="date"
                                    defaultValue={editionInfo?.start_date}
                                    className="rounded-xl h-11"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="end_date" className="font-semibold text-muted-foreground">Fecha de fin</Label>
                                <Input
                                    id="end_date"
                                    name="end_date"
                                    type="date"
                                    defaultValue={editionInfo?.end_date}
                                    className="rounded-xl h-11"
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="cover_url" className="font-semibold text-muted-foreground underline decoration-blue-200 underline-offset-4">Banner / Cabecera del Evento</Label>
                            <ImageUpload
                                value={coverUrl}
                                onChange={setCoverUrl}
                                folder={`events/${eventId}/editions`}
                                className="mt-1"
                            />
                        </div>

                        <div className="border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/10 rounded-xl overflow-hidden p-6 relative mt-4">
                            <div className="flex flex-row items-center justify-between gap-6">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-[15px] font-semibold text-blue-900 dark:text-blue-400">Edición Actual</h3>
                                    <p className="text-[14px] text-blue-700/80 dark:text-blue-400/80 leading-relaxed max-w-lg">
                                        Marca esta edición como la oficial o activa actual del evento.
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <Switch
                                        id="is_current"
                                        name="is_current"
                                        defaultChecked={editionInfo ? editionInfo.is_current : false}
                                        className="data-[state=checked]:bg-blue-600"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push(`/admin/events/${eventId}/edition`)}
                        className="w-full h-11 rounded-full font-medium text-sm mt-4 tracking-wide border-slate-200"
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        className="w-full h-11 rounded-full bg-[#0064e0] hover:bg-[#0057c2] text-white font-medium text-sm mt-4 tracking-wide shadow-sm"
                        disabled={isPending}
                    >
                        {isPending ? 'Guardando...' : (isEdit ? 'Actualizar Edición' : 'Crear Edición')}
                    </Button>
                </div>
            </div>
        </form>
    )
}
