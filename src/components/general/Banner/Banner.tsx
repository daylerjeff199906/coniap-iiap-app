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
    includePathname: '/about',
    title: 'CONIAP',
    subtitle: 'Acerca del congreso',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    urlImage: '',
  },
  {
    id: 2,
    includePathname: '/agenda',
    title: 'Titulo principal',
    subtitle: 'Subtitulo',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    urlImage: '',
  },
  {
    id: 3,
    includePathname: '/ponentes',
    title: 'Expositores',
    subtitle: 'Conectando a las personas',
    description:
      'Somos una comunidad de expertos en diferentes áreas de conocimiento y esperamos que puedas aprender de ellos.',
    urlImage:
      'https://firebasestorage.googleapis.com/v0/b/species-iiap-bb45a.appspot.com/o/coniap-iiap%2FiiapFoto.webp?alt=media&token=ebd2a474-f961-48e6-9b4d-06c530dda0c2',
  },
]

function findIncludePathname(pathname: string, includePathname: string) {
  return pathname.includes(includePathname)
}

export const Banner = () => {
  const pathname = usePathname()

  const banner: IBanner | undefined = bannerData.find((banner) =>
    pathname.startsWith(banner.includePathname)
  )

  if (!banner) {
    // Si no se encuentra un banner correspondiente, puedes retornar un componente por defecto o null
    return null
  }

  return (
    <>
      <section className="w-full h-80 lg:h-[26rem] bg-black/60 relative">
        <div className="container text-white flex items-center gap-2 lg:gap-4 h-full">
          <div className="flex items-center  gap-2 pb-28">
            <div className="w-7 sm:w-10 lg:w-16 border border-white" />
            <div className="rounded-full border-2 h-4 w-4 flex items-center justify-center ">
              <div className="rounded-full bg-white h-2 w-2"></div>
            </div>
          </div>
          <div>
            <h1 className="text-6xl font-bold pb-5 text-warning-400">
              {banner.title}
            </h1>
            <h2 className="text-5xl font-bold">{banner.subtitle}</h2>
            <p className="max-w-lg pt-2">{banner.description}</p>
          </div>
        </div>
        <Image
          alt={banner.title}
          src={banner.urlImage}
          removeWrapper
          radius="none"
          className="absolute top-0 -z-20 object-cover left-0 right-0 w-full h-full"
        />
      </section>
      <section className="py-4 bg-danger-400"></section>
    </>
  )
}
