'use client'

import { useState } from 'react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { Menu, X, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
    const t = useTranslations('HomePage.nav')
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = [
        { href: '/about', label: t('about') },
        { href: '/blog', label: t('blog') },
        { href: '/news', label: t('news') },
    ]

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-transparent">
                {/* Left: Nav Links (Desktop) */}
                <div className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-white/90 hover:text-white transition-colors tracking-wide uppercase"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Center: Logo */}
                <div className="flex items-center justify-center">
                    <h1 className="text-2xl font-bold tracking-tighter text-white">
                        CONIAP <span className="text-blue-500">IIAP</span>
                    </h1>
                </div>

                {/* Right: Newsletter & Contact */}
                <div className="flex items-center space-x-6">
                    <div className="hidden md:flex items-center space-x-2 text-white/90 cursor-pointer hover:text-white transition-colors">
                        <Mail size={18} />
                        <span className="text-sm font-medium uppercase tracking-wide">Newsletter</span>
                    </div>

                    {/* Language Switcher */}
                    <div className="hidden md:flex items-center">
                        <Link href="/" locale="es" className="text-xs font-bold text-white/60 hover:text-white px-2">ES</Link>
                        <span className="text-white/20">|</span>
                        <Link href="/" locale="en" className="text-xs font-bold text-white/60 hover:text-white px-2">EN</Link>
                    </div>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all"
                    >
                        <span className="text-sm font-semibold uppercase">{t('menu')}</span>
                        <Menu size={20} />
                    </button>

                    <Link
                        href="/contact"
                        className="hidden md:flex items-center bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                    >
                        {t('contact')}
                    </Link>
                </div>
            </nav>

            {/* Mobile / Fullscreen Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] bg-zinc-950 flex flex-col p-12"
                    >
                        <div className="flex justify-between items-center mb-24">
                            <div className="bg-lime-400 text-zinc-900 px-4 py-2 font-mono text-sm uppercase">
                                Instant Quote
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="flex items-center space-x-2 text-white bg-white/10 px-4 py-2 border border-white/20"
                            >
                                <span>Close</span>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col space-y-6">
                            {[
                                { href: '/', label: 'Home' },
                                ...navLinks,
                                { href: '/sustainability', label: 'Sostenibilidad' },
                                { href: '/contact', label: 'Contacto' },
                            ].map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-5xl md:text-7xl font-black text-white hover:text-blue-500 transition-colors uppercase tracking-tighter"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
