'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, ArrowRight } from 'lucide-react'
import { ICTASectionContent } from '@/types'
import { Button } from '@/components/ui/button'
import { getSecureMagicLink } from '@/lib/auth-tickets'
import { toast } from 'react-toastify'
import { useLocale } from 'next-intl'
import { useAuthContext } from '@/provider/authProvider'
import { AuthRequiredModal } from '@/components/general/Modals/AuthRequiredModal'

interface CTASectionProps {
    content: ICTASectionContent
    currentEditionId?: string
    activeCallId?: string
}

export const CTAActionSection: React.FC<CTASectionProps> = ({ content, currentEditionId, activeCallId }) => {
    const { user } = useAuthContext()
    const locale = useLocale() as 'es' | 'en'
    const [loading, setLoading] = useState(false)
    const [showAuthModal, setShowAuthModal] = useState(false)

    const sectionContent = content?.[locale] || content?.['es']
    if (!sectionContent) return null

    const handleAction = async () => {
        if (!user || !user.id) {
            setShowAuthModal(true)
            return
        }

        setLoading(true)
        try {
            const baseUrl = window.location.origin
            const targetPath = activeCallId ? `/dashboard/convocatorias/${activeCallId}` : sectionContent.target_path

            const magicLink = await getSecureMagicLink(
                user.id,
                {
                    targetPath,
                    editionId: currentEditionId
                },
                baseUrl
            )
            window.location.href = magicLink
        } catch (error) {
            console.error('Error generating action link:', error)
            toast.error(locale === 'es' ? 'Error al procesar la solicitud' : 'Error processing request')
            setLoading(false)
        }
    }

    // Split title for typographic grid
    const words = sectionContent.title.trim().split(/\s+/)
    const word1 = words[0] || ''
    const word2 = words[1] || ''
    const word3 = words.length > 2 ? words.slice(2).join(' ') : ''

    return (
        <section className="relative w-full bg-black py-20 md:py-32 px-4 md:px-8 overflow-hidden text-white min-h-[600px] flex items-center">
            {/* Background Grain/Subtle Effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

            {/* Ambient Glows */}
            <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="flex flex-col space-y-16 md:space-y-32">

                    {/* Typographic Header Block */}
                    <div className="flex flex-col gap-8 md:gap-y-16 items-start">

                        {/* Word 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-6xl sm:text-8xl md:text-[8vw] font-black uppercase tracking-tighter leading-none">
                                {word1}
                            </h2>
                        </motion.div>

                        {/* Word 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="md:text-right"
                        >
                            <h2 className="text-6xl sm:text-8xl md:text-[8vw] font-black uppercase tracking-tighter leading-none opacity-80 md:opacity-100">
                                {word2}
                            </h2>
                        </motion.div>

                        {/* Bottom Left: Circle + Word 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-4 md:gap-8"
                        >
                            <div className="w-12 h-12 md:w-[6vw] md:h-[6vw] bg-white rounded-full flex-shrink-0 animate-pulse shadow-[0_0_40px_rgba(255,255,255,0.2)]" />
                            <h2 className="text-6xl sm:text-8xl md:text-[8vw] font-black uppercase tracking-tighter leading-none">
                                {word3}
                            </h2>
                        </motion.div>
                    </div>

                    {/* Action Block (Now explicitly below/after the words) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12"
                    >
                        <div className="max-w-xl">
                            <p className="text-xl md:text-3xl text-zinc-400 font-light leading-relaxed">
                                {sectionContent.description}
                            </p>
                        </div>

                        <Button
                            size="lg"
                            disabled={loading}
                            onClick={handleAction}
                            className="h-16 md:h-24 w-full md:w-auto min-w-[300px] rounded-none border border-white/20 px-12 md:px-16 text-xl md:text-3xl font-black bg-transparent text-white hover:text-black transition-all duration-500 group uppercase tracking-[0.2em] relative overflow-hidden"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={loading ? 'loading' : 'idle'}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex items-center justify-between md:justify-center gap-8 relative z-10 w-full"
                                >
                                    {loading ? (
                                        <Loader2 className="animate-spin mx-auto" size={32} />
                                    ) : (
                                        <>
                                            <span className="whitespace-nowrap">{sectionContent.button_text}</span>
                                            <ArrowRight className="group-hover:translate-x-3 transition-transform duration-500" size={36} />
                                        </>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </Button>
                    </motion.div>
                </div>
            </div>
            {/* Official Footer */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 opacity-20 pointer-events-none">
                <p className="text-[10px] uppercase font-bold tracking-[0.5em] whitespace-nowrap">
                    {locale === 'es' ? 'Plataforma Oficial CONIAP' : 'Official CONIAP Platform'}
                </p>
            </div>

            <AuthRequiredModal
                isOpen={showAuthModal}
                onClose={setShowAuthModal}
                nextPath={activeCallId ? `/${locale}/dashboard/convocatorias/${activeCallId}` : sectionContent.target_path}
            />
        </section>
    )
}
