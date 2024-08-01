'use client'
import { useEffect, useState } from 'react'
import { Button, Image } from '@nextui-org/react'
import img_logo from '@/assets/svg/ISOTIPO - CONIAP.svg'
import { imgSpeakerInscription } from '@/assets'
import { FrmInscriptions } from '@/modules/user'
import { fetchInformationById } from '@/api'
import { IGeneralData } from '@/types'
import { stepsInscription } from '@/utils/data'
import Link from 'next/link'
import { IconPlayerPlayFilled } from '@tabler/icons-react'

import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

export default function Page() {
  const [infoData, setInfoData] = useState<IGeneralData | null>(null)

  const fetchInfo = async () => {
    const res = await fetchInformationById(1)
    if (res) setInfoData(res)
  }
  useEffect(() => {
    fetchInfo()
  }, [])

  const driverObj = driver({
    showProgress: true,
    steps: stepsInscription,
    popoverClass: 'driver-popover',
    nextBtnText: 'Siguiente',
    prevBtnText: 'Anterior',
    doneBtnText: 'Finalizar',
  })

  function activeDriver() {
    driverObj.drive()
  }

  return (
    <>
      <main className="w-full">
        <section className="container section py-10 sm:py-20 w-full grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          <div className="col-span-2 flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl">
              PARTICIPA DE ESTE <b>CONGRESO, </b> ¡QUÉ ESPERAS!
            </h1>
            <section className="flex flex-col gap-3">
              <p className="sm:text-lg">
                <b>Ten en cuenta </b> lo siguiente para participar en el
                congreso:
              </p>
              <ul className="text-sm list-disc flex flex-col gap-2 px-3">
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
              <div>
                <Button
                  radius="full"
                  color="warning"
                  className="font-medium px-6"
                  startContent={<IconPlayerPlayFilled size={20} />}
                  variant="bordered"
                  onPress={activeDriver}
                >
                  Ver demo
                </Button>
              </div>
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
            <div className="lg:col-span-3 flex flex-col gap-4">
              <div className=" col-span-2 flex flex-col gap-3">
                <h1 className="text-2xl sm:text-3xl lg:text-5xl">
                  PARTICIPA DE ESTE <b>CONGRESO, COMO PONENTE</b> ¡QUÉ ESPERAS!
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  size="lg"
                  radius="full"
                  as={Link}
                  href="/login"
                  color="danger"
                  id="login-link"
                >
                  Enviar resúmen
                </Button>
                <Button
                  size="lg"
                  radius="full"
                  variant="light"
                  download={true}
                  as={Link}
                  href={infoData?.format_summary || ''}
                  id="download-format"
                >
                  Descargar formato
                </Button>
              </div>
            </div>
            <div className=" col-span-2">
              <Image
                src={imgSpeakerInscription.src}
                alt="speaker"
                removeWrapper
                className="max-h-80 lg:max-h-[480px]"
                loading="lazy"
              />
            </div>
          </section>
        </article>
      </main>
    </>
  )
}
