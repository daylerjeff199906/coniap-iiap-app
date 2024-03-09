'use client'
import { Card, CardBody, CardFooter, Divider, Image } from '@nextui-org/react'
import { ISpeaker } from '@/types'

interface IProps {
  speaker: ISpeaker
}

export const CardSpeaker = (props: IProps) => {
  const { speaker } = props
  const urlImgeDefault =
    'https://img.freepik.com/foto-gratis/apuesto-hombre-negocios-maduro-traje-negro-mostrando-pulgar-arriba-hombre-negocios-mediana-edad-sonriendo-mirando-camara-aislada-sobre-fondo-amarillo-concepto-negocio_549566-937.jpg?t=st=1709857822~exp=1709861422~hmac=a61fd698c394cd2418867b0184a62c67a1c626ce06479b952ae52e155b57b4c4&w=740'
  return (
    <Card
      shadow="sm"
      radius="none"
      isPressable
      isHoverable
      isBlurred
      className="w-full"
    >
      <Image
        src={speaker.image !== '' ? speaker.image : urlImgeDefault}
        alt="image"
        radius="lg"
        className="h-64 w-full object-cover rounded-none"
        removeWrapper
        isBlurred
      />
      <CardBody className="bg-white p-4">
        <div className="text-center flex flex-col items-center space-y-2">
          <h3 className="font-bold text-lg sm:text-xl line-clamp-1">
            {speaker.fullName + ' ' + speaker.surName}
          </h3>
          <Divider className="bg-orange-500 pt-1 rounded-full w-14 " />
          <p className="text-tiny sm:text-sm text-gray-400 line-clamp-1">
            {speaker.institution}
          </p>
        </div>
      </CardBody>
    </Card>
  )
}