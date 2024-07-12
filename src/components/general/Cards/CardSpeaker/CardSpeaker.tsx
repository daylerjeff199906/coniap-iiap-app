'use client'
import { Avatar, Card, CardBody, Image } from '@nextui-org/react'
import { IPerson } from '@/types'
import Link from 'next/link'
import { motion } from 'framer-motion'
import dataCountry from '@/utils/json/countries.json'

interface IProps {
  speaker: IPerson
}

function getCountryByname(name: string) {
  const country = dataCountry.find((country) => country.country === name)
  return country
}

export const CardSpeaker = (props: IProps) => {
  const { speaker } = props
  const urlImgeDefault =
    'https://img.freepik.com/foto-gratis/apuesto-hombre-negocios-maduro-traje-negro-mostrando-pulgar-arriba-hombre-negocios-mediana-edad-sonriendo-mirando-camara-aislada-sobre-fondo-amarillo-concepto-negocio_549566-937.jpg?t=st=1709857822~exp=1709861422~hmac=a61fd698c394cd2418867b0184a62c67a1c626ce06479b952ae52e155b57b4c4&w=740'

  const country = getCountryByname(speaker?.location || '')

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
      }}
    >
      <Card
        shadow="none"
        radius="none"
        isPressable
        isBlurred
        className="w-full bg-transparent"
        as={Link}
        href={`/ponentes/${speaker?.id}`}
      >
        <Image
          src={speaker?.image !== '' ? speaker?.image : urlImgeDefault}
          alt="image"
          radius="lg"
          className="h-64 w-full object-cover"
          removeWrapper
          isBlurred
        />
        <CardBody className="bg-transparent px-0">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-lg sm:text-xl line-clamp-1">
                {speaker.name + ' ' + speaker.surName}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <Avatar
                  src={country?.flag || ''}
                  className="w-7 h-5 rounded-sm"
                />
              </div>
              <div>
                <p className="text-tiny sm:text-sm ">
                  {speaker.institution}
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )
}
