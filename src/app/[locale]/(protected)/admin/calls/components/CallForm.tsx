'use client'

import { useState, useTransition, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { useRouter } from '@/i18n/routing'
import { upsertCall, getEditionsByEvent } from '../actions'
import { ICall } from '@/types/call'
import { IconDeviceFloppy, IconArrowLeft, IconPlus, IconTrash, IconLayout, IconForms, IconCalendar, IconUser, IconSettings, IconDragDrop, IconCirclePlus, IconX, IconGripVertical, IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import { toast } from 'react-toastify'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CallFormProps {
    callInfo?: ICall
    events?: { id: string, name: string }[]
    roles: { id: string, name: { es: string, en: string }, slug: string }[]
    fixedEventId?: string
    locale: string
}

export function CallForm({ callInfo, events, roles, fixedEventId, locale }: CallFormProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [editions, setEditions] = useState<{ id: string, name: { es: string, en: string }, year: number }[]>([])

    // Form state
    const [selectedEventId, setSelectedEventId] = useState(callInfo?.main_event_id || fixedEventId || '')
    const [selectedEditionId, setSelectedEditionId] = useState(callInfo?.edition_id || '')
    const [content, setContent] = useState(callInfo?.content || { time: Date.now(), blocks: [], version: "2.28.0" })
    const [formSchema, setFormSchema] = useState<any[]>(callInfo?.form_schema || [])

    const isEdit = !!callInfo

    useEffect(() => {
        if (selectedEventId) {
            getEditionsByEvent(selectedEventId).then(data => {
                setEditions(data as any)
            })
        } else {
            setEditions([])
        }
    }, [selectedEventId])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const editionId = (selectedEditionId === 'none' || !selectedEditionId) ? null : selectedEditionId

        const payload: Partial<ICall> = {
            id: callInfo?.id,
            main_event_id: editionId ? null : (selectedEventId || null),
            edition_id: editionId,
            role_id: formData.get('role_id') as string,
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            start_date: new Date(formData.get('start_date') as string).toISOString(),
            end_date: new Date(formData.get('end_date') as string).toISOString(),
            max_capacity: formData.get('max_capacity') ? parseInt(formData.get('max_capacity') as string) : null,
            auto_approve: formData.get('auto_approve') === 'true',
            is_active: formData.get('is_active') === 'true',
            content: content,
            form_schema: formSchema
        }

        startTransition(async () => {
            const result = await upsertCall(payload)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success(isEdit ? 'Convocatoria actualizada' : 'Convocatoria creada')
                router.push(fixedEventId ? `/admin/events/${fixedEventId}/call` : `/admin/calls`)
                router.refresh()
            }
        })
    }

    // --- Content Blocks Logic ---
    const addBlock = (type: string) => {
        const newBlock = {
            id: Math.random().toString(36).substr(2, 9),
            type: type,
            data: type === 'header' ? { text: '', level: 2 } :
                type === 'list' ? { items: [''], style: 'unordered' } :
                    type === 'warning' ? { title: '', message: '' } :
                        { text: '' }
        }
        setContent({ ...content, blocks: [...content.blocks, newBlock] })
    }

    const updateBlockData = (id: string, newData: any) => {
        const newBlocks = content.blocks.map((b: any) => b.id === id ? { ...b, data: { ...b.data, ...newData } } : b)
        setContent({ ...content, blocks: newBlocks })
    }

    const removeBlock = (id: string) => {
        const newBlocks = content.blocks.filter((b: any) => b.id !== id)
        setContent({ ...content, blocks: newBlocks })
    }

    const moveBlock = (index: number, direction: 'up' | 'down') => {
        const newBlocks = [...content.blocks]
        const targetIndex = direction === 'up' ? index - 1 : index + 1
        if (targetIndex < 0 || targetIndex >= newBlocks.length) return
        [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]]
        setContent({ ...content, blocks: newBlocks })
    }

    // --- Form Builder Logic ---
    const addFormField = () => {
        const newField = {
            id: Math.random().toString(36).substr(2, 9),
            type: 'text',
            label: '',
            name: '',
            placeholder: '',
            required: false,
            options: [] // for select/radio
        }
        setFormSchema([...formSchema, newField])
    }

    const updateFormField = (id: string, updates: any) => {
        setFormSchema(formSchema.map(f => f.id === id ? { ...f, ...updates } : f))
    }

    const removeFormField = (id: string) => {
        setFormSchema(formSchema.filter(f => f.id !== id))
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 pb-32 max-w-4xl mx-auto">
            {/* Header Sticky */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b -mx-4 px-4 py-4 mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                        className="rounded-full hover:bg-slate-100"
                    >
                        <IconArrowLeft size={20} />
                    </Button>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900">{isEdit ? 'Editar Convocatoria' : 'Crear Convocatoria'}</h1>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Módulo de Postulaciones</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button type="submit" disabled={isPending} className="bg-[#0064e0] hover:bg-blue-700 rounded-full px-6 h-10 font-semibold shadow-lg shadow-blue-100 transition-all active:scale-95">
                        <IconDeviceFloppy className="mr-2 h-4 w-4" />
                        {isPending ? 'Guardando...' : (isEdit ? 'Guardar Cambios' : 'Publicar Ahora')}
                    </Button>
                </div>
            </div>

            {/* Section: General Details */}
            <section className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <IconCalendar size={18} />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800 tracking-tight">Información General</h2>
                </div>

                <div className="bg-white border rounded-3xl p-8 shadow-sm space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-5">
                            {!fixedEventId && events && (
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-slate-700">Evento Principal</Label>
                                    <Select value={selectedEventId} onValueChange={setSelectedEventId} required>
                                        <SelectTrigger className="h-12 rounded-2xl border-slate-200 bg-slate-50/30 focus:ring-2 focus:ring-blue-100 transition-all">
                                            <SelectValue placeholder="Busca un evento..." />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-2xl">
                                            {events.map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-slate-700">Edición / Año (Contexto)</Label>
                                <Select value={selectedEditionId || 'none'} onValueChange={setSelectedEditionId}>
                                    <SelectTrigger className="h-12 rounded-2xl border-slate-200 bg-slate-50/30">
                                        <SelectValue placeholder="Edición general del evento" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl">
                                        <SelectItem value="none">Sin edición específica</SelectItem>
                                        {editions.map(e => (
                                            <SelectItem key={e.id} value={e.id}>
                                                {locale === 'es' ? e.name.es : e.name.en} ({e.year})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-slate-700">Rol del Participante</Label>
                                <Select name="role_id" defaultValue={callInfo?.role_id} required>
                                    <SelectTrigger className="h-12 rounded-2xl border-slate-200 bg-slate-50/30">
                                        <SelectValue placeholder="Selecciona un rol" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl">
                                        {roles.map(r => (
                                            <SelectItem key={r.id} value={r.id}>
                                                {locale === 'es' ? r.name.es : r.name.en}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-sm font-semibold text-slate-700">Título Público</Label>
                                <Input id="title" name="title" defaultValue={callInfo?.title} required placeholder="Ej: Registro de Ponentes Magistrales" className="h-12 rounded-2xl border-slate-200 bg-slate-50/30" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="start_date" className="text-sm font-semibold text-slate-700">Apertura</Label>
                                    <Input id="start_date" name="start_date" type="datetime-local" defaultValue={callInfo?.start_date ? new Date(callInfo.start_date).toISOString().slice(0, 16) : ''} required className="h-12 rounded-2xl border-slate-200 bg-slate-50/30" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="end_date" className="text-sm font-semibold text-slate-700">Cierre</Label>
                                    <Input id="end_date" name="end_date" type="datetime-local" defaultValue={callInfo?.end_date ? new Date(callInfo.end_date).toISOString().slice(0, 16) : ''} required className="h-12 rounded-2xl border-slate-200 bg-slate-50/30" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 pt-2">
                        <Label htmlFor="description" className="text-sm font-semibold text-slate-700">Resumen Breve</Label>
                        <Textarea id="description" name="description" defaultValue={callInfo?.description || ''} className="rounded-2xl h-24 border-slate-200 bg-slate-50/30 resize-none p-4" placeholder="Esta descripción aparecerá en las tarjetas de pre-visualización..." />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                        <div className="space-y-2">
                            <Label htmlFor="max_capacity" className="text-sm font-semibold text-slate-700">Cupos Máximos</Label>
                            <Input id="max_capacity" name="max_capacity" type="number" defaultValue={callInfo?.max_capacity || ''} className="h-11 rounded-xl bg-slate-50/20" placeholder="Ilimitado" />
                        </div>
                        <div className="flex flex-col justify-center gap-3">
                            <div className="flex items-center justify-between p-3 border rounded-xl bg-slate-50/30">
                                <Label className="text-xs font-bold text-slate-600 uppercase">Auto Aprobación</Label>
                                <Switch name="auto_approve" defaultChecked={callInfo?.auto_approve} />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center gap-3">
                            <div className="flex items-center justify-between p-3 border border-blue-100 rounded-xl bg-blue-50/30">
                                <Label className="text-xs font-bold text-blue-700 uppercase">Publicar Ahora</Label>
                                <Switch name="is_active" defaultChecked={callInfo ? callInfo.is_active : true} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: Content Editor */}
            <section className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                            <IconLayout size={18} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800 tracking-tight">Contenido Informativo</h2>
                    </div>
                    <div className="flex gap-1">
                        <Button type="button" variant="outline" size="sm" onClick={() => addBlock('header')} className="rounded-full h-8 text-[11px] font-bold uppercase"><IconPlus size={14} className="mr-1" /> Título</Button>
                        <Button type="button" variant="outline" size="sm" onClick={() => addBlock('paragraph')} className="rounded-full h-8 text-[11px] font-bold uppercase"><IconPlus size={14} className="mr-1" /> Texto</Button>
                        <Button type="button" variant="outline" size="sm" onClick={() => addBlock('list')} className="rounded-full h-8 text-[11px] font-bold uppercase"><IconPlus size={14} className="mr-1" /> Lista</Button>
                        <Button type="button" variant="outline" size="sm" onClick={() => addBlock('warning')} className="rounded-full h-8 text-[11px] font-bold uppercase"><IconPlus size={14} className="mr-1" /> Aviso</Button>
                    </div>
                </div>

                <div className="bg-white border rounded-3xl p-8 shadow-sm min-h-[400px] flex flex-col gap-6">
                    <AnimatePresence mode="popLayout">
                        {content.blocks.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-3xl text-slate-400 bg-slate-50/50"
                            >
                                <IconLayout size={40} className="mb-4 opacity-20" />
                                <p className="font-medium">No hay contenido definido aún</p>
                                <p className="text-xs">Usa los botones superiores para agregar bloques</p>
                            </motion.div>
                        ) : (
                            content.blocks.map((block: any, index: number) => (
                                <motion.div
                                    key={block.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="group relative bg-white border border-slate-100 rounded-2xl p-6 hover:border-slate-300 hover:shadow-md transition-all"
                                >
                                    {/* Action Bar Block */}
                                    <div className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                                        <Button type="button" variant="ghost" size="icon" onClick={() => moveBlock(index, 'up')} disabled={index === 0} className="h-8 w-8 rounded-full bg-white border shadow-sm hover:text-blue-600">
                                            <IconChevronDown className="rotate-180" size={16} />
                                        </Button>
                                        <Button type="button" variant="ghost" size="icon" onClick={() => moveBlock(index, 'down')} disabled={index === content.blocks.length - 1} className="h-8 w-8 rounded-full bg-white border shadow-sm hover:text-blue-600">
                                            <IconChevronDown size={16} />
                                        </Button>
                                    </div>

                                    <div className="absolute -right-3 -top-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeBlock(block.id)} className="h-8 w-8 rounded-full shadow-lg">
                                            <IconX size={16} />
                                        </Button>
                                    </div>

                                    {block.type === 'header' && (
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge className="bg-blue-50 text-blue-700 border-blue-100 h-5 px-1.5 text-[9px] font-black uppercase">Título H{block.data.level}</Badge>
                                                <div className="flex gap-1">
                                                    {[2, 3, 4].map(l => (
                                                        <button
                                                            key={l}
                                                            type="button"
                                                            onClick={() => updateBlockData(block.id, { level: l })}
                                                            className={cn("w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold border", block.data.level === l ? "bg-blue-600 border-blue-600 text-white" : "bg-white text-slate-400")}
                                                        >H{l}</button>
                                                    ))}
                                                </div>
                                            </div>
                                            <Input
                                                value={block.data.text}
                                                onChange={(e) => updateBlockData(block.id, { text: e.target.value })}
                                                placeholder="Escribe un título impactante..."
                                                className="border-none text-2xl font-black bg-transparent p-0 h-auto focus-visible:ring-0 placeholder:opacity-20"
                                            />
                                        </div>
                                    )}

                                    {block.type === 'paragraph' && (
                                        <div className="space-y-3">
                                            <Badge className="bg-slate-50 text-slate-700 border-slate-100 h-5 px-1.5 text-[9px] font-black uppercase">Bloque de Texto</Badge>
                                            <Textarea
                                                value={block.data.text}
                                                onChange={(e) => updateBlockData(block.id, { text: e.target.value })}
                                                placeholder="Describe los detalles de este punto..."
                                                className="border-none bg-transparent p-0 focus-visible:ring-0 min-h-[80px] text-lg font-medium text-slate-600 tracking-tight leading-relaxed resize-none placeholder:opacity-20"
                                            />
                                        </div>
                                    )}

                                    {block.type === 'list' && (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <Badge className="bg-slate-50 text-slate-700 border-slate-100 h-5 px-1.5 text-[9px] font-black uppercase">Lista de Puntos</Badge>
                                                <Button type="button" variant="ghost" size="sm" onClick={() => {
                                                    const items = [...block.data.items, ''];
                                                    updateBlockData(block.id, { items });
                                                }} className="h-7 text-[10px] font-bold text-blue-600"><IconPlus size={12} className="mr-1" /> Agregar Elemento</Button>
                                            </div>
                                            <div className="space-y-3 pl-4">
                                                {block.data.items.map((item: string, i: number) => (
                                                    <div key={i} className="flex gap-3 items-start group/item">
                                                        <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-slate-400 group-hover/item:bg-blue-500 transition-colors" />
                                                        <Input
                                                            value={item}
                                                            onChange={(e) => {
                                                                const items = [...block.data.items];
                                                                items[i] = e.target.value;
                                                                updateBlockData(block.id, { items });
                                                            }}
                                                            className="h-10 border-none bg-slate-50/50 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-100"
                                                            placeholder="Elemento de la lista..."
                                                        />
                                                        <Button type="button" variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover/item:opacity-100 transition-opacity" onClick={() => {
                                                            const items = block.data.items.filter((_: any, j: number) => i !== j);
                                                            updateBlockData(block.id, { items });
                                                        }}>
                                                            <IconTrash size={14} className="text-red-400" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {block.type === 'warning' && (
                                        <div className="space-y-4 bg-amber-50/30 p-6 rounded-2xl border border-amber-100">
                                            <Badge className="bg-amber-100 text-amber-800 border-amber-200 h-5 px-1.5 text-[9px] font-black uppercase">Aviso Destacado</Badge>
                                            <Input
                                                value={block.data.title}
                                                onChange={(e) => updateBlockData(block.id, { title: e.target.value })}
                                                placeholder="Cabecera del aviso..."
                                                className="border-none font-bold text-amber-900 bg-transparent p-0 h-auto focus-visible:ring-0 placeholder:text-amber-300"
                                            />
                                            <Textarea
                                                value={block.data.message}
                                                onChange={(e) => updateBlockData(block.id, { message: e.target.value })}
                                                placeholder="Contenido del mensaje importante..."
                                                className="border-none bg-transparent p-0 focus-visible:ring-0 min-h-[60px] text-amber-800/80 font-medium resize-none placeholder:text-amber-200"
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Section: Form Builder */}
            <section className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <IconForms size={18} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800 tracking-tight">Formulario de Postulación</h2>
                    </div>
                    <Button type="button" variant="default" size="sm" onClick={addFormField} className="bg-emerald-600 hover:bg-emerald-700 rounded-full h-8 text-[11px] font-bold uppercase shadow-md shadow-emerald-50">
                        <IconCirclePlus size={16} className="mr-1" /> Agregar Campo
                    </Button>
                </div>

                <div className="bg-white border rounded-3xl p-8 shadow-sm space-y-4">
                    <AnimatePresence mode="popLayout">
                        {formSchema.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-slate-400 bg-slate-50/30 rounded-2xl border-2 border-dashed">
                                <IconForms size={32} className="mb-3 opacity-20" />
                                <p className="text-sm font-medium">No se han definido campos adicionales</p>
                                <p className="text-[10px] uppercase tracking-widest mt-1">Nombre, Email y Teléfono son automáticos</p>
                            </div>
                        ) : (
                            formSchema.map((field, idx) => (
                                <motion.div
                                    key={field.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-slate-50/50 border rounded-2xl p-5 flex flex-col gap-4 group"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 bg-white rounded-lg border flex items-center justify-center text-slate-400">
                                                <span className="text-xs font-bold">{idx + 1}</span>
                                            </div>
                                            <Badge variant="outline" className="bg-white text-[10px] uppercase font-bold tracking-tighter">{field.type}</Badge>
                                        </div>
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeFormField(field.id)} className="h-8 w-8 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors">
                                            <IconTrash size={16} />
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                        <div className="md:col-span-4 space-y-1.5">
                                            <Label className="text-[11px] font-black uppercase text-slate-400 ml-1">Etiqueta (Pregunta)</Label>
                                            <Input
                                                value={field.label}
                                                onChange={(e) => updateFormField(field.id, { label: e.target.value })}
                                                placeholder="Ej: ¿Cuál es su tema de investigación?"
                                                className="h-10 rounded-xl bg-white"
                                            />
                                        </div>
                                        <div className="md:col-span-3 space-y-1.5">
                                            <Label className="text-[11px] font-black uppercase text-slate-400 ml-1">Tipo de Entrada</Label>
                                            <Select value={field.type} onValueChange={(v) => updateFormField(field.id, { type: v })}>
                                                <SelectTrigger className="h-10 rounded-xl bg-white">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl">
                                                    <SelectItem value="text">Texto Corto</SelectItem>
                                                    <SelectItem value="textarea">Texto Largo</SelectItem>
                                                    <SelectItem value="number">Número</SelectItem>
                                                    <SelectItem value="file">Archivo de soporte</SelectItem>
                                                    <SelectItem value="checkbox">Opción Única (Check)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="md:col-span-3 space-y-1.5">
                                            <Label className="text-[11px] font-black uppercase text-slate-400 ml-1">Placeholder</Label>
                                            <Input
                                                value={field.placeholder}
                                                onChange={(e) => updateFormField(field.id, { placeholder: e.target.value })}
                                                placeholder="Texto de ayuda..."
                                                className="h-10 rounded-xl bg-white"
                                            />
                                        </div>
                                        <div className="md:col-span-2 flex items-center justify-center pt-5">
                                            <div className="flex flex-col items-center gap-1.5">
                                                <Label className="text-[10px] font-black uppercase text-slate-400">Requerido</Label>
                                                <Switch
                                                    checked={field.required}
                                                    onCheckedChange={(val) => updateFormField(field.id, { required: val })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Final Publish Button Mobile/Floating (Extra) */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 md:hidden">
                <Button type="submit" disabled={isPending} className="bg-[#0064e0] hover:bg-blue-700 rounded-full px-10 h-14 font-black shadow-2xl shadow-blue-400 text-lg">
                    {isPending ? 'Guardando...' : 'Publicar'}
                </Button>
            </div>
        </form>
    )
}
