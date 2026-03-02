'use client'

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { LogIn, ArrowRight } from 'lucide-react'
import { useLocale } from 'next-intl'

interface AuthRequiredModalProps {
    isOpen: boolean
    onClose: (value: boolean) => void
}

export const AuthRequiredModal: React.FC<AuthRequiredModalProps> = ({ isOpen, onClose }) => {
    const locale = useLocale()

    const t = {
        es: {
            title: 'Acceso Requerido',
            description: 'Para postular o ver los requisitos, necesitas iniciar sesión o registrarte en la plataforma.',
            login: 'Iniciar Sesión',
            register: 'Registrarse',
        },
        en: {
            title: 'Authentication Required',
            description: 'To apply or see the requirements, you need to log in or register on the platform.',
            login: 'Log In',
            register: 'Register',
        },
    }[locale as 'es' | 'en'] || {
        title: 'Acceso Requerido',
        description: 'Para postular o ver los requisitos, necesitas iniciar sesión o registrarte en la plataforma.',
        login: 'Iniciar Sesión',
        register: 'Registrarse',
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[400px] bg-[#0A0A0A] border-white/5 text-white rounded-[2.5rem] p-0 overflow-hidden shadow-2xl backdrop-blur-xl">
                <div className="p-8 space-y-8">
                    <DialogHeader className="flex flex-col items-center pt-4">
                        <div className="w-16 h-16 bg-[#CCFF00]/10 rounded-2xl flex items-center justify-center text-[#CCFF00] mb-6">
                            <LogIn size={32} />
                        </div>
                        <DialogTitle className="text-3xl font-medium tracking-tight text-center">
                            {t.title}
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400 text-center text-base pt-2 font-light">
                            {t.description}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-4">
                        <Link href="/login" onClick={() => onClose(false)}>
                            <Button className="w-full h-14 rounded-2xl bg-[#CCFF00] text-black hover:bg-white transition-all duration-300 font-medium text-lg gap-3">
                                {t.login}
                                <ArrowRight size={18} />
                            </Button>
                        </Link>

                        <Link href="/register" onClick={() => onClose(false)}>
                            <Button variant="ghost" className="w-full h-14 rounded-2xl border border-white/5 hover:bg-white/5 text-white transition-all duration-300 font-light text-lg">
                                {t.register}
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="bg-white/[0.02] p-4 text-center">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">CONIAP IIAP</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
