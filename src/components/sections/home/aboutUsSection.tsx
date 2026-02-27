'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchSectionByType } from '@/api/cms'
import { IDynamicSection, IAboutWithTabsContent } from '@/types/CMS'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import imgAboutUs from '@/assets/images/about-us.webp'

export const AboutUsSection = ({ pageSlug = 'about', hiddenAction = false }: { pageSlug?: string, hiddenAction?: boolean }) => {
  const [section, setSection] = useState<IDynamicSection<IAboutWithTabsContent> | null>(null)
  const [loading, setLoading] = useState(true)
  const t = useTranslations('HomePage.aboutSection')
  const locale = useLocale() as 'es' | 'en'

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchSectionByType(pageSlug, 'about_with_tabs')
        if (result) {
          setSection(result as IDynamicSection<IAboutWithTabsContent>)
        }
      } catch (error) {
        console.error('Error fetching about info:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [pageSlug])

  if (loading) {
    return <div className="h-[600px] flex items-center justify-center text-zinc-500">Cargando información...</div>
  }

  const content = section?.content?.[locale] || section?.content?.['es']
  const intro = content?.intro
  const tabs = content?.tabs

  return (
    <section id="about-us" className="relative py-24 bg-white overflow-hidden">
      {/* Background Large Text */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none overflow-hidden opacity-[0.03]">
        <h1 className="text-[25rem] font-bold leading-none tracking-tighter text-zinc-900 translate-x-[-10%] translate-y-[-20%]">
          {t('title')}
        </h1>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl md:text-8xl font-black text-zinc-900 leading-[0.8] mb-8 uppercase tracking-tighter">
              {t('title')}
            </h2>
            <p className="text-lg font-medium text-primary mb-10 italic">
              {intro?.subtitle || 'A Legacy of Culture'}
            </p>

            {
              !hiddenAction && (
                <Link href="/about">
                  <Button size="lg" className="rounded-full px-8 py-7 text-lg group bg-secondary hover:bg-primary transition-all duration-500">
                    {t('viewMore')}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              )
            }
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src={intro?.image_url || imgAboutUs.src}
                alt="About Us"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <p className="text-zinc-600 text-lg leading-relaxed text-balance">
              {intro?.content || 'Información sobre nosotros...'}
            </p>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="mission" className="w-full">
          <TabsList className="flex w-full justify-between items-center border-b border-zinc-200 bg-transparent h-auto p-0 mb-12 rounded-none">
            {['mission', 'vision', 'leadership'].map((key) => {
              const tabLabel = t(key as any)
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex-1 py-6 text-xl md:text-2xl font-bold uppercase tracking-tight text-zinc-400 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent rounded-none transition-all"
                >
                  {tabLabel}
                </TabsTrigger>
              )
            })}
          </TabsList>

          <AnimatePresence mode="wait">
            {['mission', 'vision', 'leadership'].map((key) => {
              const tabData = tabs?.[key as keyof typeof tabs]
              return (
                <TabsContent key={key} value={key} className="mt-0 focus-visible:outline-none">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg order-2 md:order-1">
                      <img
                        src={tabData?.image_url || 'https://images.unsplash.com/photo-1542601906990-b4d3fb75bb44?q=80&w=2070'}
                        alt={key}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="order-1 md:order-2">
                      <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed italic">
                        {tabData?.content || 'Contenido del tab...'}
                      </p>
                    </div>
                  </motion.div>
                </TabsContent>
              )
            })}
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  )
}
