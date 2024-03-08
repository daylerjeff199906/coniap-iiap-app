'use client'
import { Card, CardBody, Divider } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { IconFlag, IconDirections, IconCompass } from '@tabler/icons-react'

const indicator = [
  {
    title: 'Propósito',
    description:
      'Facilitar el intercambio de conocimientos y experiencias entre investigadores y gestores de desarrollo para promover el desarrollo socioeconómico sostenible en la Amazonia peruana',
    icon: <IconFlag size={30} />,
  },
  {
    title: 'Misión',
    description:
      'Impulsar la colaboración multidisciplinaria y el diálogo entre sectores público, privado y académico para abordar los desafíos de conservación y desarrollo en la región amazónica.  ',
    icon: <IconDirections size={30} />,
  },
  {
    title: 'Visión',
    description:
      'Ser un espacio de referencia para la difusión de conocimientos y la generación de consensos sobre temas de desarrollo sostenible en la Amazonia peruana.',
    icon: <IconCompass size={30} />,
  },
]

export const AboutUsSection = () => {
  return (
    <section className=" bg-white">
      <div className="container section-home ">
        <div className="space-y-8">
          <motion.div
            className="flex"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mr-4">
              <Divider
                orientation="vertical"
                className=" bg-orange-500 h-full w-1 rounded-full"
              />
            </div>
            <div className="">
              <h4 className="text-gray-500">CONIAP</h4>
              <h2 className="title-section-home">Acerca del congreso</h2>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {indicator.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center space-y-4"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  className="space-y-3 p-3 lg:p-4 rounded-xl text-center"
                  shadow="sm"
                >
                  <CardBody className="flex flex-col items-center space-y-3">
                    <div className="flex flex-col items-center w-full text-gray-500">
                      {item.icon}
                    </div>
                    <h1 className="text-xl font-bold text-center">
                      {item.title}
                    </h1>
                    <p className="text-xs lg:text-sm text-center">{item.description}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
