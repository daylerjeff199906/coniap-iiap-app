'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

export const MoreEventsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false, // La animación solo se activará una vez
    threshold: 0.3, // Porcentaje de visibilidad del elemento en el viewport para activar la animación
  })
  return (
    <>
      <section className="w-full bg-gray-200 section-home">
        <div
          className="container"
          ref={ref}
        >
          <header>
            <motion.div
              className="flex items-center gap-3 pb-3"
              initial={{ opacity: 0, x: -100 }}
              animate={inView ? { opacity: 1, x: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="dot-custom" />
              <p className="text-xs font-semibold">ponentes - 2024</p>
            </motion.div>
            <motion.div
              className="w-full"
              initial={{ opacity: 0, x: -100 }}
              animate={inView ? { opacity: 1, x: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl sm:text-[40px] pb-6 leading-tight">
                Nuestras conferencias <b> Magistrales</b> del congreso
              </h2>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:flex items-center gap-6 sm:justify-between"
              initial={{ opacity: 0, x: 100 }}
              animate={inView ? { opacity: 1, x: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg w-full max-w-4xl">
                Descubra las ponencias del congreso creadas conjuntamente con los
                principales especialistas tanto nacionales como internacionales que tuvieron lugar en
                el congreso.
              </h3>
              <Button
                radius="full"
                size="lg"
                variant="solid"
                color="primary"
                className="text-white"
                as={Link}
                href="/ponentes"
              >
                Ver toda la programación
              </Button>
            </motion.div>
          </header>
        </div>
      </section>
    </>
  )
}
