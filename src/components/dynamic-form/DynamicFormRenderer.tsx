'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UploadCloud, CheckCircle2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'react-toastify'
import { FormFieldConfig } from './FormSchemaBuilder'
import { cn } from '@/lib/utils'

interface DynamicFormRendererProps {
    schema: FormFieldConfig[];
    onSubmit: (data: { metadata: Record<string, any>, files: { fieldId: string, url: string, name: string }[] }) => void;
    isSubmitting?: boolean;
}

export function DynamicFormRenderer({ schema, onSubmit, isSubmitting = false }: DynamicFormRendererProps) {
    const [responses, setResponses] = React.useState<Record<string, any>>({});
    const [files, setFiles] = React.useState<Record<string, File | null>>({});
    const [uploadingFiles, setUploadingFiles] = React.useState<Record<string, boolean>>({});
    const [uploadedUrls, setUploadedUrls] = React.useState<Record<string, { url: string, name: string }>>({});

    // Drag-and-Drop state per field
    const [isDragging, setIsDragging] = React.useState<Record<string, boolean>>({});

    const handleTextChange = (fieldId: string, value: any) => {
        setResponses(prev => ({ ...prev, [fieldId]: value }));
    };

    const handleFileSelect = (fieldId: string, file: File | null, allowedExtensions?: string[]) => {
        if (!file) return;

        // Validar extensión
        if (allowedExtensions && allowedExtensions.length > 0) {
            const ext = `.${file.name.split('.').pop()?.toLowerCase()}`;
            if (!allowedExtensions.includes(ext)) {
                toast.error(`Extensión no permitida. Formatos válidos: ${allowedExtensions.join(', ')}`);
                return;
            }
        }

        setFiles(prev => ({ ...prev, [fieldId]: file }));
    };

    const uploadSingleFile = async (fieldId: string, file: File): Promise<{ url: string, name: string } | null> => {
        setUploadingFiles(prev => ({ ...prev, [fieldId]: true }));
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', 'submissions'); // Default folder

            const response = await fetch('/api/r2/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Error al cargar archivo');

            const upData = await response.json();
            toast.success(`Archivo cargado para ${schema.find(f => f.id === fieldId)?.label || 'campo'}`);
            return { url: upData.url, name: file.name };
        } catch (error: any) {
            console.error(error);
            toast.error(`Error al subir ${file.name}`);
            return null;
        } finally {
            setUploadingFiles(prev => ({ ...prev, [fieldId]: false }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        for (const field of schema) {
            if (field.required) {
                if (field.type === 'file' && !files[field.id] && !uploadedUrls[field.id]) {
                    toast.error(`El campo "${field.label}" es obligatorio`);
                    return;
                }
                if (field.type !== 'file' && !responses[field.id]) {
                    if (field.type === 'checkbox' && responses[field.id] === false) continue; // Checkboxes can be false? Wait, usually checkbox is required mean true.
                    toast.error(`El campo "${field.label}" es obligatorio`);
                    return;
                }
            }
        }

        // Upload files FIRST
        const updatedUrls = { ...uploadedUrls };
        const filesToSubmit: { fieldId: string, url: string, name: string }[] = [];

        for (const field of schema) {
            if (field.type === 'file' && files[field.id] && !updatedUrls[field.id]) {
                const res = await uploadSingleFile(field.id, files[field.id]!);
                if (res) {
                    updatedUrls[field.id] = res;
                } else {
                    return; // Abort submit if a file upload fails
                }
            }

            if (updatedUrls[field.id]) {
                filesToSubmit.push({
                    fieldId: field.id,
                    url: updatedUrls[field.id].url,
                    name: updatedUrls[field.id].name
                });
            }
        }

        setUploadedUrls(updatedUrls);

        // Filter metadata to NOT include files, or maybe include them with URLs?
        // Prompt says: "Los datos de los campos de texto/opciones deben guardarse en metadata"
        // "submission_files enlazada".
        const metadata: Record<string, any> = {};
        for (const field of schema) {
            if (field.type !== 'file') {
                metadata[field.name || field.id] = responses[field.id];
            }
        }

        onSubmit({ metadata, files: filesToSubmit });
    };

    const handleDrag = (e: React.DragEvent, fieldId: string, dragging: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(prev => ({ ...prev, [fieldId]: dragging }));
    };

    const handleDrop = (e: React.DragEvent, fieldId: string, allowedExtensions?: string[]) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(prev => ({ ...prev, [fieldId]: false }));

        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFileSelect(fieldId, file, allowedExtensions);
        }
    };

    if (schema.length === 0) {
        return <p className="text-sm text-center text-slate-500 italic">No hay campos adicionales en esta postulación.</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {schema.map((field) => (
                <div key={field.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-semibold text-slate-700">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </Label>
                    </div>

                    {field.type === 'text' && (
                        <Input
                            placeholder={field.placeholder || "Escriba su respuesta..."}
                            value={responses[field.id] || ''}
                            onChange={(e) => handleTextChange(field.id, e.target.value)}
                            required={field.required}
                            className="h-11 rounded-xl bg-slate-50/50 border-slate-200 focus:bg-white"
                        />
                    )}

                    {field.type === 'textarea' && (
                        <Textarea
                            placeholder={field.placeholder || "Escriba su respuesta..."}
                            value={responses[field.id] || ''}
                            onChange={(e) => handleTextChange(field.id, e.target.value)}
                            required={field.required}
                            className="rounded-xl bg-slate-50/50 border-slate-200 focus:bg-white resize-none h-28"
                        />
                    )}

                    {field.type === 'number' && (
                        <Input
                            type="number"
                            placeholder={field.placeholder || "0"}
                            value={responses[field.id] || ''}
                            onChange={(e) => handleTextChange(field.id, e.target.value)}
                            required={field.required}
                            className="h-11 rounded-xl bg-slate-50/50 border-slate-200 focus:bg-white"
                        />
                    )}

                    {field.type === 'checkbox' && (
                        <div className="flex items-center space-x-2 bg-slate-50/50 p-3 rounded-xl border">
                            <Checkbox
                                id={field.id}
                                checked={responses[field.id] || false}
                                onCheckedChange={(checked) => handleTextChange(field.id, checked)}
                            />
                            <Label htmlFor={field.id} className="text-sm cursor-pointer font-medium text-slate-600">
                                {field.placeholder || "Aceptar / Marcar opción"}
                            </Label>
                        </div>
                    )}

                    {field.type === 'file' && (
                        <div className="space-y-2">
                            {field.description && (
                                <p className="text-[11px] text-muted-foreground">{field.description}</p>
                            )}
                            
                            <div
                                className={cn(
                                    "border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all",
                                    isDragging[field.id] ? "border-primary bg-primary/5 scale-[1.01]" : "border-slate-200 hover:bg-slate-50/50",
                                    files[field.id] || uploadedUrls[field.id] ? "border-emerald-500 bg-emerald-50/10" : ""
                                )}
                                onDragOver={(e) => handleDrag(e, field.id, true)}
                                onDragLeave={(e) => handleDrag(e, field.id, false)}
                                onDrop={(e) => handleDrop(e, field.id, field.allowedExtensions)}
                                onClick={() => document.getElementById(`file-input-${field.id}`)?.click()}
                            >
                                <input
                                    id={`file-input-${field.id}`}
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => handleFileSelect(field.id, e.target.files?.[0] || null, field.allowedExtensions)}
                                    accept={field.allowedExtensions?.join(',')}
                                />
                                
                                {files[field.id] || uploadedUrls[field.id] ? (
                                    <div className="flex items-center gap-2 text-emerald-600">
                                        <CheckCircle2 className="h-5 w-5" />
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold truncate max-w-[220px]">
                                                {files[field.id]?.name || uploadedUrls[field.id]?.name}
                                            </span>
                                            {files[field.id] && (
                                                <span className="text-[10px] opacity-70">
                                                    ({(files[field.id]!.size / 1024 / 1024).toFixed(2)} MB) - Listo
                                                </span>
                                            )}
                                        </div>
                                        <Button 
                                            type="button" 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-6 w-6 rounded-full text-slate-400 hover:text-red-500"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFiles(prev => ({ ...prev, [field.id]: null }));
                                                setUploadedUrls(prev => {
                                                    const copy = { ...prev };
                                                    delete copy[field.id];
                                                    return copy;
                                                });
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <UploadCloud className="h-6 w-6 text-slate-400" />
                                        <span className="text-xs font-medium text-slate-600">
                                            Arrastra un archivo o haz clic para subir
                                        </span>
                                        {field.allowedExtensions && field.allowedExtensions.length > 0 && (
                                            <span className="text-[10px] text-muted-foreground">
                                                Permitidos: {field.allowedExtensions.join(', ')}
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ))}

            <div className="pt-2">
                <Button type="submit" disabled={isSubmitting} className="w-full bg-[#0064e0] hover:bg-blue-700 rounded-xl h-12 font-bold shadow-lg shadow-blue-100">
                    {isSubmitting ? 'Enviando...' : 'Enviar Postulación'}
                </Button>
            </div>
        </form>
    );
}
