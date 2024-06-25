'use client'
import { Card, CardBody, Image as ImageUI } from '@nextui-org/react'
import { motion } from 'framer-motion'

import {
  IconFlag,
  IconDirections,
  IconCompass,
  IconStar,
} from '@tabler/icons-react'

import imgAboutUs from '@/assets/images/about-us.webp'

const indicator = [
  {
    title: 'Propósito',
    description:
      'Facilitar el intercambio de conocimientos y experiencias entre investigadores y gestores de desarrollo para promover el desarrollo socioeconómico sostenible en la Amazonia peruana',
    icon: (
      <IconFlag
        size={56}
        stroke={1}
      />
    ),
  },
  {
    title: 'Misión',
    description:
      'Impulsar la colaboración multidisciplinaria y el diálogo entre sectores público, privado y académico para abordar los desafíos de conservación y desarrollo en la región amazónica.  ',
    icon: (
      <IconDirections
        size={56}
        stroke={1}
      />
    ),
  },
  {
    title: 'Visión',
    description:
      'Ser un espacio de referencia para la difusión de conocimientos y la generación de consensos sobre temas de desarrollo sostenible en la Amazonia peruana.',
    icon: (
      <IconCompass
        size={56}
        stroke={1}
      />
    ),
  },
  {
    title: 'Valores',
    description:
      'Promovemos la colaboración, la innovación y la sostenibilidad como pilares fundamentales para el desarrollo integral y equitativo de la Amazonia peruana.',
    icon: (
      <IconStar
        size={56}
        stroke={1}
      />
    ),
  },
]

export const AboutUsSection = () => {
  return (
    <article className="section section-home w-full">
      <main className="grid grid-cols-1 gap-3 lg:grid-cols-2 container">
        <section className="pb-4 sm:p-10 flex flex-col justify-center items-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            viewport={{ once: false }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.3,
              },
            }}
          >
            <ImageUI
              src={imgAboutUs.src}
              alt="CONIAP 2024"
              radius="lg"
              removeWrapper
              className="w-full h-full max-h-[720px] object-cover rounded-xl"
            />
          </motion.div>
        </section>
        <section className="sm:p-2 flex flex-wrap z-20">
          <motion.div
            className="flex items-center gap-3 pb-3"
            initial={{ opacity: 0, x: 10 }}
            viewport={{
              once: false,
            }}
            whileInView={{
              opacity: 1,
              x: 0, // Slide in to its original position
              transition: {
                duration: 0.5, // Animation duration
              },
            }}
          >
            <div className="dot-custom" />
            <p className="text-xs font-semibold">#CONIAP - 2024</p>
          </motion.div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, x: 15 }}
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
            <h2 className="text-3xl sm:text-[40px] pb-6 leading-tight">
              Por un Futuro Verde: <b> CONIAP</b> y la transformación de la{' '}
              <b>Amazonía</b>
            </h2>
            <h3 className="text-lg">
              Fomentando un diálogo multidisciplinario para el avance sostenible
              globalmente.
            </h3>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 "
            initial={{ opacity: 0 }}
            viewport={{
              once: false,
            }}
            whileInView={{
              opacity: 1,
              transition: {
                duration: 0.2, // Animation duration
              },
            }}
          >
            {indicator.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{
                  opacity: 1,
                  x: 0, // Slide in to its original position
                  transition: {
                    duration: index / 10, // Animation duration
                  },
                }}
              >
                <Card
                  className="space-y-3 lg:p-5 rounded-xl text-center border-none"
                  shadow="none"
                >
                  <CardBody className="space-y-3">
                    <div className="w-full text-gray-400">{item.icon}</div>
                    {/* <h1 className="text-xl font-bold">{item.title}</h1> */}
                    <p className="text-xs lg:text-sm">{item.description}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
    </article>
  )
}
