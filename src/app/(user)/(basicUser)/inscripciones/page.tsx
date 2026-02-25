'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
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

  const { isBeforeSummary, isBeforeConference } = getConferenceStatus(
    infoDataCongress.data.dates
  )

  return (
    <main className="w-full">
      <section className="container section py-10 sm:py-20 w-full grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
        <div className="col-span-2 flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl uppercase font-extrabold tracking-tight">
            Participa de este <span className="text-primary italic">Congreso,</span> ¡Qué esperas!
          </h1>
          <section className="flex flex-col gap-3">
            <p className="sm:text-lg">
              <b>Ten en cuenta</b> lo siguiente para participar en el congreso:
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
                  className="text-primary font-bold hover:underline"
                >
                  Inicia sesión
                </Link>{' '}
                y envía tu propuesta.
              </li>
              <li>
                Si ya estás registrado,{' '}
                <Link
                  href="/login"
                  className="text-primary font-bold hover:underline"
                >
                  Inicia sesión
                </Link>{' '}
                y envía tu propuesta.
              </li>
            </ul>
            {isBeforeConference && (
              <div className="pt-4">
                <Button
                  variant="outline"
                  className="font-bold px-8 gap-2 rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                  onClick={activeDriver}
                >
                  <IconPlayerPlayFilled size={18} />
                  Ver demo
                </Button>
              </div>
            )}
          </section>
          {isBeforeConference && (
            <div className="mt-8 flex justify-center lg:justify-start">
              <Image
                src={img_logo.src}
                alt="logo"
                width={200}
                height={200}
                className="w-1/3 lg:w-1/2 opacity-20 grayscale"
              />
            </div>
          )}
        </div>
        <div className="lg:col-span-3 flex flex-col gap-2">
          <div className="p-6 bg-card border rounded-2xl shadow-xl">
            <FrmInscriptions />
          </div>
          {!isBeforeConference && (
            <div className="flex justify-center items-center h-64 order-1 sm:order-2 opacity-10">
              <Image
                src={img_logo.src}
                alt="logo"
                width={300}
                height={300}
                className="h-64 object-contain"
              />
            </div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary-900/90 z-10" />
        <Image
          src="https://siepsi.com.co/wp-content/uploads/2021/11/ponencia.jpeg"
          alt="background"
          fill
          className="object-cover object-center"
        />

        <div className="container relative z-20 sm:flex sm:items-center sm:gap-12 text-white py-12 sm:py-20 lg:py-28">
          <div className="sm:min-w-[300px] lg:min-w-[420px] flex justify-center">
            <Image
              src="/logo_coniap.webp"
              alt="CONIAP Logo"
              width={400}
              height={200}
              className="drop-shadow-2xl"
            />
          </div>
          <div className="space-y-6 sm:m-4 lg:m-6 max-w-2xl">
            <div className="space-y-3 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Descarga el formato de resumen
              </h1>
              <p className="text-base sm:text-lg text-primary-50/80 font-medium">
                Si participas o deseas participar como ponente, ten en cuenta
                que debes enviar tu resumen en el formato establecido.
                ¡Descárgalo ahora!
              </p>
            </div>
            <div className="flex justify-center sm:justify-start">
              <Button size="lg" asChild variant="secondary" className="font-bold px-10 shadow-lg hover:scale-105 transition-transform">
                <Link href={infoData?.format_summary || ''}>Descargar formato</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {isBeforeSummary && (
        <article className="bg-muted/30 border-y py-20">
          <section className="container w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6 order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black uppercase tracking-tighter">
                Participa como <span className="text-primary italic">Ponente</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Envía tu propuesta y comparte tus conocimientos con la comunidad científica. El proceso es rápido y sencillo.
              </p>
              <div className="flex items-center gap-3">
                <Button size="lg" className="rounded-full font-bold px-10 shadow-md" asChild variant="default">
                  <Link href="/login">Enviar resumen</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all" />
                <Image
                  src={imgSpeakerInscription.src}
                  alt="speaker"
                  width={500}
                  height={600}
                  className="relative rounded-2xl shadow-2xl max-h-[500px] object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        </article>
      )}
    </main>
  )
}
