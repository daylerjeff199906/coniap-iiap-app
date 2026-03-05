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
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { getExternalLoginUrl, PLATFORM_URL } from '@/utils/constants'

interface AuthRequiredModalProps {
    isOpen: boolean
    onClose: (value: boolean) => void
    nextPath?: string
}

export const AuthRequiredModal: React.FC<AuthRequiredModalProps> = ({ isOpen, onClose, nextPath }) => {
    const locale = useLocale()
    const externalLoginUrl = getExternalLoginUrl(locale, nextPath)

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
            <DialogContent className="sm:max-w-[440px] bg-black/90 border-white/10 text-white rounded-[3rem] p-0 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                <div className="relative p-10 space-y-10">
                    {/* Background Decorative Element */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />

                    <DialogHeader className="flex flex-col items-center space-y-6">
                        {/* Logo Container */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                            <img
                                src="/logo_coniap.webp"
                                alt="CONIAP Logo"
                                className="relative w-24 h-auto drop-shadow-2xl"
                            />
                        </motion.div>

                        <div className="space-y-2 text-center">
                            <DialogTitle className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                                {t.title}
                            </DialogTitle>
                            <DialogDescription className="text-zinc-400 text-lg font-light leading-relaxed max-w-[280px] mx-auto">
                                {t.description}
                            </DialogDescription>
                        </div>
                    </DialogHeader>

                    <div className="flex flex-col gap-5">
                        <a href={externalLoginUrl} onClick={() => onClose(false)} className="w-full">
                            <Button className="w-full h-16 rounded-2xl bg-primary text-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-bold text-xl gap-4 shadow-[0_10px_30px_rgba(var(--primary),0.3)] group">
                                {t.login}
                                <LogIn size={22} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </a>

                        <a href={`${PLATFORM_URL}/${locale}/signup`} onClick={() => onClose(false)} className="w-full">
                            <Button
                                variant="ghost"
                                className="w-full h-16 rounded-2xl border border-white/10 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-500 font-bold text-xl group relative overflow-hidden"
                            >
                                <span className="relative z-10">{t.register}</span>
                                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </Button>
                        </a>
                    </div>
                </div>

                {/* Footer Brand */}
                <div className="bg-white/5 py-5 text-center border-t border-white/5">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-[0.4em] font-black">
                        IIAP • CONIAP 2026
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
