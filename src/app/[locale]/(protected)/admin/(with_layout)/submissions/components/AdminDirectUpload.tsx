'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UploadCloud, CheckCircle2, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { insertDirectSubmission } from '../actions';
import { toast } from 'react-toastify';

const uploadSchema = z.object({
    title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
    documentType: z.string().min(1, 'Debe seleccionar el tipo de documento'),
});

type UploadFormValues = z.infer<typeof uploadSchema>;

interface UserProfile {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
}

interface AdminDirectUploadProps {
    mainEventId?: string;
    editionId?: string;
    callId?: string;
    selectedUser: UserProfile | null;
    onSuccess?: () => void;
}

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function AdminDirectUpload({ mainEventId, editionId, callId, selectedUser, onSuccess }: AdminDirectUploadProps) {
    const [fileToUpload, setFileToUpload] = React.useState<File | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const [uploadType, setUploadType] = React.useState<'file' | 'link'>('file');
    const [linkUrl, setLinkUrl] = React.useState('');

    const [isPending, setIsPending] = React.useState(false);
    const [simulationLog, setSimulationLog] = React.useState<string[] | null>(null);

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<UploadFormValues>({
        resolver: zodResolver(uploadSchema),
        defaultValues: { title: '', documentType: '' }
    });

    const onSubmit = async (data: UploadFormValues) => {
        if (!selectedUser) {
            toast.error('Debe seleccionar un participante');
            return;
        }

        setIsPending(true);
        try {
            let fileUrl = '';

            if (uploadType === 'file' && fileToUpload) {
                const formData = new FormData();
                formData.append('file', fileToUpload);
                formData.append('folder', 'applications');

                const response = await fetch('/api/r2/upload', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) throw new Error('Error al cargar archivo a R2');

                const upData = await response.json();
                fileUrl = upData.url;
            } else if (uploadType === 'link') {
                if (!linkUrl) throw new Error('Debe proporcionar un link o URL');
                fileUrl = linkUrl;
            }

            const res = await insertDirectSubmission({
                userId: selectedUser.id,
                title: data.title,
                documentType: data.documentType,
                mainEventId: mainEventId || undefined,
                editionId: editionId || undefined,
                callId: callId || undefined,
                fileUrl: fileUrl,
                fileName: uploadType === 'file' ? (fileToUpload?.name || 'document.pdf') : 'Link Asociado'
            });

            if ('success' in res && res.success) {
                const successRes = res as { success: boolean; id: string };
                setSimulationLog([
                    "✅ ¡Subida manual registrada con éxito!",
                    `🎉 El trabajo de '${selectedUser.first_name} ${selectedUser.last_name}' ha sido insertado correctamente.`,
                    `ID del Trabajo: ${successRes.id}`,
                    fileUrl ? `📄 ${uploadType === 'file' ? 'Archivo cargado' : 'Link asociado'}: ${uploadType === 'file' ? (fileToUpload?.name || 'Documento') : fileUrl}` : "⚠️ Sin archivo adjunto"
                ]);
                if (onSuccess) onSuccess();
            } else {
                const errorRes = res as { error?: string };
                toast.error(errorRes.error || 'Error al registrar el envío');
            }

        } catch (error: any) {
            console.error(error);
            toast.error(error.message || 'Error en la subida');
        } finally {
            setIsPending(false);
        }
    };

    const handleReset = () => {
        reset();
        setSimulationLog(null);
        setFileToUpload(null);
        setLinkUrl('');
        setUploadType('file');
    };

    return (
        <div className="space-y-4">
            {selectedUser && (
                <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/10 rounded-xl">
                    <div className="h-9 w-9 flex items-center justify-center bg-primary/10 text-primary font-bold rounded-full text-xs">
                        {selectedUser.first_name?.[0]?.toUpperCase()}{selectedUser.last_name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-800">{selectedUser.first_name} {selectedUser.last_name}</p>
                        <p className="text-[10px] text-muted-foreground">{selectedUser.email}</p>
                    </div>
                </div>
            )}

            {simulationLog ? (
                <Alert className="bg-slate-900 text-slate-100 border-none rounded-xl">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <AlertTitle className="text-emerald-400 text-xs font-bold">Proceso Exitoso</AlertTitle>
                    <AlertDescription className="mt-1.5 text-[11px] font-mono whitespace-pre-wrap leading-relaxed text-slate-300">
                        {simulationLog.map((log, i) => (
                            <div key={i} className={log.startsWith('✅') ? 'text-emerald-400 font-bold' : 'opacity-80'}>
                                {log}
                            </div>
                        ))}
                    </AlertDescription>
                </Alert>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white border p-5 rounded-xl shadow-sm">
                    <p className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">Detalles del Trabajo</p>
                    
                    <div className="grid gap-1.5">
                        <Label htmlFor="title" className="text-xs font-medium">Título del Trabajo</Label>
                        <Input id="title" placeholder="Ej: Análisis del Ph de Aguas" {...register('title')} disabled={isPending} className="text-xs h-9 bg-white" />
                        {errors.title && <p className="text-[10px] text-destructive">{errors.title.message}</p>}
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="documentType" className="text-xs font-medium">Tipo de Documento</Label>
                        <Select onValueChange={(val) => setValue('documentType', val)} disabled={isPending}>
                            <SelectTrigger className="w-full text-xs h-9 bg-white">
                                <SelectValue placeholder="Seleccione..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="abstract" className="text-xs">Abstract / Resumen</SelectItem>
                                <SelectItem value="paper" className="text-xs">Paper Completo / Artículo</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.documentType && <p className="text-[10px] text-destructive">{errors.documentType.message}</p>}
                    </div>

                    <hr className="border-dashed" />

                    <div className="space-y-3">
                        <Label className="text-xs font-medium">Soporte del Trabajo</Label>
                        <div className="flex gap-2">
                            <Button type="button" variant={uploadType === 'file' ? 'default' : 'outline'} size="sm" className="text-xs h-8 px-3" onClick={() => setUploadType('file')}>
                                <UploadCloud className="h-3.5 w-3.5 mr-1" /> Archivo
                            </Button>
                            <Button type="button" variant={uploadType === 'link' ? 'default' : 'outline'} size="sm" className="text-xs h-8 px-3" onClick={() => setUploadType('link')}>
                                <Link2 className="h-3.5 w-3.5 mr-1" /> Asociar Link / URL
                            </Button>
                        </div>

                        {uploadType === 'file' ? (
                            <div className="grid gap-2">
                                <div
                                    className={`border border-dashed rounded-lg p-5 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-50 transition-colors ${fileToUpload ? 'border-primary bg-primary/5' : 'border-slate-200'}`}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <UploadCloud className={`h-5 w-5 ${fileToUpload ? 'text-primary' : 'text-slate-400'}`} />
                                    <span className="text-xs font-medium text-slate-700">
                                        {fileToUpload ? fileToUpload.name : 'Subir archivo o arrastra una copia aquí'}
                                    </span>
                                    {fileToUpload && <span className="text-[10px] text-muted-foreground">({(fileToUpload.size / 1024 / 1024).toFixed(2)} MB)</span>}
                                </div>
                                <input
                                    id="file"
                                    type="file"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={(e) => setFileToUpload(e.target.files?.[0] || null)}
                                />
                            </div>
                        ) : (
                            <div className="grid gap-1.5">
                                <Label htmlFor="linkUrl" className="text-xs">Link / URL de Referencia</Label>
                                <Input id="linkUrl" placeholder="https://ejemplo.com/trabajo" value={linkUrl} onChange={e => setLinkUrl(e.target.value)} disabled={isPending} className="text-xs h-9 bg-white" />
                            </div>
                        )}
                    </div>

                    <Button type="submit" className="w-full text-xs h-9 mt-2" disabled={isPending || !selectedUser}>
                        {isPending ? 'Procesando...' : 'Subir Trabajo directamente'}
                    </Button>
                </form>
            )}
            {simulationLog && (
                <div className="pt-2">
                    <Button variant="outline" className="w-full text-xs h-8" onClick={handleReset}>Crear Otra Subida</Button>
                </div>
            )}
        </div>
    );
}

