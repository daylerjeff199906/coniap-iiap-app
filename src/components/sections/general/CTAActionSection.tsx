'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Rocket, Loader2, ArrowRight } from 'lucide-react'
import { ICTASectionContent, IUser } from '@/types'
import { Button } from '@/components/ui/button'
import { getSecureMagicLink } from '@/lib/auth-tickets'
import { toast } from 'react-toastify'
import { useLocale } from 'next-intl'

interface CTASectionProps {
    content: ICTASectionContent
    user: IUser | null
    currentEditionId?: string
}

export const CTAActionSection: React.FC<CTASectionProps> = ({ content, user, currentEditionId }) => {
    const locale = useLocale() as 'es' | 'en'
    const [loading, setLoading] = useState(false)
    const sectionContent = content?.[locale] || content?.['es']

    if (!sectionContent) return null

    const handleAction = async () => {
        if (!user || !user.id) {
            toast.info(locale === 'es' ? 'Por favor, inicia sesión para continuar' : 'Please log in to continue')
            return
        }

        setLoading(true)
        try {
            // Generate the secure magic link
            const baseUrl = window.location.origin
            const magicLink = await getSecureMagicLink(
                user.id,
                {
                    targetPath: sectionContent.target_path,
                    editionId: currentEditionId
                },
                baseUrl
            )

            // Redirect the user to the magic link endpoint
            window.location.href = magicLink
        } catch (error) {
            console.error('Error generating action link:', error)
            toast.error(locale === 'es' ? 'Error al procesar la solicitud' : 'Error processing request')
            setLoading(false)
        }
    }

    return (
        <section className="relative py-24 bg-zinc-950 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-6">
                <div className="bg-zinc-900/50 border border-white/5 rounded-[3rem] p-8 md:p-16 relative overflow-hidden group">
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4"
                        >
                            <Rocket size={40} className="group-hover:translate-y-[-4px] group-hover:translate-x-[4px] transition-transform duration-500" />
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="max-w-3xl"
                        >
                            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter uppercase italic mb-6">
                                {sectionContent.title}
                            </h2>
                            <p className="text-xl text-zinc-400 font-light leading-relaxed">
                                {sectionContent.description}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Button
                                size="lg"
                                disabled={loading}
                                onClick={handleAction}
                                className="rounded-full px-12 py-8 text-xl font-black uppercase italic tracking-widest bg-primary hover:bg-white hover:text-primary transition-all duration-500 shadow-2xl shadow-primary/20 min-w-[280px]"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin mr-3" />
                                ) : (
                                    <>
                                        {sectionContent.button_text}
                                        <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
