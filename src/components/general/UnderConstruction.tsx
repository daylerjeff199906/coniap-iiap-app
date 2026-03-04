'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Hammer, ArrowLeft, Home } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useLocale } from 'next-intl'

export function UnderConstruction() {
    const locale = useLocale()

    const content = {
        es: {
            title: 'Página en Construcción',
            description: 'Estamos trabajando arduamente para brindarte la mejor experiencia. Vuelve pronto para ver las novedades.',
            button: 'Volver al Inicio'
        },
        en: {
            title: 'Page Under Construction',
            description: 'We are working hard to provide you with the best experience. Come back soon to see the news.',
            button: 'Back to Home'
        }
    }[locale as 'es' | 'en'] || {
        title: 'Página en Construcción',
        description: 'Estamos trabajando arduamente para brindarte la mejor experiencia. Vuelve pronto para ver las novedades.',
        button: 'Volver al Inicio'
    }

    return (
        <div className="min-h-[70vh] w-full flex flex-col items-center justify-center px-6 text-center bg-zinc-950 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 flex flex-col items-center gap-8"
            >
                <div className="relative">
                    <motion.div
                        animate={{
                            rotate: [0, 10, -10, 0],
                            y: [0, -5, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="bg-primary/20 p-8 rounded-[2rem] border border-primary/20 backdrop-blur-sm"
                    >
                        <Hammer size={64} className="text-primary" />
                    </motion.div>
                </div>

                <div className="space-y-4 max-w-2xl">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                        {content.title}
                    </h1>
                    <p className="text-zinc-500 text-lg md:text-xl font-medium">
                        {content.description}
                    </p>
                </div>

                <Link href="/">
                    <button className="flex items-center gap-3 bg-white text-black font-black uppercase tracking-[0.2em] px-8 py-5 rounded-2xl hover:bg-primary transition-all duration-300 group">
                        <Home size={20} />
                        {content.button}
                    </button>
                </Link>
            </motion.div>
        </div>
    )
}
