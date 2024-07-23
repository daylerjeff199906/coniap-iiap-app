'use client'
import { svgIsotipoConiap } from '@/assets'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const routes = {
  '/login': {
    title: 'Iniciar Sesión',
    description: 'Inicia sesión en CONIAP',
  },
  '/register': {
    title: 'Regístrate',
    description: 'Crea tu cuenta en CONIAP',
  },
  '/forgot-password': {
    title: 'Recuperar Contraseña',
    description: 'Recupera tu contraseña en CONIAP',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const title = routes[pathname as keyof typeof routes]?.title
  const description = routes[pathname as keyof typeof routes]?.description

  return (
    <>
      <section className="w-full flex items-center justify-center h-screen relative">
        <Image
          src={'/bg-login.webp'}
          alt="Logo de CONIAP"
          width={1800}
          height={1800}
          className="absolute top-0 left-0 w-full h-full object-cover sm:object-fill"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40" />
        <div className="w-full max-w-md  px-8 py-14 h-fit sm:shadow-large rounded-lg border absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  backdrop-filter backdrop-blur-lg bg-black/15 bg-opacity-60 text-white">
          <div className="flex gap-3 items-center justify-center pb-6">
            <Image
              src={svgIsotipoConiap.src}
              alt="Logo de CONIAP"
              width={64}
              height={64}
              className="w-16"
            />
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-sm text-gray-400">{description}</p>
            </div>
          </div>
          {children}
        </div>
      </section>
    </>
  )
}
