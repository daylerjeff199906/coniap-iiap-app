/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { Button } from '@nextui-org/react'
// import { IconChevronRight } from '@tabler/icons-react'
import { CardSpeaker } from '@/components'
import Link from 'next/link'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import { IPerson } from '@/types'

interface IProps {
  persons: IPerson[] | undefined
}

export const SpeakersSection = (props: IProps) => {
  const { persons: speakersActive } = props

  const [ref, inView] = useInView({
    triggerOnce: false, // La animación solo se activará una vez
    threshold: 0.3, // Porcentaje de visibilidad del elemento en el viewport para activar la animación
  })

  return (
    <>
      <section className="section ">
        <div className="w-full bg-warning-50/60 section-home">
          <div
            className="container space-y-6 flex flex-wrap"
            ref={ref}
          >
            <motion.header
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 pb-3">
                <div className="dot-custom" />
                <p className="text-xs font-semibold">ponentes - 2024</p>
              </div>
              <div className="w-full max-w-xl">
                <h2 className="text-3xl sm:text-[40px] pb-6 leading-tight">
                  Nuestros invitados,
                  <b>Magistrales</b> que provocan el <b>cambio</b>
                </h2>
                {/* <h3 className="text-lg">
                Fomentando un Diálogo Multidisciplinario para el Avance
                Sostenible Globalmente.
              </h3> */}
              </div>
              <Button
                radius="full"
                size="lg"
                variant="solid"
                color="primary"
                className="text-white"
                as={Link}
                href="/ponentes"
              >
                Ver más
              </Button>
            </motion.header>

            {speakersActive && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
                {speakersActive.slice(0, 7).map((speaker, index) => (
                  <motion.div
                    key={speaker.id}
                    className="w-full"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <CardSpeaker speaker={speaker} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
