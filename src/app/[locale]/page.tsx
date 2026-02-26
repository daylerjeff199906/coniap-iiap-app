'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

export default function HomePage() {
    const t = useTranslations('HomePage')

    return (
        <main className="relative min-h-screen bg-black overflow-hidden">
            {/* Hero Section with Video Background */}
            <section className="relative h-screen w-full flex flex-col items-center justify-center text-center px-4">
                {/* Background Video (Mocked or Default) */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-lush-green-jungle-4009-large.mp4" type="video/mp4" />
                    </video>
                </div>

                {/* Hero Content */}
                <div className="relative z-20 max-w-5xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-9xl font-black text-white leading-none tracking-tighter"
                    >
                        {t('title')} <br />
                        <span className="text-blue-600 drop-shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                            {t('subtitle')}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-8 text-xl md:text-2xl text-white/70 font-medium tracking-tight"
                    >
                        {t('description')}
                    </motion.p>
                </div>

                {/* Floating "Play Showreel" Circle */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.8 }}
                    className="absolute bottom-20 left-20 hidden lg:block"
                >
                    <div className="relative w-40 h-40 flex items-center justify-center group cursor-pointer">
                        <div className="absolute inset-0 bg-white rounded-full animate-pulse opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="z-10 bg-white text-black p-4 rounded-full shadow-2xl group-hover:scale-110 transition-transform">
                            <Play fill="currentColor" size={24} />
                        </div>
                        {/* Rotating Text Around */}
                        <svg className="absolute w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                            <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                            <text className="text-[8px] uppercase font-bold tracking-[0.2em] fill-white">
                                <textPath xlinkHref="#circlePath">
                                    Play Showreel • Play Showreel • Play Showreel •
                                </textPath>
                            </text>
                        </svg>
                    </div>
                </motion.div>
            </section>

            {/* Other sections could go here */}
        </main>
    )
}
