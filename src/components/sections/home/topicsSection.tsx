/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { Card } from '@nextui-org/react'
import { IconPlant } from '@tabler/icons-react'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import { useTopics } from '@/hooks/client'

export const TopicsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false, // La animación solo se activará una vez
    threshold: 0.3, // Porcentaje de visibilidad del elemento en el viewport para activar la animación
  })

  const { topics, getTopics } = useTopics()

  useEffect(() => {
    getTopics()
  }, [])

  return (
    <section className=" bg-black/70">
      <div
        className="container section-home space-y-2"
        ref={ref}
      >
        <motion.header
          initial={{ opacity: 0, x: -100 }}
          animate={inView ? { opacity: 1, x: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 pb-3">
            <div className="dot-custom" />
            <p className="text-xs font-semibold text-white">#CONIAP- 2024</p>
          </div>
          <div className="w-full max-w-4xl">
            <h2 className="text-3xl sm:text-[40px] pb-6 leading-tight text-white">
              Líneas <b>temáticas</b>
            </h2>
            {/* <h3 className="text-lg">
                Fomentando un Diálogo Multidisciplinario para el Avance
                Sostenible Globalmente.
              </h3> */}
          </div>
        </motion.header>
        <div className="grid grid-cols-1 sm:grid-cols-3  py-4">
          {topics &&
            topics?.map((topic, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <CardTopics
                  title={topic.name}
                  icon={topic.image}
                />
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  )
}

const CardTopics = ({ title, icon }: { title: string; icon: string }) => {
  return (
    <Card
      className={`bg-transparent text-white p-6 text-center flex flex-col justify-center items-center gap-2 animate-appearance-in `}
      radius="none"
      shadow="none"
    >
      <div className="flex justify-center items-center  rounded-full p-4">
        <IconPlant
          size={42}
          stroke={1}
        />
      </div>
      <h3 className="font-bold">{title}</h3>
    </Card>
  )
}
