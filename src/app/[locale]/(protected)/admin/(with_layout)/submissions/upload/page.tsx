'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper';
import { DirectUploadForm } from '../components/DirectUploadForm';

export default function DirectUploadPage() {
    return (
        <LayoutWrapper sectionTitle='Subida Directa por Administrador'>
            <div className="container mx-auto p-6 space-y-6">
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

                <DirectUploadForm />
            </div>
        </LayoutWrapper>
    );
}

