'use client'

import { Button } from '@/components/ui/button'
import { CardSpeaker } from '@/components'
import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'
import { IPerson, IMagistralSpeakersSectionContent } from '@/types'
import { useLocale } from 'next-intl'

interface IProps {
    persons: IPerson[] | undefined
    content: IMagistralSpeakersSectionContent
}

export const MagistralSpeakersHomeSection = (props: IProps) => {
    const { persons, content } = props
    const locale = useLocale() as 'es' | 'en'
    const sectionContent = content?.[locale] || content?.['es']

    if (!sectionContent) return null

    return (
        <section className="relative py-24  overflow-hidden bg-amber-50">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.header
                    className="mb-16"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-3 h-3 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50" />
                        <p className="text-sm font-black uppercase tracking-[0.3em] text-zinc-500">
                            {sectionContent.hashtag}
                        </p>
                    </div>

                    <div className="max-w-4xl mb-10">
                        <h2 className="text-4xl md:text-7xl text-zinc-950 leading-[0.95] tracking-tighter"
                            dangerouslySetInnerHTML={{ __html: sectionContent.title }}
                        />
                    </div>

                    <Button size="lg" className="rounded-full px-10 py-7 text-lg font-bold bg-primary hover:brightness-110 transition-all shadow-xl shadow-primary/20 group" asChild>
                        <Link href="/speakers" className="flex items-center gap-2">
                            {locale === 'es' ? 'Ver más' : 'See more'}
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                →
                            </motion.span>
                        </Link>
                    </Button>
                </motion.header>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {persons && persons.length > 0 ? (
                        persons.slice(0, 8).map((speaker, index) => (
                            <motion.div
                                key={speaker.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <CardSpeaker speaker={speaker} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-zinc-400 font-bold uppercase tracking-widest">Próximamente más ponentes magistrales</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
