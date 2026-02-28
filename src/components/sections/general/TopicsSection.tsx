'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ITopic, ITopicsSectionContent } from '@/types'
import { useLocale } from 'next-intl'
import { CircleDot } from 'lucide-react'

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

                            <h2 className="text-5xl md:text-7xl text-zinc-950 font-bold leading-[0.85] uppercase tracking-tighter mb-10">
                                {sectionContent.title}
                            </h2>

                            <div className="relative">
                                <p className="text-xl text-zinc-600 leading-relaxed font-medium mb-4 border-l-4 border-amber-200 pl-8 max-w-4xl">
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

    // Minimalist style variations: Uniform initially, custom on hover
    const hoverColor = topic.color && topic.color !== '' ? topic.color : 'var(--primary)'

    return (
        <motion.div
            className={`
                relative p-10 min-h-[340px] flex flex-col items-center justify-center text-center 
                transition-all duration-500 ease-in-out overflow-hidden border border-transparent
                cursor-default
                ${isHovered
                    ? 'text-white shadow-2xl rounded-tr-[80px] rounded-bl-[80px]'
                    : 'bg-[#f4f7e6] text-[#0a252e] rounded-2xl shadow-sm'
                }
            `}
            style={isHovered ? { backgroundColor: hoverColor } : {}}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence mode="wait">
                {!isHovered ? (
                    <motion.div
                        key="initial"
                        className="flex flex-col items-center"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="w-24 h-24 relative flex items-center justify-center">
                            <div className="text-[#0a252e]">
                                {topic.icon ?
                                    <div
                                        className="w-12 h-12 [&>svg]:w-full [&>svg]:h-full"
                                        dangerouslySetInnerHTML={{ __html: topic.icon }}
                                    />
                                    : <CircleDot className="w-12 h-12" />}
                            </div>
                        </div>

                        <h3 className="text-xl font-medium tracking-tight">
                            {topic.name}
                        </h3>
                    </motion.div>
                ) : (
                    <motion.div
                        key="hover"
                        className="absolute inset-0 flex items-center justify-center p-8 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="font-medium leading-relaxed text-balance text-white">
                            {topic.description || topic.name}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Subtle number indicator - Minimalist */}
            <div className={`absolute bottom-6 right-8 text-2xl font-light opacity-10 pointer-events-none select-none ${isHovered ? 'text-white' : 'text-[#0a252e]'}`}>
                {String(index + 1).padStart(2, '0')}
            </div>
        </motion.div>
    )
}
