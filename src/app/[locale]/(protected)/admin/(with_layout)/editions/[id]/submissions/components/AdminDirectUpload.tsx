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

    // Simulación de búsqueda de usuario
    const handleSearchUser = () => {
        if (!searchQuery) return;
        setIsSearching(true);
        setTimeout(() => {
            // Mock result
            setSelectedUser({
                id: crypto.randomUUID(),
                name: 'Juan Pérez',
                email: 'jperez@iiap.gob.pe'
            });
            setValue('userId', 'mock-id-123'); // any id
            setIsSearching(false);
        }, 800);
    };

    const onSubmit = async (data: UploadFormValues) => {
        setIsPending(true);
        setSimulationLog(null);

        // Simular lógica de subida y guardado paso a paso para explicar la arquitectura a Supabase
        setTimeout(() => {
            setSimulationLog([
                "🟢 Iniciando proceso de subida manual administrada...",
                "1️⃣ Autenticando solicitud y construyendo Storage Path: `submissions/${edition_id}/${userId}/${file_name}`",
                "2️⃣ Subiendo archivo a Clouflare R2 mediante Supabase Storage bucket...",
                `   📥 Uploading file to R2 con MIME type 'application/pdf'...`,
                "3️⃣ Obteniendo URL de descarga pública de Cloudflare R2...",
                "4️⃣ Ejecutando Transacción en Supabase DB:",
                `   ➡️ INSERT INTO public.event_submissions (profile_id, edition_id, title, is_admin_upload, status) VALUES ('${data.userId}', '${editionId}', '${data.title}', true, 'submitted') RETURNING id;`,
                `   ➡️ INSERT INTO public.submission_files (submission_id, file_name, file_url, document_type, mime_type, size_bytes) VALUES (submission_id, 'documento_admin.pdf', 'https://pub-cloudflare.dev/...', '${data.documentType}', 'application/pdf', 2048000);`,
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
                    Crea un envío a nombre de un usuario participante en la plataforma principal.
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
                                <Button type="button" variant="outline" onClick={() => setSelectedUser(null)}>
                                    Cambiar
                                </Button>
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
                                <AlertDescription>
                                    {selectedUser.name} ({selectedUser.email})
                                </AlertDescription>
                            </Alert>
                        )}

                        <hr className="my-2 border-dashed" />

                        <CardDescription>Paso 2: Detalles del Trabajo</CardDescription>
                        <div className="grid gap-2">
                            <Label htmlFor="title">Título del Trabajo</Label>
                            <Input
                                id="title"
                                placeholder="Ej: Análisis del Ph de Aguas en Cuenca Baja."
                                {...register('title')}
                                disabled={isPending}
                            />
                            {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="documentType">Tipo de Documento</Label>
                            <select
                                id="documentType"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                {...register('documentType')}
                                disabled={isPending}
                            >
                                <option value="">Seleccione...</option>
                                <option value="abstract">Abstract / Resumen</option>
                                <option value="paper">Paper Completo / Artículo</option>
                                <option value="slides">Presentación / Diapositivas</option>
                                <option value="identification">Documento de Identidad</option>
                            </select>
                            {errors.documentType && <p className="text-xs text-destructive">{errors.documentType.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="file">Cargar Archivo</Label>
                            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
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
                    <Button variant="outline" className="w-full" onClick={handleReset}>
                        Crear Otra Subida
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}
