'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const data = [
  {
    id: 1,
    type: 'COMITÉ ORGANIZADOR',
    persons: [
      'Carmen García (Coordinador del Evento)',
      'Nallarett Dávila',
      'Ricardo Zárate',
      'German Murrieta',
      'Kember Mejía',
      'Américo Sanchez',
      'Juan Jose Bellido (Secretaría Técnica del evento)',
    ],
  },
  {
    id: 2,
    type: 'COMITÉ CIENTÍFICO',
    persons: [
      'Carmen García',
      'German Murrieta',
      'Nallarett Dávila',
      'Dennis del Castillo',
      'Pablo Puertas',
      'Kember Mejia',
      'Pedro Pérez',
      'Manuel Martin',
      'Mariana Montoya',
      'Ricardo Zárate',
      'José Álvarez',
      'Pedro Mayor',
      'Giuseppe Gagliardi',
      'Jorge Abad',
      'Johanna Garay',
      'Lizardo Fachin',
    ],
  },
  {
    id: 3,
    type: 'COMITÉ DE INFORMÁTICA Y DIFUSIÓN',
    persons: [
      '  Américo Sánchez (Coordinador de Informática)',
      'Jhon Martinez (Desarrollador)',
      'Rodolfo Cárdenas',
      'Jacker Ruiz',
      'Salvador Tello',
      'Francisco Gallo',
    ],
  },
]

export const OrganizationSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // La animación solo se activará una vez
    threshold: 0.3, // Porcentaje de visibilidad del elemento en el viewport para activar la animación
  })
  return (
    <>
      <section
        className=""
        ref={ref}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
          <div>
            <motion.div
              className="flex items-center gap-3 pb-3"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}} // Animación cuando el elemento está en el viewport
              transition={{ duration: 0.5 }}
            >
              <div className="dot-custom" />
              <p className="text-xs font-semibold">COMITÉ - CONIAP</p>
            </motion.div>
            <motion.h2
              className="text-3xl sm:text-[40px] pb-6 leading-tight"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}} // Animación cuando el elemento está en el viewport
              transition={{ duration: 0.5 }}
            >
              Comité: la <b>columna</b> vertebral del <b>CONIAP</b>
            </motion.h2>
          </div>
          <div></div>
        </div>
      </section>
    </>
  )
}
