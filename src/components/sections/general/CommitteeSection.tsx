'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { ICommitteeSectionContent } from '@/types/CMS'
import { Users2, ShieldCheck, Cpu } from 'lucide-react'

interface CommitteeSectionProps {
    content: ICommitteeSectionContent
}

const iconMap: Record<string, React.ReactNode> = {
    'Comité Organizador': <ShieldCheck className="text-primary" size={24} />,
    'Organizing Committee': <ShieldCheck className="text-primary" size={24} />,
    'Comité Científico': <Users2 className="text-primary" size={24} />,
    'Scientific Committee': <Users2 className="text-primary" size={24} />,
    'Comité de Informática': <Cpu className="text-primary" size={24} />,
    'IT Committee': <Cpu className="text-primary" size={24} />,
}

export function CommitteeSection({ content }: CommitteeSectionProps) {
    const locale = useLocale() as 'es' | 'en'
    const { title, subtitle, description, committees } = content

    return (
        <section className="py-24 px-6 bg-white relative overflow-hidden">
            <div className="container mx-auto relative z-10">
                <div className="max-w-4xl mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        {/* Header Badge */}
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-600">
                                {title[locale]}
                            </span>
                        </div>

                        {/* Main Title */}
                        <h2 className="text-4xl md:text-5xl font-medium text-zinc-900 tracking-tight leading-tight">
                            {subtitle?.[locale].split(' ').map((word, i) => (
                                <span key={i} className={word.toUpperCase() === 'COLUMNA' || word.toUpperCase() === 'CONIAP' ? 'font-bold' : ''}>
                                    {word}{' '}
                                </span>
                            ))}
                        </h2>

                        <hr className="w-1/2 border-primary/30 border-b-3" />
                        {description && (
                            <p className="text-zinc-500 text-lg font-normal max-w-2xl pt-4">
                                {description[locale]}
                            </p>
                        )}
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                    {committees.map((group, groupIndex) => (
                        <motion.div
                            key={group.title.es}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                            className="space-y-6"
                        >
                            <h3 className="text-base font-bold text-zinc-800 uppercase tracking-wide border-l-2 border-primary/30 pl-3">
                                {group.title[locale]}
                            </h3>

                            <ul className="space-y-2.5">
                                {group.members.map((member, i) => (
                                    <li key={i} className="flex flex-col group">
                                        <div className="flex items-start gap-2">
                                            <div className="w-1 h-1 rounded-full bg-zinc-300 mt-1.5 shrink-0" />
                                            <span className="text-zinc-600 text-sm font-semibold tracking-tight transition-colors group-hover:text-primary leading-tight">
                                                {member.name}
                                            </span>
                                        </div>
                                        {member.role && (
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-3 mt-0.5">
                                                {member.role}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

