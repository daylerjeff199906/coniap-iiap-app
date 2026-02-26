'use client'

import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import {
    Facebook,
    Instagram,
    Youtube,
    Linkedin,
    Send,
} from 'lucide-react'

export function Footer() {
    const t = useTranslations('Footer')

    const socialLinks = [
        { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
        { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
        { icon: Youtube, href: 'https://youtube.com', label: 'Youtube' },
        { icon: Linkedin, href: 'https://linkedin.com', label: 'Linkedin' },
    ]

    const navLinks = [
        { href: '/', label: t('nav.home') },
        { href: '/agenda', label: t('nav.agenda') },
        { href: '/speakers', label: t('nav.speakers') },
        { href: '/inscriptions', label: t('nav.inscriptions') },
        { href: '/contact', label: t('nav.contact') },
    ]

    return (
        <footer className="bg-secondary text-secondary-foreground py-20 px-6 overflow-hidden">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Section */}
                    <div className="space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="relative">
                            <img
                                src="/logo_coniap.webp"
                                alt="CONIAP Logo"
                                className="h-24 md:h-32 w-auto object-contain transition-all duration-700 hover:scale-105 brightness-0 invert"
                            />
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-12 h-1 bg-primary"></div>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none text-white">
                                CONIAP
                            </h2>
                            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-secondary-foreground/60 max-w-xs leading-relaxed">
                                {t('description')}
                            </p>
                        </div>
                    </div>

                    {/* Partners Section */}
                    <div className="space-y-8 text-center md:text-left">
                        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary">
                            {t('sections.partners')}
                        </h3>
                        <ul className="space-y-4">
                            {['IIAP', 'MINAM', 'CONCYTEC'].map((partner) => (
                                <li key={partner}>
                                    <a href="#" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-all duration-300 opacity-80 hover:opacity-100 hover:pl-2">
                                        {partner}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect Section */}
                    <div className="space-y-8 text-center md:text-left">
                        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary">
                            {t('sections.connect')}
                        </h3>
                        <div className="flex flex-col space-y-5">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-all duration-300 inline-flex items-center justify-center md:justify-start gap-3 opacity-80 hover:opacity-100 group"
                                >
                                    <social.icon size={16} className="group-hover:scale-125 transition-transform" />
                                    {social.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="space-y-8 text-center md:text-left">
                        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary">
                            {t('sections.newsletter')}
                        </h3>
                        <div className="relative group max-w-sm mx-auto md:mx-0">
                            <input
                                type="email"
                                placeholder="E-mail"
                                className="w-full bg-transparent border-b-2 border-secondary-foreground/20 py-3 pr-10 focus:outline-none focus:border-primary transition-all duration-500 placeholder:text-secondary-foreground/30 text-xs font-bold uppercase tracking-widest"
                            />
                            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-primary hover:scale-125 transition-all duration-300">
                                <Send size={18} />
                            </button>
                        </div>
                        <div className="space-y-2">
                            <div className="inline-block px-3 py-1 bg-white/5 rounded text-[9px] font-black uppercase tracking-[0.2em] text-primary">
                                {t('date')}
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">
                                {t('location')}
                            </p>
                            <p className="text-xl font-black tracking-tighter text-white mt-4 italic">
                                {t('hashtag')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Divider and Nav */}
                <div className="pt-12 border-t border-secondary-foreground/10">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                        <div className="flex flex-wrap justify-center lg:justify-start gap-x-10 gap-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-[9px] md:text-[10px] font-black hover:text-primary transition-all duration-300 uppercase tracking-[0.3em] opacity-60 hover:opacity-100"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                            <p className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-30">
                                {t('copy')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
