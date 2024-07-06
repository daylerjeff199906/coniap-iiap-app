'use client'
import { Image } from '@nextui-org/react'
import { usePathname } from 'next/navigation'

interface IBanner {
  id: number
  includePathname: string
  title: string
  subtitle: string
  description: string
  urlImage: string
}

const bannerData = [
  {
    id: 1,
    includePathname: '/sobre-coniap',
    title: 'CONIAP',
    subtitle: 'Acerca del congreso',
    description:
      'Descubre todo sobre el CONIAP, propósito y discusiones clave sobre la conservación sostenible en la amazonía',
    urlImage:
      'https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/banners%2Fave-america-sur-habitat-natural-scaled.webp?alt=media&token=9406c9f0-2c73-4b4a-8e5f-f13e9562239d',
  },
  {
    id: 2,
    includePathname: '/agenda',
    title: 'Agenda',
    subtitle: 'Conoce las actividades',
    description: 'Descubre las actividades que tenemos preparadas para ti.',
    urlImage:
      'https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/banners%2Fauditorio.webp?alt=media&token=2cd62ce6-816a-4af4-974d-e0962d449911',
  },
  {
    id: 3,
    includePathname: '/ponentes',
    title: 'Expositores',
    subtitle: 'Conectando a las personas',
    description:
      'Presentamos a los ponentes y ponentes magistrales que estarán presentes en el congreso.',
    urlImage:
      'https://firebasestorage.googleapis.com/v0/b/species-iiap-bb45a.appspot.com/o/coniap-iiap%2FiiapFoto.webp?alt=media&token=ebd2a474-f961-48e6-9b4d-06c530dda0c2',
  },
  {
    id: 4,
    includePathname: '/inscripciones',
    title: 'Inscripciones',
    subtitle: 'Participa en el congreso',
    description:
      'Inscríbete en el congreso y participa en las actividades que tenemos preparadas para ti.',
    urlImage:
      'https://firebasestorage.googleapis.com/v0/b/species-iiap-bb45a.appspot.com/o/coniap-iiap%2FiiapFoto.webp?alt=media&token=ebd2a474-f961-48e6-9b4d-06c530dda0c2',
  },
  {
    id: 5,
    includePathname: '/contactános',
    title: 'Contactános',
    subtitle: 'Estamos para ayudarte',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    urlImage:
      'https://firebasestorage.googleapis.com/v0/b/species-iiap-bb45a.appspot.com/o/coniap-iiap%2FiiapFoto.webp?alt=media&token=ebd2a474-f961-48e6-9b4d-06c530dda0c2',
  },
]

export const Banner = () => {
  const pathname = usePathname()

  const banner: IBanner | undefined = bannerData.find((banner) =>
    pathname.startsWith(banner.includePathname)
  )

  if (!banner) {
    return null
  }

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
              {banner.title}
            </h1>
            <h2 className="text-[2.1rem] sm:text-5xl font-bold leading-tight sm:leading-normal">
              {banner.subtitle}
            </h2>
            <p className="max-w-lg pt-1 sm:pt-2">{banner.description}</p>
          </div>
        </div>
        <Image
          alt={banner.title}
          src={banner.urlImage}
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
