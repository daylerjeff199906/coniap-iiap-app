'use client'
import { Image } from '@nextui-org/react'
// import { usePathname } from 'next/navigation'

interface IBanner {
  title: string
  subtitle: string
  description?: string
  urlImage: string
}

export const BannerStatic = (props: IBanner) => {
  const { description, title, urlImage, subtitle } = props

  return (
    <>
      <section className="w-full h-80 lg:h-[26rem] bg-black/60 relative">
        <div className="container text-white flex items-center gap-2 lg:gap-4 h-full">
          <div className="flex items-center gap-1 sm:gap-2 pb-36 sm:pb-28">
            <div className="w-3 sm:w-10 lg:w-16 border border-white" />
            <div className="rounded-full border-2 h-4 w-4 flex items-center justify-center ">
              <div className="rounded-full bg-white h-2 w-2"></div>
            </div>
          </div>
          <div>
            <h1 className="text-[2.6rem] sm:text-6xl font-bold pb-1 sm:pb-5 text-warning-400">
              {title}
            </h1>
            <h2 className="text-[2.1rem] sm:text-5xl font-bold leading-tight sm:leading-normal text-white">
              {subtitle}
            </h2>
            <p className="max-w-lg pt-1 sm:pt-2">{description}</p>
          </div>
        </div>
        <Image
          alt={title}
          src={
            urlImage ||
            'https://img.freepik.com/foto-gratis/trabajador-oficina-que-usa-videoconferencia-reunirse-gente-negocios-camara-web-hablando-colegas-videoconferencia-remota-tener-conversacion-internet-llamada-teleconferencia_482257-50395.jpg?t=st=1711815457~exp=1711819057~hmac=296ed2236e230cc88b8cc57763f778841f26786771322a146f0f4f75712b632f&w=1380'
          }
          removeWrapper
          isBlurred
          radius="none"
          className="absolute top-0 -z-20 object-cover left-0 right-0 w-full h-full"
        />
      </section>
      <section className="py-3 bg-danger-400"></section>
    </>
  )
}
