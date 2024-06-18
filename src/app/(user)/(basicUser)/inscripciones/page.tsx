'use client'
import { Button, Image } from '@nextui-org/react'
import img_logo from '@/assets/svg/ISOTIPO - CONIAP.svg'
import { imgSpeakerInscription } from '@/assets'
import Link from 'next/link'
import { FrmInscriptions, FrmContactUs } from '@/modules/user'

export default function Page() {
  return (
    <>
      <main className="w-full">
        <section className="container section py-10 sm:py-20 w-full grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          <div className=" col-span-2">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl">
              PARTICIPA DE ESTE <b>CONGRESO, </b> ¡QUÉ ESPERAS!
            </h1>
            <p className="text-sm sm:text-base lg:text-lg">
              <b>¡Inscríbete ya!</b> Llena el formulario para participar de las
              presentaciones del congreso CONIAP - 2024.
            </p>
            <Image
              src={img_logo.src}
              alt="logo"
              removeWrapper
              className="w-1/3 lg:w-10/12"
            />
          </div>
          <div className="lg:col-span-3">
            <FrmInscriptions />
          </div>
        </section>
        <article className="bg-gray-100">
          <section className="container pt-10 sm:pt-20 w-full grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
            <div className="lg:col-span-3 flex flex-col gap-3">
              <div className=" col-span-2">
                <h1 className="text-2xl sm:text-3xl lg:text-5xl">
                  PARTICIPA DE ESTE <b>CONGRESO, COMO PONENTE</b> ¡QUÉ ESPERAS!
                </h1>
                <p className="text-sm sm:text-base lg:text-lg">
                  <b>¡Inscríbete ya!</b> Si deseas participar como ponente y
                  presentar tu trabajo de investigación a todo el mundo,
                  envíanos tu propuesta.
                </p>
              </div>
              <div>
                <Button
                  size="lg"
                  radius="full"
                  as={Link}
                  href="/singIn"
                  color="danger"
                >
                  Enviar propuesta
                </Button>
              </div>
            </div>
            <div className=" col-span-2">
              <Image
                src={imgSpeakerInscription.src}
                alt="speaker"
                removeWrapper
                className="max-h-80 lg:max-h-[480px]"
              />
            </div>
          </section>
        </article>
        <FrmContactUs />
      </main>
    </>
  )
}
