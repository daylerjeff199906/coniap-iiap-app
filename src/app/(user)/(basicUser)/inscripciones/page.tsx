'use client'
import { Button, Image } from '@nextui-org/react'
import img_logo from '@/assets/svg/ISOTIPO - CONIAP.svg'
import { imgSpeakerInscription } from '@/assets'
import Link from 'next/link'
import { FrmInscriptions } from '@/modules/user'

export default function Page() {
  return (
    <>
      <main className="w-full">
        <section className="container section py-10 sm:py-20 w-full grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          <div className=" col-span-2 flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl">
              PARTICIPA DE ESTE <b>CONGRESO, </b> ¡QUÉ ESPERAS!
            </h1>
            <section className="flex flex-col gap-3">
              <p className="sm:text-lg">
                <b>Ten en cuenta </b> lo siguiente para participar en el
                congreso:
              </p>
              <ul className="text-sm list-disc flex flex-col gap-2">
                <li>
                  Si deseas participar como asistente, registra tus datos
                  personales en el formulario de inscripción y <b>¡Listo!</b>
                </li>
                <li>
                  Si deseas participar como ponente, completa tus datos,
                  selecciona participar como ponente y crea una contraseña, al
                  finalizar{' '}
                  <Link
                    href="/login"
                    className="text-primary hover:underline"
                  >
                    Inicia sesión {` `}
                  </Link>{' '}
                  y envía tu propuesta.
                </li>
                <li>
                  Si ya estás registrado,{' '}
                  <Link
                    href="/login"
                    className="text-primary hover:underline"
                  >
                    Inicia sesión {` `}
                  </Link>
                  y envía tu propuesta.
                </li>
              </ul>
            </section>
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
              <div className=" col-span-2 flex flex-col gap-3">
                <h1 className="text-2xl sm:text-3xl lg:text-5xl">
                  PARTICIPA DE ESTE <b>CONGRESO, COMO PONENTE</b> ¡QUÉ ESPERAS!
                </h1>
                {/* <p className="text-sm sm:text-base lg:text-lg">
                  Si deseas
                  <b> participar como ponente </b>y ya estás registrado,
                  envíanos tu propuesta de presentación. Si aún no estás
                  registrado, inscríbete (Formulario arríba) y luego envía tu
                  propuesta, Iniciando sesión.
                </p> */}
              </div>
              <div>
                <Button
                  size="lg"
                  radius="full"
                  as={Link}
                  href="/login"
                  color="danger"
                >
                  Enviar resúmen
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
      </main>
    </>
  )
}
