'use client'

import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import {
    Facebook,
    Instagram,
    Youtube,
    Linkedin,
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
        <footer className="bg-[#E9ECEF] py-16 px-6">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:space-x-24 space-y-12 md:space-y-0 text-zinc-900 mb-16">
                    {/* Tree Logo */}
                    <div className="flex-shrink-0">
                        <img
                            src="/logo_coniap.webp"
                            alt="CONIAP Logo"
                            className="h-56 md:h-72 w-auto object-contain transition-transform duration-700 hover:scale-105"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-8 max-w-2xl">
                        <div className="space-y-3">
                            <h2 className="text-6xl md:text-7xl font-black tracking-tighter uppercase leading-none text-[#212529]">
                                CONIAP
                            </h2>
                            <p className="text-sm md:text-lg font-bold uppercase tracking-[0.1em] text-[#495057] max-w-xl">
                                {t('description')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 w-full pt-4">
                            <div className="space-y-1">
                                <p className="text-base font-medium text-[#6C757D]">
                                    {t('date')}
                                </p>
                                <p className="text-base font-black text-[#212529] uppercase tracking-widest">
                                    {t('location')}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <p className="text-2xl font-black text-[#212529] tracking-tighter">
                                    {t('hashtag')}
                                </p>
                                <div className="flex justify-center md:justify-start space-x-6">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#212529] hover:text-primary transition-all duration-300 hover:-translate-y-1"
                                        >
                                            <social.icon size={26} strokeWidth={2.5} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Divider and Nav */}
                <div className="pt-10 border-t border-[#DEE2E6]">
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-xs font-bold text-[#6C757D] hover:text-primary transition-colors uppercase tracking-[0.2em]"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ADB5BD]">
                            {t('copy')}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
