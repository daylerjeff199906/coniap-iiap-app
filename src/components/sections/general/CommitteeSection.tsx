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
        <section className="py-24 px-6 bg-zinc-950 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto relative z-10">
                <div className="max-w-4xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4"
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                            {title[locale]} <br />
                            {subtitle && <span className="text-primary italic tracking-widest">{subtitle[locale]}</span>}
                        </h2>
                        {description && (
                            <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mt-6">
                                {description[locale]}
                            </p>
                        )}
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {committees.map((group, groupIndex) => (
                        <motion.div
                            key={group.title.es}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                            className="bg-white/5 rounded-[2.5rem] p-10 border border-white/10 hover:border-primary/30 transition-all duration-500 hover:bg-white/[0.07]"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                    {iconMap[group.title.es] || <Users2 className="text-primary" size={24} />}
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">
                                    {group.title[locale]}
                                </h3>
                            </div>

                            <ul className="space-y-3">
                                {group.members.map((member, i) => (
                                    <li key={i} className="flex flex-col">
                                        <span className="text-zinc-300 font-bold tracking-tight">
                                            {member.name}
                                        </span>
                                        {member.role && (
                                            <span className="text-xs font-black text-primary/60 uppercase tracking-widest">
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
