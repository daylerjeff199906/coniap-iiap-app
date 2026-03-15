'use client';

import * as React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { AdminDirectUpload } from '../components/AdminDirectUpload';
import { getEditionsList } from '../actions';
import { useLocale } from 'next-intl';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export default function DirectUploadPage() {
    const locale = useLocale();
    const [editions, setEditions] = React.useState<any[]>([]);
    const [selectedEditionId, setSelectedEditionId] = React.useState<string>('');

    React.useEffect(() => {
        const loadEditions = async () => {
            const data = await getEditionsList();
            setEditions(data || []);
        };
        loadEditions();
    }, []);

    return (
        <div className="container mx-auto p-6 space-y-6 max-w-3xl">
            <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="rounded-full h-8 w-8" asChild>
                    <Link href="/admin/submissions">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-800 leading-tight">Subida Directa por Administrador</h1>
                    <p className="text-xs text-muted-foreground mt-0.5">Crea un envío a nombre de un usuario participante de forma directa.</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-white border p-4 rounded-xl shadow-sm space-y-2">
                    <Label className="text-xs font-bold text-muted-foreground uppercase">Seleccionar Edición Vinculada (Opcional)</Label>
                    <Select onValueChange={setSelectedEditionId}>
                        <SelectTrigger className="w-full text-xs h-9">
                            <SelectValue placeholder="General / Ninguna" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none" className="text-xs">General / Ninguna</SelectItem>
                            {editions.map((ed) => (
                                <SelectItem key={ed.id} value={ed.id} className="text-xs">
                                    {ed.name?.[locale] || ed.name?.es} ({ed.year})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="max-w-xl mx-auto">
                    <AdminDirectUpload 
                        editionId={selectedEditionId !== 'none' ? selectedEditionId : ''} 
                        onSuccess={() => {}} 
                    />
                </div>
            </div>
        </div>
    );
}
