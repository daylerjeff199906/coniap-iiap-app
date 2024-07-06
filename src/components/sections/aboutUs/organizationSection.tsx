'use client'
import { Image } from '@nextui-org/react'
import { motion } from 'framer-motion'
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
        <div className="grid grid-cols-1 gap-3 sm:gap-5">
          <header>
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
          </header>
          <section className="sm:p-4 lg:p-6 grid grid-cols-1 sm:grid-cols-3">
            {data.map((item) => (
              <div
                key={item.id}
                className="mb-5"
              >
                <h3 className="text-lg font-semibold pb-3">{item.type}</h3>
                {item.persons.length > 15 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-500">
                    {/* Dividir la lista en dos columnas */}
                    <ul className="list-disc pl-6">
                      {item.persons
                        .slice(0, Math.ceil(item.persons.length / 2))
                        .map((person) => (
                          <li
                            key={person}
                            className="text-sm sm:text-base"
                          >
                            {person}
                          </li>
                        ))}
                    </ul>
                    <ul className="list-disc pl-6">
                      {item.persons
                        .slice(Math.ceil(item.persons.length / 2))
                        .map((person) => (
                          <li
                            key={person}
                            className="text-sm sm:text-base"
                          >
                            {person}
                          </li>
                        ))}
                    </ul>
                  </div>
                ) : (
                  <ul className="list-disc pl-6 text-gray-500">
                    {/* Si hay 15 o menos elementos, mostrar en una sola columna */}
                    {item.persons.map((person) => (
                      <li
                        key={person}
                        className="text-sm sm:text-base"
                      >
                        {person}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        </div>
      </section>
    </>
  )
}
