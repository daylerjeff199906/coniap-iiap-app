'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MousePointer2 } from 'lucide-react'
import { IEdition } from '@/types/CMS'
import Link from 'next/link'

interface EditionScrollerProps {
    editions: IEdition[]
    locale: string
}

export const EditionScroller: React.FC<EditionScrollerProps> = ({ editions, locale }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const observerOptions = {
            root: containerRef.current,
            threshold: 0.5,
        }

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = sectionRefs.current.indexOf(entry.target as HTMLDivElement)
                    if (index !== -1) {
                        setActiveIndex(index)
                    }
                }
            })
        }

        const observer = new IntersectionObserver(handleIntersection, observerOptions)

        sectionRefs.current.forEach((section) => {
            if (section) observer.observe(section)
        })

        return () => observer.disconnect()
    }, [editions])

    const scrollToSection = (index: number) => {
        sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' })
    }

    const allSlides = [
        {
            id: 'intro',
            year: locale === 'es' ? 'Inicio' : 'Home',
            title: locale === 'es' ? 'Bienvenido al Recorrido Histórico' : 'Welcome to the Historical Journey',
            description: locale === 'es' ? 'Haz scroll para conocer nuestro legado' : 'Scroll to explore our legacy',
            cover_url: 'https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/banners%2Fave-america-sur-habitat-natural-scaled.webp?alt=media',
            isIntro: true
        },
        ...editions.map(e => ({
            ...e,
            isIntro: false,
            slug: e.slug
        }))
    ]

    return (
        <div className="relative h-screen w-full overflow-hidden bg-black font-sans">
            {/* Main Scroll Container */}
            <div
                ref={containerRef}
                className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {allSlides.map((slide, index) => {
                    const isEditionSlide = !slide.isIntro;
                    const edition = slide as IEdition;

                    return (
                        <section
                            key={slide.id}
                            ref={(el) => { (sectionRefs.current[index] = el as HTMLDivElement) }}
                            className="relative h-screen w-full snap-start flex items-center justify-center overflow-hidden"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0 h-screen w-full">
                                <img
                                    src={slide.cover_url || '/placeholder.webp'}
                                    alt={typeof slide.year === 'number' ? slide.year.toString() : slide.year.toString()}
                                    className="w-full h-full object-cover opacity-60 transition-transform duration-1000 scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 container mx-auto px-6 text-white">
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-6xl md:text-8xl font-semibold tracking-tighter leading-none max-w-4xl">
                                        {slide.isIntro
                                            ? ('title' in slide ? slide.title as string : '')
                                            : (isEditionSlide ? (edition.name?.[locale as 'es' | 'en'] || `CONIAP ${edition.year}`) : '')}
                                    </h2>

                                    <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl font-light leading-relaxed">
                                        {slide.isIntro
                                            ? ('description' in slide && typeof slide.description === 'string' ? slide.description : '')
                                            : (isEditionSlide ? (edition.description?.[locale as 'es' | 'en'] || '') : '')}
                                    </p>

                                    {!slide.isIntro && (
                                        <div className="pt-8">
                                            <Link
                                                href={`/${locale}/editions/${edition.slug}`}
                                                className="group inline-flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all duration-300"
                                            >
                                                {locale === 'es' ? 'Conocer más' : 'Read more'}
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                            </Link>
                                        </div>
                                    )}

                                    {slide.isIntro && (
                                        <motion.div
                                            animate={{ y: [0, 10, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-400"
                                        >
                                            <span className="text-sm uppercase tracking-widest font-medium">Scroll</span>
                                            <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-400 to-transparent" />
                                        </motion.div>
                                    )}
                                </motion.div>
                            </div>
                        </section>
                    )
                })}
            </div>

            {/* Vertical Navigation / Indicators */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-6 items-end">
                {allSlides.map((slide, index) => (
                    <button
                        key={slide.id}
                        onClick={() => scrollToSection(index)}
                        className={`group flex items-center gap-4 text-right transition-all duration-300 ${activeIndex === index ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-100'
                            }`}
                    >
                        <span className={`text-xs uppercase tracking-[0.2em] font-bold hidden md:block transition-all duration-300 ${activeIndex === index ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'
                            }`}>
                            {slide.year}
                        </span>
                        <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${activeIndex === index ? 'bg-white border-white scale-125' : 'bg-transparent border-zinc-500'
                            }`} />
                    </button>
                ))}
            </div>
        </div>
    )
}
