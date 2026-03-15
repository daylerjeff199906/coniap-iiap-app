'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search, UploadCloud, CheckCircle2, FileText, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const uploadSchema = z.object({
    userId: z.string().min(1, 'Debe seleccionar un usuario'),
    title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
    documentType: z.string().min(1, 'Debe seleccionar el tipo de documento'),
    file: z.any().optional(),
});

type UploadFormValues = z.infer<typeof uploadSchema>;

interface AdminDirectUploadProps {
    editionId: string;
    onSuccess?: () => void;
}

export function AdminDirectUpload({ editionId, onSuccess }: AdminDirectUploadProps) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isSearching, setIsSearching] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState<{ id: string, name: string, email: string } | null>(null);
    const [isPending, setIsPending] = React.useState(false);
    const [simulationLog, setSimulationLog] = React.useState<string[] | null>(null);

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<UploadFormValues>({
        resolver: zodResolver(uploadSchema),
    });

    const handleSearchUser = () => {
        if (!searchQuery) return;
        setIsSearching(true);
        setTimeout(() => {
            setSelectedUser({
                id: crypto.randomUUID(),
                name: 'Juan Pérez',
                email: 'jperez@iiap.gob.pe'
            });
            setValue('userId', 'mock-id-123');
            setIsSearching(false);
        }, 800);
    };

    const onSubmit = async (data: UploadFormValues) => {
        setIsPending(true);
        setSimulationLog(null);

        setTimeout(() => {
            setSimulationLog([
                "🟢 Iniciando proceso de subida manual administrada...",
                `1️⃣ Autenticando solicitud para edición: ${editionId || 'Nivel General'}`,
                "2️⃣ Subiendo archivo a Cloudflare R2 mediante Supabase Storage bucket...",
                `   📥 Uploading file to R2 con MIME type 'application/pdf'...`,
                "3️⃣ Obteniendo URL de descarga pública de Cloudflare R2...",
                "4️⃣ Ejecutando Transacción en Supabase DB:",
                `   ➡️ INSERT INTO public.event_submissions (profile_id, title) VALUES ('${data.userId}', '${data.title}');`,
                "✅ ¡Simulando commits seguros completados!",
                "🎉 El trabajo de '" + (selectedUser?.name || 'Usuario') + "' ha sido ingresado correctamente."
            ]);
            setIsPending(false);
            if (onSuccess) onSuccess();
        }, 1500);
    };

    const handleReset = () => {
        reset();
        setSelectedUser(null);
        setSearchQuery('');
        setSimulationLog(null);
    };

    return (
        <Card className="shadow-lg border-primary/15">
            <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-primary" />
                    Subida Directa por Administrador
                </CardTitle>
                <CardDescription>
                    Crea un envío a nombre de un usuario participante de forma directa.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
                {simulationLog ? (
                    <Alert className="bg-slate-900 text-slate-100 border-none">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        <AlertTitle className="text-emerald-400">Proceso Simulado con Éxito</AlertTitle>
                        <AlertDescription className="mt-2 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                            {simulationLog.map((log, i) => (
                                <div key={i} className={log.startsWith('🟢') || log.startsWith('✅') ? 'text-emerald-400 font-bold' : 'opacity-80'}>
                                    {log}
                                </div>
                            ))}
                        </AlertDescription>
                    </Alert>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <CardDescription>Paso 1: Buscar Usuario</CardDescription>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Buscar por Email o Nombre..."
                                    className="pl-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    disabled={selectedUser !== null || isSearching}
                                />
                            </div>
                            {selectedUser ? (
                                <Button type="button" variant="outline" onClick={() => setSelectedUser(null)}>Cambiar</Button>
                            ) : (
                                <Button type="button" onClick={handleSearchUser} disabled={!searchQuery || isSearching}>
                                    {isSearching ? 'Buscando...' : 'Buscar'}
                                </Button>
                            )}
                        </div>

                        {selectedUser && (
                            <Alert className="bg-primary/5 border-primary/20">
                                <UserPlus className="h-4 w-4 text-primary" />
                                <AlertTitle>Usuario Encontrado</AlertTitle>
                                <AlertDescription>{selectedUser.name} ({selectedUser.email})</AlertDescription>
                            </Alert>
                        )}

                        <hr className="my-2 border-dashed" />

                        <CardDescription>Paso 2: Detalles del Trabajo</CardDescription>
                        <div className="grid gap-2">
                            <Label htmlFor="title">Título del Trabajo</Label>
                            <Input id="title" placeholder="Ej: Análisis del Ph de Aguas" {...register('title')} disabled={isPending} />
                            {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="documentType">Tipo de Documento</Label>
                            <select id="documentType" className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm" {...register('documentType')} disabled={isPending}>
                                <option value="">Seleccione...</option>
                                <option value="abstract">Abstract / Resumen</option>
                                <option value="paper">Paper Completo / Artículo</option>
                            </select>
                            {errors.documentType && <p className="text-xs text-destructive">{errors.documentType.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="file">Cargar Archivo</Label>
                            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50">
                                <UploadCloud className="h-8 w-8 text-muted-foreground" />
                                <span className="text-sm">Arrastra un archivo o haz clic para subir</span>
                                <input id="file" type="file" className="hidden" />
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={isPending || !selectedUser}>
                            {isPending ? 'Procesando...' : 'Subir Trabajo directamente'}
                        </Button>
                    </form>
                )}
            </CardContent>
            {simulationLog && (
                <CardFooter>
                    <Button variant="outline" className="w-full" onClick={handleReset}>Crear Otra Subida</Button>
                </CardFooter>
            )}
        </Card>
    );
}
