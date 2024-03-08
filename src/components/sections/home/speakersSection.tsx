'use client'
import { Divider } from '@nextui-org/react'
import { CardSpeaker } from '@/components'
import { ISpeaker } from '@/types'
import { motion } from 'framer-motion'

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
                // animate={{ x: 100 }}
                // transition={{ delay: 1 }}
              >
                <CardSpeaker speaker={speaker} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
