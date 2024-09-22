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

import infoDataCongress from '@/utils/json/infoConiap.json'

import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

import { getConferenceStatus } from '@/utils/functions'

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

  // const { isBeforeSummary } = getConferenceStatus(infoDataCongress.data.dates)
  const  isBeforeSummary  = true

  return (
    <main className="w-full">
      <section className="container section  py-10 sm:py-20 w-full grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
        <div className="col-span-2 flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl">
            PARTICIPA DE ESTE <b>CONGRESO, </b> ¡QUÉ ESPERAS!
          </h1>
          <section className="flex flex-col gap-3">
            <p className="sm:text-lg">
              <b>Ten en cuenta </b> lo siguiente para participar en el congreso:
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
      <section className="bg-gradient-to-r from-primary-900/90 to-primary-600/90  relative">
        <div className="container sm:flex sm:items-center sm:gap-6 text-white py-6 sm:py-10 lg:py-14">
          <div className="w.full h-full sm:min-w-[300px] lg:min-w-[420px]">
            <Image
              src="/logo_coniap.webp"
              alt="logo"
              width={400}
              height={200}
            />
          </div>
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 sm:m-4 lg:m-6">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Descarga el formato de resumen
              </h1>
              <h3 className="text-tiny sm:text-sm lg:text-base">
                Si participas o deseas participar como ponente, ten en cuenta
                que debes enviar tu resumen en el formato establecido.
                !Descárgalo aquí!
              </h3>
            </div>
            <Button
              radius="full"
              size="lg"
              as={Link}
              href={infoData?.format_summary || ''}
              variant="bordered"
              className="text-white"
            >
              Descargar formato
            </Button>
          </div>
        </div>
        <Image
          src="https://siepsi.com.co/wp-content/uploads/2021/11/ponencia.jpeg"
          alt="inscriptions"
          removeWrapper
          radius="none"
          className="absolute top-0 left-0 w-full h-full object-cover object-center -z-10"
        />
      </section>
      {isBeforeSummary && (
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
      )}
    </main>
  )
}
