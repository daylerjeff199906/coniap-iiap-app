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
    id: '2',
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
    id: '3',
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
  return (
    <>
      <section className="py-10 sm:py-20">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
          <div>
            <motion.div
              className="flex items-center gap-3 pb-3"
              initial={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="dot-custom" />
              <p className="text-xs font-semibold">COMITÉ - CONIAP</p>
            </motion.div>
            <motion.h2
              className="text-3xl sm:text-[40px] pb-6 leading-tight"
              initial={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
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
