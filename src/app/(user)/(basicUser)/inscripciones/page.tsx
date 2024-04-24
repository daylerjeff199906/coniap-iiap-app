'use client'

import { FrmContactUs, FrmInscriptions } from '@/components'
import img_logo from '@/assets/svg/ISOTIPO - CONIAP.svg'
import { Image } from '@nextui-org/react'

export default function Page() {
  return (
    <>
      <main className="w-full">
        <section className="section py-10 sm:py-20 w-full grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
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
        <FrmContactUs />
      </main>
    </>
  )
}
