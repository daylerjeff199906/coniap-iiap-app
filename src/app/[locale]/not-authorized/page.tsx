import React from 'react';
import { Button } from '@/components/ui/button';
import { IconShieldOff, IconHome, IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function NotAuthorizedPage({ params }: { params: { locale: string } }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Common' });

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-12 text-center border border-slate-100">
                <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-red-100 animate-pulse">
                    <IconShieldOff size={40} className="text-red-500" />
                </div>
                
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">
                    Acceso No Autorizado
                </h1>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-10 italic">
                    Lo sentimos, tu perfil no cuenta con los privilegios administrativos necesarios para acceder a esta sección. Por favor, contacta con el administrador del sistema si crees que esto es un error.
                </p>

                <div className="space-y-3">
                    <Button asChild className="w-full h-12 rounded-xl bg-slate-900 hover:bg-black text-white font-semibold flex items-center justify-center gap-2 transition-all">
                        <Link href={`/${locale}/admin`}>
                            <IconHome size={18} />
                            Volver al Inicio
                        </Link>
                    </Button>
                    
                    <Button variant="ghost" asChild className="w-full h-12 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium">
                        <Link href="https://auth.iiap.gob.pe">
                            <IconArrowLeft size={18} />
                            Ir al Launcher
                        </Link>
                    </Button>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-50">
                    <p className="text-[10px] text-slate-300 uppercase tracking-[0.2em] font-bold">
                        Sistema de Gestión CONIAP • IIAP
                    </p>
                </div>
            </div>
        </div>
    );
}
