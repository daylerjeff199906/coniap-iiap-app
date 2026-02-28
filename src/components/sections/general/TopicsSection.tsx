'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ITopic, ITopicsSectionContent } from '@/types'
import { useLocale } from 'next-intl'
import {
    Handshake,
    MessageSquareText,
    TrendingUp,
    ShieldCheck,
    CircleDot,
    Briefcase
} from 'lucide-react'

const getIcon = (iconName?: string) => {
    const iconsMap: Record<string, React.ReactNode> = {
        'handshake': <Handshake className="w-12 h-12" />,
        'message': <MessageSquareText className="w-12 h-12" />,
        'growth': <TrendingUp className="w-12 h-12" />,
        'compliance': <ShieldCheck className="w-12 h-12" />,
        'partnership': <Handshake className="w-12 h-12" />,
        'communication': <MessageSquareText className="w-12 h-12" />,
        'training': <TrendingUp className="w-12 h-12" />,
        'legal': <ShieldCheck className="w-12 h-12" />,
    }

    if (!iconName) return <Briefcase className="w-12 h-12" />
    return iconsMap[iconName.toLowerCase()] || <Briefcase className="w-12 h-12" />
}

interface IProps {
    topics: ITopic[] | undefined
    content: ITopicsSectionContent
}

export const TopicsSection = ({ topics, content }: IProps) => {
    const locale = useLocale() as 'es' | 'en'
    const sectionContent = content?.[locale] || content?.['es']

    if (!sectionContent || !topics) return null

    return (
        <section id="topics-section" className="py-32 bg-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-50/50 -z-10 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative">
                <div className="flex flex-col gap-20">
                    {/* Left Side: Text Content */}
                    <div className="flex flex-col justify-center">
                        <motion.header
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-[2px] bg-primary rounded-full shadow-lg shadow-primary/20" />
                                <p className="text-sm font-black uppercase tracking-[0.4em] text-primary">
                                    {sectionContent.hashtag}
                                </p>
                            </div>

                            <h2 className="text-5xl md:text-7xl text-zinc-950 leading-[0.85] uppercase tracking-tighter mb-10">
                                {sectionContent.title}
                            </h2>

                            <div className="relative">
                                <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed font-medium mb-4 border-l-4 border-amber-200 pl-8 max-w-4xl">
                                    {sectionContent.description}
                                </p>
                            </div>
                        </motion.header>
                    </div>

                    {/* Right Side: Topics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                        {topics.filter(t => t.isActived).map((topic, index) => (
                            <TopicGridCard key={topic.id} topic={topic} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

const TopicGridCard = ({ topic, index }: { topic: ITopic, index: number }) => {
    const [isHovered, setIsHovered] = useState(false)

    // Highlight the first card to match the visual style with color variants
    const isSpecial = index === 0

    return (
        <motion.div
            className={`
                relative p-12 min-h-[360px] flex flex-col items-center justify-center text-center 
                transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden
                ${isSpecial
                    ? 'bg-primary text-white shadow-2xl shadow-primary/30 rounded-tr-[80px] rounded-bl-[80px]'
                    : 'bg-zinc-50/80 text-zinc-900 border border-zinc-100 hover:shadow-xl hover:bg-white rounded-[40px] shadow-sm'
                }
            `}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`mb-8 p-6 rounded-full transition-transform duration-500 scale-100 group-hover:scale-110 ${isSpecial ? 'bg-white/10' : 'bg-transparent'}`}>
                {topic.icon ? getIcon(topic.icon) : <CircleDot className="w-12 h-12" />}
            </div>

            <motion.div
                className="relative z-10 w-full"
                animate={{
                    opacity: isHovered && topic.description ? 0 : 1,
                    y: isHovered && topic.description ? -20 : 0
                }}
                transition={{ duration: 0.4 }}
            >
                <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 italic`}>
                    {topic.name}
                </h3>
            </motion.div>

            <AnimatePresence>
                {isHovered && topic.description && (
                    <motion.div
                        className="absolute inset-x-8 inset-y-12 flex items-center justify-center p-6 bg-transparent pointer-events-none"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <p className={`text-lg md:text-xl font-bold italic leading-[1.3] text-balance ${isSpecial ? 'text-white/95' : 'text-zinc-700'}`}>
                            {topic.description}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Subtle number indicator */}
            <div className={`absolute bottom-6 right-8 text-4xl font-black opacity-10 pointer-events-none select-none ${isSpecial ? 'text-white' : 'text-zinc-950'}`}>
                0{index + 1}
            </div>
        </motion.div>
    )
}
