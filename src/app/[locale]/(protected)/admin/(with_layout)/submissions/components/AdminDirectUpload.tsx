'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search, UploadCloud, CheckCircle2, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { searchProfiles, insertDirectSubmission } from '../actions';
import { toast } from 'react-toastify';

const uploadSchema = z.object({
    userId: z.string().min(1, 'Debe seleccionar un usuario'),
    title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
    documentType: z.string().min(1, 'Debe seleccionar el tipo de documento'),
});

type UploadFormValues = z.infer<typeof uploadSchema>;

interface AdminDirectUploadProps {
    mainEventId?: string;
    editionId?: string;
    callId?: string;
    onSuccess?: () => void;
}
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function AdminDirectUpload({ mainEventId, editionId, callId, onSuccess }: AdminDirectUploadProps) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isSearching, setIsSearching] = React.useState(false);
    const [searchResults, setSearchResults] = React.useState<any[]>([]);
    const [selectedUser, setSelectedUser] = React.useState<{ id: string, name: string, email: string } | null>(null);

    const [fileToUpload, setFileToUpload] = React.useState<File | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const [isPending, setIsPending] = React.useState(false);
    const [simulationLog, setSimulationLog] = React.useState<string[] | null>(null);

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<UploadFormValues>({
        resolver: zodResolver(uploadSchema),
        defaultValues: { userId: '', title: '', documentType: '' }
    });

    const handleSearchUser = async () => {
        if (!searchQuery) return;
        setIsSearching(true);
        const results = await searchProfiles(searchQuery);
        setSearchResults(results || []);
        setIsSearching(false);
    };

    const handleSelectUser = (user: any) => {
        setSelectedUser({ id: user.id, name: `${user.first_name} ${user.last_name}`, email: user.email });
        setValue('userId', user.id);
        setSearchResults([]);
    };

    const onSubmit = async (data: UploadFormValues) => {
        setIsPending(true);
        try {
            let fileUrl = '';

            if (fileToUpload) {
                const formData = new FormData();
                formData.append('file', fileToUpload);
                formData.append('folder', 'submissions');

                const response = await fetch('/api/r2/upload', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) throw new Error('Error al cargar archivo a R2');

                const upData = await response.json();
                fileUrl = upData.url;
            }

            const res = await insertDirectSubmission({
                userId: data.userId,
                title: data.title,
                documentType: data.documentType,
                mainEventId: mainEventId || undefined,
                editionId: editionId || undefined,
                callId: callId || undefined,
                fileUrl: fileUrl,
                fileName: fileToUpload?.name || 'document.pdf'
            });

            if ('success' in res && res.success) {
                setSimulationLog([
                    "✅ ¡Subida manual registrada con éxito!",
                    `🎉 El trabajo de '${selectedUser?.name || 'Usuario'}' ha sido insertado correctamente.`,
                    `ID del Trabajo: ${(res as any).id}`,
                    fileUrl ? `📄 Archivo cargado: ${fileToUpload?.name}` : "⚠️ Sin archivo adjunto"
                ]);
                if (onSuccess) onSuccess();
            } else {
                toast.error(('error' in res ? res.error : '') || 'Error al registrar el envío');
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
        setSelectedUser(null);
        setSearchQuery('');
        setSimulationLog(null);
        setFileToUpload(null);
    };

    return (
        <div className="space-y-4">
            {simulationLog ? (
                <Alert className="bg-slate-900 text-slate-100 border-none">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <AlertTitle className="text-emerald-400">Proceso Exitoso</AlertTitle>
                    <AlertDescription className="mt-2 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                        {simulationLog.map((log, i) => (
                            <div key={i} className={log.startsWith('✅') ? 'text-emerald-400 font-bold' : 'opacity-80'}>
                                {log}
                            </div>
                        ))}
                    </AlertDescription>
                </Alert>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white border p-6 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-muted-foreground uppercase">Paso 1: Buscar Usuario</p>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por Email o Nombre..."
                                className="pl-9 h-10 text-xs"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                disabled={selectedUser !== null || isSearching}
                            />
                        </div>
                        {selectedUser ? (
                            <Button type="button" variant="outline" size="sm" onClick={() => { setSelectedUser(null); setValue('userId', ''); setSearchQuery(''); }}>Cambiar</Button>
                        ) : (
                            <Button type="button" size="sm" onClick={handleSearchUser} disabled={!searchQuery || isSearching}>
                                {isSearching ? 'Buscando...' : 'Buscar'}
                            </Button>
                        )}
                    </div>

                    {!selectedUser && searchResults.length > 0 && (
                        <div className="border rounded-md divide-y shadow-sm bg-white overflow-hidden max-h-40 overflow-y-auto">
                            {searchResults.map((user) => (
                                <div key={user.id} onClick={() => handleSelectUser(user)} className="p-2 cursor-pointer hover:bg-slate-50 flex flex-col">
                                    <span className="text-xs font-semibold text-slate-800">{user.first_name} {user.last_name}</span>
                                    <span className="text-[10px] text-muted-foreground">{user.email}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {selectedUser && (
                        <Alert className="bg-primary/5 border-primary/20">
                            <UserPlus className="h-4 w-4 text-primary" />
                            <AlertTitle className="text-sm">Usuario Seleccionado</AlertTitle>
                            <AlertDescription className="text-xs">{selectedUser.name} ({selectedUser.email})</AlertDescription>
                        </Alert>
                    )}

                    <hr className="my-2 border-dashed" />

                    <p className="text-xs font-bold text-muted-foreground uppercase">Paso 2: Detalles del Trabajo</p>
                    <div className="grid gap-2">
                        <Label htmlFor="title" className="text-xs">Título del Trabajo</Label>
                        <Input id="title" placeholder="Ej: Análisis del Ph de Aguas" {...register('title')} disabled={isPending} className="text-xs h-9" />
                        {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="documentType" className="text-xs">Tipo de Documento</Label>
                        <Select onValueChange={(val) => setValue('documentType', val)} disabled={isPending}>
                            <SelectTrigger className="w-full text-xs h-9">
                                <SelectValue placeholder="Seleccione..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="abstract" className="text-xs">Abstract / Resumen</SelectItem>
                                <SelectItem value="paper" className="text-xs">Paper Completo / Artículo</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.documentType && <p className="text-xs text-destructive">{errors.documentType.message}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="file" className="text-xs">Cargar Archivo</Label>
                        <div
                            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 ${fileToUpload ? 'border-primary bg-primary/5' : ''}`}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <UploadCloud className={`h-6 w-6 ${fileToUpload ? 'text-primary' : 'text-muted-foreground'}`} />
                            <span className="text-xs font-medium">
                                {fileToUpload ? fileToUpload.name : 'Arrastra un archivo o haz clic para subir'}
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

                    <Button type="submit" className="w-full text-xs" disabled={isPending || !selectedUser}>
                        {isPending ? 'Procesando...' : 'Subir Trabajo directamente'}
                    </Button>
                </form>
            )}
            {simulationLog && (
                <div className="pt-4">
                    <Button variant="outline" className="w-full text-xs" onClick={handleReset}>Crear Otra Subida</Button>
                </div>
            )}
        </div>
    );
}
