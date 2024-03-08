'use client'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { ISpeaker } from '@/types'

interface IProps {
  speaker: ISpeaker
}

export const CardSpeaker = (props: IProps) => {
  const { speaker } = props
  return (
    <>
      <Card
        shadow="sm"
        radius="lg"
        isPressable
        isHoverable
        isBlurred
      >
        <Image
          src="https://img.freepik.com/foto-gratis/apuesto-hombre-negocios-maduro-traje-negro-mostrando-pulgar-arriba-hombre-negocios-mediana-edad-sonriendo-mirando-camara-aislada-sobre-fondo-amarillo-concepto-negocio_549566-937.jpg?t=st=1709857822~exp=1709861422~hmac=a61fd698c394cd2418867b0184a62c67a1c626ce06479b952ae52e155b57b4c4&w=740"
          alt="image"
          radius="lg"
          className="h-64 w-full object-cover rounded-b-none"
          removeWrapper
          isBlurred
        />
        <CardBody className="bg-white p-4">
          <div className="text-center">
            <h3 className="font-bold text-lg sm:text-xl">{speaker.fullName}</h3>
            <p className="text-tiny sm:text-sm text-gray-400">{speaker.job}</p>
          </div>
        </CardBody>
      </Card>
    </>
  )
}
