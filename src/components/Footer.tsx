'use client'

import { useState, useEffect } from 'react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import {
    Facebook,
    Instagram,
    Youtube,
    Linkedin,
    Send,
} from 'lucide-react'
import { fetchGlobalSettings } from '@/api/cms'
import { IGlobalSettings } from '@/types/CMS'

export function Footer() {
    const t = useTranslations('Footer')
    const [settings, setSettings] = useState<IGlobalSettings | null>(null)

    useEffect(() => {
        const getData = async () => {
            const data = await fetchGlobalSettings()
            if (data) {
                setSettings(data)
            }
        }
        getData()
    }, [])

    const socialLinks = [
        { icon: Facebook, href: settings?.social_networks.facebook || '#', label: 'Facebook' },
        { icon: Instagram, href: settings?.social_networks.instagram || '#', label: 'Instagram' },
        { icon: Youtube, href: settings?.social_networks.youtube || '#', label: 'Youtube' },
        { icon: Linkedin, href: settings?.social_networks.linkedin || '#', label: 'Linkedin' },
    ]

    const navLinks = [
        { href: '/', label: t('nav.home') },
        { href: '/agenda', label: t('nav.agenda') },
        { href: '/speakers', label: t('nav.speakers') },
        { href: '/inscriptions', label: t('nav.inscriptions') },
        { href: '/contact', label: t('nav.contact') },
    ]

    return (
        <footer className="bg-slate-950 text-zinc-400 py-20 px-6 overflow-hidden">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="relative">
                            <img
                                src="/logo_coniap.webp"
                                alt="CONIAP Logo"
                                className="h-20 md:h-24 w-auto object-contain transition-all duration-700 hover:scale-105 brightness-0 invert"
                            />
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-12 h-0.5 bg-primary"></div>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none text-white">
                                CONIAP
                            </h2>
                            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 max-w-xs leading-relaxed">
                                {t('description')}
                            </p>
                        </div>
                    </div>

                    {/* Navigation Section */}
                    <div className="space-y-8 text-center md:text-left">
                        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary">
                            {t('nav.home')} & {t('nav.agenda')}
                        </h3>
                        <ul className="grid grid-cols-1 gap-4">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-xs font-bold uppercase tracking-widest hover:text-white transition-all duration-300 opacity-80 hover:opacity-100 hover:pl-2 inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect Section */}
                    <div className="space-y-8 text-center md:text-left">
                        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary">
                            {t('sections.connect')}
                        </h3>
                        <div className="relative group max-w-sm mx-auto md:mx-0 mb-8 font-mono">
                            <input
                                type="email"
                                placeholder="E-MAIL"
                                className="w-full bg-transparent border-b border-zinc-800 py-3 pr-10 focus:outline-none focus:border-primary transition-all duration-500 placeholder:text-zinc-700 text-xs font-bold uppercase tracking-widest"
                            />
                            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-primary hover:scale-125 transition-all duration-300">
                                <Send size={18} />
                            </button>
                        </div>
                        <div className="flex justify-center md:justify-start gap-8">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-all duration-300 hover:-translate-y-1 opacity-60 hover:opacity-100"
                                    title={social.label}
                                >
                                    <social.icon size={20} strokeWidth={2.5} />
                                </a>
                            ))}
                        </div>
                        <p className="text-sm font-black tracking-tighter text-white/20 mt-6 italic">
                            {t('hashtag')}
                        </p>
                    </div>
                </div>

                {/* Bottom Divider */}
                <div className="pt-12 border-t border-zinc-900">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-600">
                            © {new Date().getFullYear()} CONIAP. {t('copy')}
                        </p>
                        <div className="flex gap-6">
                            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-700">
                                {t('location')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
