'use client'
import Image from 'next/image'
import { Button, Image as UiImage } from '@nextui-org/react'
import Link from 'next/link'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export const InscriptionsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false, // La animación solo se activará una vez
    threshold: 0.3, // Porcentaje de visibilidad del elemento en el viewport para activar la animación
  })
  return (
    <>
      <section className="">
        <div className="bg-gradient-to-r from-primary-900/90 to-primary-600/90 section-home relative">
          <div
            className="container sm:flex sm:items-center sm:gap-6 text-white  py-10 sm:py-12 lg:py-14"
            ref={ref}
          >
            <motion.div
              className="w.full h-ful"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}} // Animación cuando el elemento está en el viewport
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/logo_coniap.webp"
                alt="logo"
                width={400}
                height={200}
              />
            </motion.div>
            <motion.div
              className="space-y-4 sm:space-y-6 lg:space-y-8 sm:m-4 lg:m-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}} // Animación cuando el elemento está en el viewport
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  ¡ Sé parte de este gran congreso sobre la Amazonía peruana!
                </h1>
                <h3 className="text-tiny sm:text-sm lg:text-base">
                  Inscríbete como asistente para disfrutar de todas las
                  actividades y conferencias o como expositor para compartir tus
                  conocimientos con la comunidad.
                </h3>
              </div>
              <Button
                radius="full"
                size="lg"
                color="danger"
                as={Link}
                href="/inscripciones"
              >
                Inscríbete ahora
              </Button>
            </motion.div>
          </div>
          <UiImage
            src="https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/banners%2Fauditorio.webp?alt=media&token=2cd62ce6-816a-4af4-974d-e0962d449911"
            alt="inscriptions"
            removeWrapper
            radius="none"
            className="absolute top-0 left-0 w-full h-full object-cover object-center -z-10"
          />
        </div>
      </section>
    </>
  )
}
