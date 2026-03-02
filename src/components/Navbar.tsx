'use client'

import { useState, useEffect } from 'react'
import { Link, usePathname } from '@/i18n/routing'
import { useTranslations, useLocale } from 'next-intl'
import { Menu, X, Mail, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/auth/useAuth'
import { ProfilePopover } from '@/modules/core/components'

export function Navbar() {
    const t = useTranslations('HomePage.nav')
    const pathname = usePathname()
    const currentLocale = useLocale()
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { user, loading, logout, getUser } = useAuth()

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Prevent scrolling on body when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const navLinks = [
        { href: '/', label: t('home'), isVisible: false },
        { href: '/about', label: t('about'), isVisible: true },
        { href: '/editions', label: t('editions'), isVisible: true },
        { href: '/events', label: t('events'), isVisible: false },
        { href: '/speakers', label: t('speakers'), isVisible: false },
        { href: '/blog', label: t('blog'), isVisible: false },
        { href: '/news', label: t('news'), isVisible: false },
    ]

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-500 ${scrolled ? 'bg-slate-900/95 shadow-xl backdrop-blur-md' : 'bg-transparent'
                    }`}
            >
                {/* Left: Nav Links (Desktop) */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.filter((link) => link.isVisible).map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-xs font-bold text-white/80 hover:text-white transition-colors tracking-widest uppercase"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Center: Logo */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <Link href="/">
                        <img
                            src="/logo_coniap.webp"
                            alt="CONIAP Logo"
                            className="h-8 md:h-14 w-auto brightness-0 invert"
                        />
                    </Link>
                </div>

                {/* Right: Newsletter & Contact */}
                <div className="flex items-center space-x-6">
                    <div className="hidden lg:flex items-center space-x-2 text-white/80 cursor-pointer hover:text-white transition-colors">
                        <Mail size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Newsletter</span>
                    </div>

                    {/* Language Switcher */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link
                            href={pathname}
                            locale="es"
                            className={`text-[10px] font-black px-2 py-1 rounded border transition-all ${currentLocale === 'es'
                                ? 'text-white border-white/40 bg-white/10'
                                : 'text-white/50 border-white/10 hover:text-white'
                                }`}
                        >
                            ES
                        </Link>
                        <Link
                            href={pathname}
                            locale="en"
                            className={`text-[10px] font-black px-2 py-1 rounded border transition-all ${currentLocale === 'en'
                                ? 'text-white border-white/40 bg-white/10'
                                : 'text-white/50 border-white/10 hover:text-white'
                                }`}
                        >
                            EN
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-white hover:bg-white/10 transition-all"
                    >
                        <span className="text-[10px] font-black uppercase tracking-widest">{t('menu')}</span>
                        <Menu size={16} />
                    </button>

                    {user ? (
                        <ProfilePopover user={user} loading={loading} logout={logout} />
                    ) : (
                        <Link
                            href="/login"
                            className="group hidden md:flex items-center bg-primary text-white p-1 pr-6 rounded-full text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                        >
                            <div className="bg-white rounded-full h-8 w-8 flex items-center justify-center mr-3 text-primary transition-transform group-hover:translate-x-1">
                                <ArrowRight size={18} />
                            </div>
                            {t('contact')}
                        </Link>
                    )}
                </div>
            </nav>

            {/* Mobile / Fullscreen Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[60] bg-zinc-950 flex flex-col p-12 overflow-y-auto"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] pointer-events-none" />

                        <div className="relative z-10 flex justify-between items-center mb-16 flex-shrink-0">
                            <div className="bg-primary text-white px-4 py-2 font-black text-[10px] uppercase tracking-widest rounded-sm">
                                Explore CONIAP
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="flex items-center space-x-2 text-white/80 hover:text-white bg-white/5 px-4 py-2 border border-white/10 rounded-full transition-all"
                            >
                                <span className="text-[10px] font-black uppercase tracking-widest">Close</span>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="relative z-10 flex flex-col space-y-4 md:space-y-6">
                            {navLinks?.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="group inline-flex items-center text-5xl md:text-7xl font-black text-white/40 hover:text-white transition-all uppercase tracking-tighter"
                                    >
                                        <span className="mr-6 text-xl text-primary opacity-0 group-hover:opacity-100 transition-opacity">/ 0{i + 1}</span>
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Mobile Language Switcher */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: (navLinks?.length || 0) * 0.1 + 0.2 }}
                                className="flex items-center space-x-4 pt-12"
                            >
                                <Link
                                    href={pathname}
                                    locale="es"
                                    onClick={() => setIsOpen(false)}
                                    className={`text-2xl font-black px-6 py-3 rounded border transition-all ${currentLocale === 'es'
                                        ? 'text-white border-primary bg-primary/20'
                                        : 'text-white/30 border-white/10'
                                        }`}
                                >
                                    ES
                                </Link>
                                <Link
                                    href={pathname}
                                    locale="en"
                                    onClick={() => setIsOpen(false)}
                                    className={`text-2xl font-black px-6 py-3 rounded border transition-all ${currentLocale === 'en'
                                        ? 'text-white border-primary bg-primary/20'
                                        : 'text-white/30 border-white/10'
                                        }`}
                                >
                                    EN
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
