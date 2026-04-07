'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

export function Hero() {
    const t = useTranslations('HomePage')

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-zinc-950">
            {/* Cinematic Background Video */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-105"
                >
                    <source src="https://pub-9387880748914fbb97055b584ecff0a0.r2.dev/videp_banner_coniap.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Hero Content */}
            <div className="relative z-20 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h1 className="text-7xl md:text-9xl  text-white leading-[0.85] tracking-tighter uppercase whitespace-pre-line">
                        {t('title')} <br />
                        <span className="text-[#17C964] font-bold ">
                            {t('subtitle')}
                        </span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1.2 }}
                    className="mt-12 text-lg md:text-xl text-white/60 font-medium tracking-widest uppercase italic"
                >
                    {t('description')}
                </motion.p>
            </div>

            {/* Interactive Showreel Indicator */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", delay: 1.2, duration: 0.8 }}
                className="absolute bottom-16 right-16 hidden lg:block"
            >
                <div className="relative w-48 h-48 flex items-center justify-center group cursor-pointer">
                    {/* Pulsing ring */}
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-40 group-hover:bg-primary/40 transition-all duration-500" />

                    <div className="z-10 bg-white text-zinc-950 p-6 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.2)] group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <Play fill="currentColor" size={28} className="translate-x-0.5" />
                    </div>

                    {/* Rotating Circular Text */}
                    <svg className="absolute w-full h-full animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
                        <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="transparent" />
                        <text className="text-[7.5px] uppercase font-black tracking-[0.3em] fill-white/40 group-hover:fill-white/80 transition-colors duration-500">
                            <textPath xlinkHref="#circlePath">
                                PLAY SHOWREEL • PLAY SHOWREEL • PLAY SHOWREEL •
                            </textPath>
                        </text>
                    </svg>
                </div>
            </motion.div>

            {/* Bottom Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent z-10" />
        </section>
    )
}
