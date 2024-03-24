'use client'
import { motion } from 'framer-motion'
import { Divider } from '@nextui-org/react'

export const InfoAboutUs = () => {
  return (
    <>
      <section>
        <motion.header
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center flex flex-col items-center">
            <h4 className="subtitle-section-home">CONIAP</h4>
            <h2 className="title-section-home">Nuestro propósito</h2>
            <Divider className="bg-orange-500 pt-1 rounded-full mt-4 w-36 " />
          </div>
        </motion.header>
        <main className="p-4">
          <section>
            <div></div>
            <div>
              <p>
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
