import { Divider } from '@nextui-org/react'
import isoTipo from '@/assets/svg/ISOTIPO - CONIAP.svg'
import Image from 'next/image'
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandLinkedin,
} from '@tabler/icons-react'
import Link from 'next/link'

const mapSite = [
  {
    title: 'Inicio',
    url: '/',
  },
  {
    title: 'Agenda',
    url: '/agenda',
  },
  {
    title: 'Ponentes',
    url: '/ponentes',
  },
  {
    title: 'Inscripciones',
    url: '/inscripciones',
  },
  {
    title: 'Contacto',
    url: '/contacto',
  },
]

export const Footer = () => {
  return (
    <>
      <footer className="">
        {/* <section>
          <div className="space-y-4">
            <Image
              src="/logo_coniap.webp"
              alt="logo"
              width={160}
              height={100}
            />
            <p className="text-white text-tiny">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              euismod bibendum laoreet.
            </p>
          </div>
        </section> */}
        {/* <section className="grid grid-cols-4 gap-6 "></section> */}
        <section className="py-4 bg-white">
          <div className="grid grid-cols-1 gap-3 container">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Image
                  src={isoTipo}
                  alt="logo"
                  width={160}
                  height={100}
                  className="mx-auto"
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className='lg:col-span-2'>
                  <h1 className="text-5xl font-bold">CONIAP</h1>
                  <p className="font-bold uppercase">
                    Congreso Internacional sobre la Amazonía Peruana
                  </p>
                </div>
                <div>
                  <p>13 - 14 - 15 de noviembre de 2024</p>
                  <p className="font-bold text-zinc-400">Virtual</p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg">#CONIAP2024</h3>
                  <div className="flex gap-6">
                    <Link
                      href="https://www.facebook.com/CONIAP2024"
                      target="_blank"
                    >
                      <IconBrandFacebook size={24} />
                    </Link>
                    <Link
                      href="https://www.instagram.com/coniap2024/"
                      target="_blank"
                    >
                      <IconBrandInstagram size={24} />
                    </Link>
                    <Link
                      href="https://www.youtube.com/channel/UCz2fX4Qd9QZVvXz6NvL0h6A"
                      target="_blank"
                    >
                      <IconBrandYoutube size={24} />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/company/coniap2024"
                      target="_blank"
                    >
                      <IconBrandLinkedin size={24} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Divider />
            <div>
              {
                <ul className="space-y-2 sm:space-y-0 sm:flex sm:gap-4 sm:items-center sm:justify-center">
                  {mapSite.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.url}
                        className="text-sm text-gray-400"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              }
            </div>
          </div>
        </section>
        <section className="bg-slate-900 py-2 space-y-3">
          <Divider className="bg-white" />
          <p className="text-white text-tiny text-center">
            © {new Date().getFullYear()} All rights reserved. | Congreso
            Inernacional de la Amazónia Peruana
          </p>
        </section>
      </footer>
    </>
  )
}
