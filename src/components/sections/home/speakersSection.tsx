'use client'
import { Card, CardBody, Divider, Image } from '@nextui-org/react'
import { IconChevronRight } from '@tabler/icons-react'
import { CardSpeaker } from '@/components'
import { ISpeaker } from '@/types'
import { motion } from 'framer-motion'
import Link from 'next/link'

const speakers: ISpeaker[] = [
  {
    id: 1,
    fullName: 'John',
    surName: 'Doe',
    job: 'CEO',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    fullName: 'Jane',
    surName: 'Doe',
    job: 'CTO',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    fullName: 'John',
    surName: 'Doe',
    job: 'CEO',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    fullName: 'Jane',
    surName: 'Doe',
    job: 'CTO',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 5,
    fullName: 'Jane',
    surName: 'Doe',
    job: 'CTO',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 6,
    fullName: 'Jane',
    surName: 'Doe',
    job: 'CTO',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 7,
    fullName: 'Jane',
    surName: 'Doe',
    job: 'CTO',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 8,
    fullName: 'Jane',
    surName: 'Doe',
    job: 'CTO',
    image: 'https://via.placeholder.com/150',
  },
]

export const SpeakersSection = () => {
  return (
    <>
      <section className="bg-warning-50 section-home">
        <div className="container space-y-6">
          <motion.div
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
              <h2 className="title-section-home">Ponentes</h2>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {speakers.slice(0, 7).map((speaker, index) => (
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
            <motion.div
              className="w-full h-full"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <Card
                shadow="none"
                radius="none"
                className="bg-black/20 w-full h-64 lg:h-full animate-pulse"
                isPressable
                as={Link}
                href="/ponentes"
              >
                <Image
                  src="https://img.freepik.com/foto-gratis/retrato-ejecutivos-negocios-que-participan-reunion-negocios-centro-conferencias_107420-63840.jpg?t=st=1709967212~exp=1709970812~hmac=6ed7b7a4c575f77dc8dde7f92f80064e2fe0403c3cab0d972016bdf54df34b4b&w=996"
                  alt="Ponentes"
                  removeWrapper
                  className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                />
                <CardBody className="p-0">
                  <div className="flex flex-col items-center justify-center h-full z-10 bg-black/50">
                    <div className="bg-black/70 rounded-full flex flex-col items-center p-4 animate-pulse">
                      <IconChevronRight
                        size={42}
                        stroke={1.5}
                        className="text-white"
                      />
                    </div>
                    <h3 className="text-center text-lg font-semibold mt-4 text-gray-200">
                      Ver todos los ponentes
                    </h3>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
