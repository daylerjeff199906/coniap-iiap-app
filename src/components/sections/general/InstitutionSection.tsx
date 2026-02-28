'use client'

import { motion } from 'framer-motion'
import { IInstitutionSectionContent } from '@/types/CMS'
import { useLocale } from 'next-intl'

interface InstitutionSectionProps {
    content: IInstitutionSectionContent;
}

export function InstitutionSection({ content }: InstitutionSectionProps) {
    const locale = useLocale() as 'es' | 'en'

    if (!content) return null

    const data = content[locale] || content['es']

    return (
        <section className="relative py-24 bg-white overflow-hidden">
            {/* Background Large Text (Watermark) */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none overflow-hidden opacity-[0.03]">
                <h1 className="text-[12rem] md:text-[20rem] font-bold leading-none tracking-tighter text-zinc-900 translate-x-[10%] translate-y-[-10%]">
                    {data.watermark}
                </h1>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative group"
                    >
                        <div className="relative aspect-[5/3] rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={data.image_url}
                                alt={data.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -z-10" />
                    </motion.div>

                    {/* Right Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4 block"
                        >
                            {data.subtitle}
                        </motion.span>

                        <h2 className="text-5xl md:text-7xl font-black text-zinc-900 leading-[0.9] mb-8 uppercase tracking-tighter">
                            {data.title}
                        </h2>

                        <div className="space-y-6">
                            <p className="text-zinc-600 text-lg md:text-xl leading-relaxed">
                                {data.content}
                            </p>
                        </div>

                        <div className="mt-10 flex items-center gap-4">
                            <div className="h-0.5 w-12 bg-primary" />
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">
                                CONIAP & IIAP
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
