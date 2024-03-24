/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { Button, Card, CardBody, Divider, Image } from '@nextui-org/react'
import { IconChevronRight } from '@tabler/icons-react'
import { CardSpeaker } from '@/components'
import { ISpeaker } from '@/types'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { useSpeaker } from '@/hooks/client'

export const SpeakersSection = () => {
  const { speakersActive, loading, getSpekersActive } = useSpeaker()

  useEffect(() => {
    getSpekersActive()
  }, [])

  console.log(speakersActive)

  return (
    <>
      <section className="section ">
        <div className="w-full bg-warning-50/60 section-home">
          <div className="container space-y-6 flex flex-wrap">
            {/* <motion.div
            className="flex"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mr-4">
              <Divider
                orientation="vertical"
                className=" bg-orange-500 h-full w-1 rounded-full"
              />
            </div>
            <div className="">
              <h4 className="subtitle-section-home">Invitados especiales</h4>
              <h2 className="title-section-home">Conferencistas</h2>
            </div>
          </motion.div> */}
            <header>
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
              >
                Ver más
              </Button>
            </header>

            {speakersActive && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
                {speakersActive.slice(0, 7).map((speaker, index) => (
                  <motion.div
                    key={speaker.id}
                    className="w-full"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}

                    // animate={{ x: 100 }}
                    // transition={{ delay: 1 }}
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
