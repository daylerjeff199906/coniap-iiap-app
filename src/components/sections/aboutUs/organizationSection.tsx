'use client'
import { Accordion, AccordionItem, Image } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { IconPlus } from '@tabler/icons-react'
import svgAddorm from '@/assets/svg/patron-fino.svg'

const data = [
  {
    id: '1',
    type: 'COMITÉ ORGANIZADOR',
    persons: [
      'Ricardo Zárate',
      'Carmen García',
      'Tony Vizcarra',
      'Manuel Martín',
      'Christian Fernández',
      'Kember Mejía',
      'Pedro Pérez',
      'Américo Sanchez',
      'Dennis del Castillo',
      'Werner Chota',
      'Ronald Corvera',
      'Margarita del Aguila',
      'Giussepe Gagliardi (Coordinador del Evento)',
      'Juan Bellido (Secretaría Técnica del evento)',
    ],
  },
  {
    id: '2',
    type: 'COMITÉ CIENTÍFICO',
    persons: [
      'Carmen García',
      'Christian Fernández',
      'Werner Chota',
      'Tony Vizcarra',
      'Dennis del Castillo',
      'Kember Mejía',
      'Pedro Pérez',
      'Manuel Martín',
      'Margarita del Aguila',
      'Guillain Estivals',
      'Ricardo Zárate',
      'Giuseppe Gagliardi',
      'Lizardo Fachin',
      'Nicolas Hubert',
      'Rosa Ortiz',
      'Mirbel Epiquien',
      'Farah Carrasco',
      'Alicia Bartra',
      'Roger Ruiz',
      'Luz M. Almanza',
      'Sandra Ríos',
      'Ana Rosa Sáenz',
      'Andrea Tello',
      'Cristina López',
      'Vanessa Rodríguez',
      'Hugo Dueñas',
    ],
  },
  {
    id: '3',
    type: 'COMITÉ DE INFORMÁTICA Y DIFUSIÓN',
    persons: [
      '  Américo Sánchez (Coordinador de Informática)',
      'Jhon Martinez (Desarrollador)',
      'Jacker Ruiz',
      'Salvador Tello',
      'Francisco Gallo',
    ],
  },
]

export const OrganizationSection = () => {
  return (
    <>
      <section className="py-10 sm:py-20">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
          <div>
            <motion.div
              className="flex items-center gap-3 pb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, animation: 1 }}
              transition={{
                duration: 1,
              }}
            >
              <div className="dot-custom" />
              <p className="text-xs font-semibold">COMITÉ - CONIAP</p>
            </motion.div>
            <motion.h2
              className="text-3xl sm:text-[40px] pb-6 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, animation: 1 }}
              transition={{
                duration: 1,
              }}
            >
              Comité: la <b>columna</b> vertebral del <b>CONIAP</b>
            </motion.h2>
            <Image
              src={svgAddorm.src}
              alt="Patrón fino"
              removeWrapper
              className="w-full max-w-lg"
            />
          </div>
          <div className="sm:p-4 lg:p-6">
            <Accordion
              isCompact
              defaultExpandedKeys={['1']}
            >
              {data?.map((item) => (
                <AccordionItem
                  key={item.id}
                  title={item.type}
                  classNames={{
                    title: 'font-semibold underline text-primary-500',
                  }}
                  indicator={
                    <IconPlus
                      size={20}
                      className="text-primary-500"
                    />
                  }
                >
                  <ul className="list-disc">
                    {item.persons.map((person, index) => (
                      <li key={index}>{person}</li>
                    ))}
                  </ul>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  )
}
