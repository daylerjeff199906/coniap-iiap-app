'use client'
// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import NextImage from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
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
      <Link href={`/speakers/${speaker?.id}`}>
        <Card className="w-full bg-transparent border-none shadow-none overflow-hidden cursor-pointer">
          <div className="relative aspect-[4/4] w-full overflow-hidden rounded-xl">
            <img
              src={speaker?.image !== '' ? speaker?.image : urlImgeDefault}
              alt={speaker.name}
              className="object-cover w-full h-full"
            />
          </div>
          <CardContent className="bg-transparent px-0 pt-4">
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-lg sm:text-xl line-clamp-1">
                  {speaker.name + ' ' + speaker.surName}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-6 min-w-8 min-h-6 overflow-hidden border rounded-sm">
                  {country?.flag && (
                    <img
                      src={country.flag}
                      alt={country.country}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <div>
                  <p className="text-xs sm:text-sm line-clamp-2 text-muted-foreground">
                    {speaker.institution}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
