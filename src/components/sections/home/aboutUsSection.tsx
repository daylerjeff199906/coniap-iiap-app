'use client'
import { Card, CardBody, Divider, Image } from '@nextui-org/react'
import { motion, Variants } from 'framer-motion'

import {
  IconFlag,
  IconDirections,
  IconCompass,
  IconStar,
} from '@tabler/icons-react'

import imgAboutUs from '@/assets/images/img_about.webp'

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
    <article className="section section-home">
      <main className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 container">
        <section className="pb-4 sm:p-10 flex flex-col justify-center items-center h-full">
          <Image
            src={imgAboutUs.src}
            alt="CONIAP 2024"
            radius="lg"
            removeWrapper
            className="w-full h-full max-h-[720px] object-cover rounded-xl"
          />
        </section>
        <section className="p-5 sm:p-10 flex flex-wrap">
          <div className="flex items-center gap-3 pb-3">
            <div className="dot-custom" />
            <p className="text-xs font-semibold">#CONIAP - 2024</p>
          </div>

          <div className="">
            <motion.h2
              className="text-3xl sm:text-[40px] pb-6 leading-tight"
              initial="offScreen"
              whileInView="onScreen"
              viewport={{ once: true, amount: 0.3 }}
            >
              Por un Futuro Verde:
              <b>CONIAP</b> y la transformación de la <b>Amazonía</b>
            </motion.h2>
            <h3 className="text-lg">
              Fomentando un Diálogo Multidisciplinario para el Avance Sostenible
              Globalmente.
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 ">
            {indicator.map((item, index) => (
              <Card
                key={index}
                className="space-y-3 lg:p-5 rounded-xl text-center border-none"
                shadow="none"
              >
                <CardBody className="space-y-3">
                  <div className="w-full text-gray-400">{item.icon}</div>
                  {/* <h1 className="text-xl font-bold">{item.title}</h1> */}
                  <p className="text-xs lg:text-sm">{item.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </article>
  )
}
