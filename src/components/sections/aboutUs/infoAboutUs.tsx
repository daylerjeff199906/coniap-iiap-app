'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import img_logo from '@/assets/svg/IMAGOTIPO - CONIAP.svg'
import { Image } from '@nextui-org/react'

export const InfoAboutUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: false, // La animación solo se activará una vez
    threshold: 0.3, // Porcentaje de visibilidad del elemento en el viewport para activar la animación
  })
  return (
    <>
      <section
        className=""
        ref={ref}
      >
        <main className="p-4 grid grid-cols-1 sm:grid-cols-2 items-center">
          <div className="">
            <Image
              src={img_logo.src}
              alt="CONIAP 2024"
              removeWrapper
              className="w-full h-full max-h-[520px] rounded-xl"
            />
          </div>
          <section>
            <motion.div
              className="flex items-center gap-3 pb-3"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}} // Animación cuando el elemento está en el viewport
              transition={{ duration: 0.5 }}
            >
              <div className="dot-custom" />
              <p className="text-xs font-semibold">#CONIAP - 2024</p>
            </motion.div>
            <motion.h2
              className="text-3xl sm:text-[40px] pb-6 leading-tight"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}} // Animación cuando el elemento está en el viewport
              transition={{ duration: 0.5 }}
            >
              Congreso <b>Internacional</b> de la <b>AMAZONÍA </b> Peruana
            </motion.h2>
            <div className="w-full">
              <p className="leading-relaxed">
                El Congreso Internacional sobre Amazonia peruana: investigación
                para el desarrollo, perspectivas y retos, que se realizará
                anualmente, se constituye en un espacio de diálogo abierto de
                investigadores nacionales y extranjeros de distintas
                disciplinas, gestores de desarrollo, sectores públicos peruanos
                y organismos no gubernamentales con el propósito de propiciar la
                difusión y el Intercambio de conocimientos y experiencias;
                favoreciendo la comunicación entre investigadores y decisores de
                política para definir lineamientos y buscar consensos en temas
                de cultura, desarrollo social y humano, uso sostenible y
                conservación de los ecosistemas y recursos, tecnologías
                alternativas y desarrollo económico, ordenamiento del territorio
                y gestión de riesgos que contribuyan al desarrollo
                socio-económico de la región amazónica peruana en el contexto de
                cambio climático y el marco de los Objetivos del Desarrollo
                Sostenible - ODS.
              </p>
            </div>
          </section>
        </main>
      </section>
    </>
  )
}
