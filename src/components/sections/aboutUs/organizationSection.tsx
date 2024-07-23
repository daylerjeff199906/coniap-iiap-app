'use client'
import { Image } from '@nextui-org/react'
import { motion } from 'framer-motion'
import svgAddorm from '@/assets/svg/patron-fino.svg'
import { IPersonComite } from '@/types'

interface IProps {
  comiteOrganizador: IPersonComite[]
  comiteCientifico: IPersonComite[]
  comiteInformatica: IPersonComite[]
}

export const OrganizationSection = (props: IProps) => {
  const { comiteOrganizador, comiteCientifico, comiteInformatica } = props

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
            <div>
              <h3 className="text-lg font-semibold pb-3">Comité Organizador</h3>
              <ul className="list-disc list-inside">
                {comiteOrganizador?.map((person) => (
                  <li key={person.order}>{person.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold pb-3">Comité Científico</h3>
              <ul className="list-disc list-inside">
                {comiteCientifico?.map((person) => (
                  <li key={person.order}>{person.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold pb-3">
                Comité de Informática
              </h3>
              <ul className="list-disc list-inside">
                {comiteInformatica?.map((person) => (
                  <li key={person.order}>{person.name}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </section>
    </>
  )
}
