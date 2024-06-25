/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Button } from '@nextui-org/react'
import { CardSpeaker } from '@/components'
import Link from 'next/link'

import { motion } from 'framer-motion'

import { IPerson } from '@/types'
interface IProps {
  persons: IPerson[] | undefined
}

export const SpeakersSection = (props: IProps) => {
  const { persons: speakersActive } = props

  return (
    <>
      <section className="section">
        <div className="w-full bg-warning-50/60 section-home">
          <div className="container space-y-6 flex flex-wrap">
            <motion.header
              className="w-full z-10 "
              initial={{ opacity: 0, x: -15 }}
              viewport={{
                once: false,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.4, // Animation duration
                },
              }}
            >
              <div className="flex items-center gap-3 pb-3">
                <div className="dot-custom" />
                <p className="text-xs font-semibold uppercase">#Ponentes - 2024</p>
              </div>
              <div className="w-full max-w-xl">
                <h2 className="text-3xl sm:text-[40px] pb-6 leading-tight">
                  Nuestros invitados,
                  <b>Magistrales</b> que provocan el <b>cambio</b>
                </h2>
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
                {speakersActive.slice(0, 8).map((speaker, index) => (
                  <motion.div
                    key={speaker.id}
                    className="w-full"
                    initial={{ opacity: 0, x: 15 }}
                    viewport={{
                      once: false,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.1 + index / 10,
                      },
                    }}
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
