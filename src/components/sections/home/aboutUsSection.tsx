'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchInformation } from '@/api/fetchInformation'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import imgAboutUs from '@/assets/images/about-us.webp'

interface InformationItem {
  id: number
  key: string
  title: string
  subtitle?: string
  content: string
  image_url?: string
}

export const AboutUsSection = () => {
  const [data, setData] = useState<InformationItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchInformation()
        if (result) {
          setData(result as InformationItem[])
        }
      } catch (error) {
        console.error('Error fetching about info:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const intro = data.find(item => item.key === 'intro')
  const tabs = data.filter(item => ['mission', 'vision', 'leadership'].includes(item.key))

  if (loading) {
    return <div className="h-[600px] flex items-center justify-center text-zinc-500">Cargando información...</div>
  }

  return (
    <section id="about" className="relative py-24 bg-white overflow-hidden">
      {/* Background Large Text */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none overflow-hidden opacity-[0.03]">
        <h1 className="text-[25rem] font-bold leading-none tracking-tighter text-zinc-900 translate-x-[-10%] translate-y-[-20%]">
          ABOUT
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
              {intro?.title || 'SOBRE NOSOTROS'}
            </h2>
            <p className="text-lg font-medium text-primary mb-6 italic">
              {intro?.subtitle || 'A Legacy of Culture'}
            </p>
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
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <p className="text-zinc-600 text-lg leading-relaxed text-balance">
              {intro?.content || 'The Apollo is an American cultural treasure. It is a vibrant non-profit organization rooted in the Harlem community that engages people from around New York, the nation, and the world.'}
            </p>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="mission" className="w-full">
          <TabsList className="flex w-full justify-between items-center border-b border-zinc-200 bg-transparent h-auto p-0 mb-12 rounded-none">
            {['mission', 'vision', 'leadership'].map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                className="flex-1 py-6 text-xl md:text-2xl font-bold uppercase tracking-tight text-zinc-400 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent rounded-none transition-all"
              >
                {key === 'mission' ? 'Misión' : key === 'vision' ? 'Visión' : 'Liderazgo'}
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            {['mission', 'vision', 'leadership'].map((key) => {
              const item = tabs.find(t => t.key === key)
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
                        src={item?.image_url || 'https://images.unsplash.com/photo-1542601906990-b4d3fb75bb44?q=80&w=2070'}
                        alt={item?.title || key}
                        className="object-cover"
                      />
                    </div>
                    <div className="order-1 md:order-2">
                      <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed italic">
                        {item?.content || 'Building a new American canon centered on contributions to the performing arts by artists of the African diaspora.'}
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
