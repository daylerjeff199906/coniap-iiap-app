'use client'

import { motion } from 'framer-motion'
import { IGallerySectionContent } from '@/types/CMS'
import { useLocale } from 'next-intl'

interface GallerySectionProps {
    content: IGallerySectionContent;
}

export function GallerySection({ content }: GallerySectionProps) {
    const locale = useLocale() as 'es' | 'en'

    if (!content || !content.images) return null

    const title = content.title[locale] || content.title['es']
    const description = content.description?.[locale] || content.description?.['es']

    return (
        <section className="py-24 bg-zinc-50 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4"
                    >
                        Gallery
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-zinc-900 uppercase tracking-tighter mb-6"
                    >
                        {title}
                    </motion.h2>
                    {description && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-zinc-600 text-lg"
                        >
                            {description}
                        </motion.p>
                    )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {content.images.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className={`relative overflow-hidden group rounded-xl aspect-square shadow-md hover:shadow-xl transition-all ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                                }`}
                        >
                            <img
                                src={image.url}
                                alt={image.alt[locale] || image.alt['es']}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
                                <p className="text-white font-bold text-sm uppercase tracking-wider">
                                    {image.alt[locale] || image.alt['es']}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
