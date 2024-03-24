'use client'
import { Card, CardBody, Divider, Image } from '@nextui-org/react'
import { motion } from 'framer-motion'
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
    // <section className=" bg-white">
    //   <motion.div
    //     className="container section-home "
    //     initial="offscreen"
    //     whileInView="onscreen"
    //     viewport={{ once: true, amount: 0.8 }}
    //   >
    //     <div className="space-y-8">
    //       <motion.div
    //         className="flex flex-col items-center"
    //         initial={{ opacity: 0, y: -100 }}
    //         animate={{ opacity: 1, y: 1 }}
    //         transition={{ duration: 0.5 }}
    //       >
    //         <div className="text-center flex flex-col items-center">
    //           <h4 className="subtitle-section-home">CONIAP</h4>
    //           <h2 className="title-section-home">Acerca del congreso</h2>
    //           <Divider className="bg-orange-500 pt-1 rounded-full mt-4 w-36 " />
    //         </div>
    //       </motion.div>
    //       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
    //         {indicator.map((item, index) => (
    //           <motion.div
    //             key={index}
    //             className="flex flex-col items-center space-y-4"
    //             initial={{ opacity: 0, y: 100 }}
    //             animate={{ opacity: 1, y: 1 }}
    //             transition={{ duration: 0.5, delay: index * 0.2 }}
    //           >
    //             <Card
    //               className="space-y-3 p-3 lg:p-4 rounded-xl text-center"
    //               shadow="sm"
    //             >
    //               <CardBody className="flex flex-col items-center space-y-3">
    //                 <div className="flex flex-col items-center w-full text-gray-500">
    //                   {item.icon}
    //                 </div>
    //                 <h1 className="text-xl font-bold text-center">
    //                   {item.title}
    //                 </h1>
    //                 <p className="text-xs lg:text-sm text-center">
    //                   {item.description}
    //                 </p>
    //               </CardBody>
    //             </Card>
    //           </motion.div>
    //         ))}
    //       </div>
    //     </div>
    //   </motion.div>
    // </section>
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
            <h2 className="text-3xl sm:text-[40px] pb-6 leading-tight">
              Por un Futuro Verde:
              <b>CONIAP</b> y la transformación de la <b>Amazonía</b>
            </h2>
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
