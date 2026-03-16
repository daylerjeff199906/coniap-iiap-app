'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconTrash, IconForms, IconCirclePlus, IconX, IconGripVertical } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { cn } from '@/lib/utils'

export interface FormFieldConfig {
    id: string; // Internal React key or Unique ID
    name: string; // Database key / slugified label
    type: string;
    label: string;
    placeholder?: string;
    required: boolean;
    description?: string; // Specific for Type 'file'
    allowedExtensions?: string[]; // Specific for Type 'file' (e.g. ['.pdf', '.docx'])
}

interface FormSchemaBuilderProps {
    value: FormFieldConfig[];
    onChange: (value: FormFieldConfig[]) => void;
}

// Helper to slugify text to use as "id" in database submissions.
function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '_') // Replace spaces with _
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, '_'); // Replace multiple _ with single _
}

export function FormSchemaBuilder({ value, onChange }: FormSchemaBuilderProps) {
    const addFormField = () => {
        const tempId = Math.random().toString(36).substr(2, 9);
        const newField: FormFieldConfig = {
            id: tempId,
            name: `campo_${tempId}`,
            type: 'text',
            label: '',
            placeholder: '',
            required: false
        };
        onChange([...value, newField]);
    };

    const updateFormField = (id: string, updates: Partial<FormFieldConfig>) => {
        onChange(value.map(f => {
            if (f.id === id) {
                // If label is update and name is empty/default, auto-generate name to keep it neat
                if (updates.label !== undefined && (!f.name || f.name.startsWith('campo_'))) {
                    const cleanSlug = slugify(updates.label);
                    // Only auto-update name if they haven't manually edited it much or if it matches default.
                    return { ...f, ...updates, name: cleanSlug || f.name };
                }
                return { ...f, ...updates };
            }
            return f;
        }));
    };

    const removeFormField = (id: string) => {
        onChange(value.filter(f => f.id !== id));
    };

    return (
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
                    {value.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-slate-400 bg-slate-50/30 rounded-2xl border-2 border-dashed">
                            <IconForms size={32} className="mb-3 opacity-20" />
                            <p className="text-sm font-medium">No se han definido campos adicionales</p>
                            <p className="text-[10px] uppercase tracking-widest mt-1">Nombre, Email y Teléfono son automáticos si aplica</p>
                        </div>
                    ) : (
                        value.map((field, idx) => (
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
                                        <Badge variant="outline" className="bg-white text-[10px] uppercase font-bold tracking-tighter">
                                            {field.type === 'file' ? 'Archivo' : field.type}
                                        </Badge>
                                    </div>
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeFormField(field.id)} className="h-8 w-8 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors">
                                        <IconTrash size={16} />
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                    <div className="md:col-span-6 space-y-1.5">
                                        <Label className="text-[11px] font-black uppercase text-slate-400 ml-1">Etiqueta (Pregunta)</Label>
                                        <Input
                                            value={field.label}
                                            onChange={(e) => updateFormField(field.id, { label: e.target.value })}
                                            placeholder="Ej: ¿Cuál es su tema de investigación?"
                                            className="h-10 rounded-xl bg-white"
                                        />
                                    </div>

                                    <div className="md:col-span-4 space-y-1.5">
                                        <Label className="text-[11px] font-black uppercase text-slate-400 ml-1">Tipo de Entrada</Label>
                                        <Select value={field.type} onValueChange={(v) => updateFormField(field.id, { type: v })}>
                                            <SelectTrigger className="h-10 rounded-xl bg-white">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl">
                                                <SelectItem value="text">Texto Corto</SelectItem>
                                                <SelectItem value="textarea">Texto Largo</SelectItem>
                                                <SelectItem value="number">Número</SelectItem>
                                                <SelectItem value="file">Archivo / Documento</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* <div className="md:col-span-3 space-y-1.5">
                                        <Label className="text-[11px] font-black uppercase text-slate-400 ml-1">Identificador (ID)</Label>
                                        <Input
                                            value={field.name}
                                            onChange={(e) => updateFormField(field.id, { name: slugify(e.target.value) })}
                                            placeholder="ej: tema_investigacion"
                                            className="h-10 rounded-xl bg-white font-mono text-xs"
                                        />
                                    </div> */}

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

                                {/* Extra details for File Type */}
                                {field.type === 'file' && (
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-t pt-4 mt-2">
                                        <div className="md:col-span-6 space-y-1.5">
                                            <Label className="text-[11px] font-black uppercase text-slate-400 ml-1">Descripción / Instrucciones de Archivo</Label>
                                            <Input
                                                value={field.description || ''}
                                                onChange={(e) => updateFormField(field.id, { description: e.target.value })}
                                                placeholder="Ej: Formato PDF o DOCX, máx 10MB"
                                                className="h-10 rounded-xl bg-white"
                                            />
                                        </div>
                                        <div className="md:col-span-6 space-y-1.5">
                                            <Label className="text-[11px] font-black uppercase text-slate-400 ml-1">Extensiones Permitidas (Separa por coma)</Label>
                                            <Input
                                                value={field.allowedExtensions ? field.allowedExtensions.join(', ') : ''}
                                                onChange={(e) => {
                                                    const list = e.target.value.split(',').map(s => s.trim().toLowerCase()).filter(s => s.startsWith('.'));
                                                    updateFormField(field.id, { allowedExtensions: list });
                                                }}
                                                placeholder="Ej: .pdf, .docx, .png"
                                                className="h-10 rounded-xl bg-white font-mono text-xs"
                                            />
                                        </div>
                                    </div>
                                )}

                                {field.type !== 'file' && (
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-t pt-4 mt-2">
                                        <div className="md:col-span-12 space-y-1.5">
                                            <Label className="text-[11px] font-black uppercase text-slate-400 ml-1">Placeholder (Texto Ayuda)</Label>
                                            <Input
                                                value={field.placeholder || ''}
                                                onChange={(e) => updateFormField(field.id, { placeholder: e.target.value })}
                                                placeholder="Ej: Escriba su respuesta..."
                                                className="h-10 rounded-xl bg-white"
                                            />
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
