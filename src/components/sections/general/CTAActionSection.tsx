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
}

export const CTAActionSection: React.FC<CTASectionProps> = ({ content, currentEditionId }) => {
    const { user } = useAuthContext()
    const locale = useLocale() as 'es' | 'en'
    const [loading, setLoading] = useState(false)
    const [showAuthModal, setShowAuthModal] = useState(false)

    const sectionContent = content?.[locale] || content?.['es']

    if (!sectionContent) return null

    // Image fallback if not provided in CMS
    const backgroundImage = sectionContent.image_url || '/brands/cta_bg.webp'

    const handleAction = async () => {
        if (!user || !user.id) {
            setShowAuthModal(true)
            return
        }

        setLoading(true)
        try {
            const baseUrl = window.location.origin
            const magicLink = await getSecureMagicLink(
                user.id,
                {
                    targetPath: sectionContent.target_path,
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

    // Split title for fancy "on" style
    const titleParts = sectionContent.title.split(' ')
    const mainTitle = titleParts.slice(0, -1).join(' ')
    const lastWord = titleParts[titleParts.length - 1]

    return (
        <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center py-12 px-4 md:px-8">
            <div className="relative w-full max-w-7xl h-full rounded-[2.5rem] overflow-hidden shadow-2xl">

                {/* Full Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Brand Logos (Bottom Left) */}
                <div className="absolute bottom-12 left-12 hidden md:flex items-center gap-8 opacity-70 grayscale invert brightness-0">
                    <img src="/brands/brand_1.svg" alt="" className="h-6" />
                    <img src="/brands/brand_2.svg" alt="" className="h-6" />
                    <img src="/brands/brand_3.svg" alt="" className="h-6" />
                </div>

                <div className="container mx-auto h-full flex items-center justify-end">

                    {/* Glass Card on the Right */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-[500px] h-full md:h-[90%] relative z-10"
                    >
                        <div className="w-full h-full bg-black/20 backdrop-blur-3xl border-l border-white/10 p-10 md:p-16 flex flex-col justify-center text-white space-y-8">

                            <div className="space-y-4">
                                <h2 className="text-5xl md:text-6xl font-medium tracking-tight leading-[1.1]">
                                    {mainTitle}{' '}
                                    <span className="italic font-serif opacity-90">{lastWord}</span>
                                </h2>

                                <p className="text-lg text-zinc-300 font-light leading-relaxed max-w-sm">
                                    {sectionContent.description}
                                </p>
                            </div>

                            <div className="pt-8">
                                <Button
                                    size="lg"
                                    disabled={loading}
                                    onClick={handleAction}
                                    className="h-16 rounded-full px-10 text-lg font-medium bg-primary hover:scale-105 transition-all duration-300 flex items-center gap-4 shadow-[0_0_30px_rgba(204,255,0,0.3)]"
                                >
                                    <AnimatePresence mode="wait">
                                        <div className='flex items-center gap-4'>
                                            {loading ? (
                                                <Loader2 className="animate-spin" />
                                            ) : (
                                                <>
                                                    <span>{sectionContent.button_text}</span>
                                                    <div className="h-full border-l border-black/10 pl-4">
                                                        <ArrowRight size={20} />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </AnimatePresence>
                                </Button>
                            </div>

                            <div className="pt-4 border-t border-white/5 opacity-40">
                                <p className="text-[10px] uppercase font-bold tracking-[0.2em]">
                                    {locale === 'es' ? 'Plataforma Oficial CONIAP' : 'Official CONIAP Platform'}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <AuthRequiredModal
                isOpen={showAuthModal}
                onClose={setShowAuthModal}
            />
        </section>
    )
}
