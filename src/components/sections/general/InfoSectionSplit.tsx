'use client'

import { motion } from 'framer-motion'
import { ISplitInfoSectionContent } from '@/types/CMS'
import { useLocale } from 'next-intl'

interface InfoSectionSplitProps {
    content: ISplitInfoSectionContent;
}

export function InfoSectionSplit({ content }: InfoSectionSplitProps) {
    const locale = useLocale() as 'es' | 'en'

    if (!content) return null

    const description = content.description[locale] || content.description['es']
    const mainHeading = content.main_heading[locale] || content.main_heading['es']
    const sideTitle = content.side_title[locale] || content.side_title['es']

    // Split description into two columns if possible
    const paragraphs = description.split('\n').filter(p => p.trim() !== '')

    return (
        <section className="bg-[#f0f2f5] py-24 px-6 overflow-hidden">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* Left Side: Boxed Title */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 flex flex-col justify-end"
                    >
                        <div className="bg-zinc-950 p-8 md:p-12 inline-block">
                            <h2 className="text-4xl md:text-7xl font-black text-white leading-none tracking-tighter uppercase truncate">
                                {sideTitle}
                            </h2>
                        </div>
                        {content.image_url && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="pt-8 flex justify-end"
                            >
                                <img
                                    src={content.image_url}
                                    alt={mainHeading}
                                    className="w-1/2 h-auto rounded-sm shadow-xl "
                                />
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Right Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:w-1/2 space-y-12"
                    >
                        <div className="space-y-4">
                            <p className="text-primary font-black tracking-[0.3em] uppercase text-sm">
                                {content.hashtag}
                            </p>
                            <h3 className="text-3xl md:text-5xl font-black text-zinc-950 leading-tight uppercase tracking-tighter max-w-2xl">
                                {mainHeading}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                            {paragraphs.length > 1 ? (
                                <>
                                    <p className="text-zinc-600 text-sm md:text-base leading-relaxed font-medium">
                                        {paragraphs[0]}
                                    </p>
                                    <p className="text-zinc-600 text-sm md:text-base leading-relaxed font-medium">
                                        {paragraphs.slice(1).join('\n\n')}
                                    </p>
                                </>
                            ) : (
                                <p className="text-zinc-600 text-sm md:text-base leading-relaxed font-medium md:col-span-2">
                                    {description}
                                </p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
