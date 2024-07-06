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
import dataInfo from '@/utils/json/infoConiap.json'
import { formatConferenceDate } from '@/utils/functions'
import countries from '@/utils/json/countries.json'

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

const icons = {
  facebook: <IconBrandFacebook size={24} />,
  instagram: <IconBrandInstagram size={24} />,
  youtube: <IconBrandYoutube size={24} />,
  linkedin: <IconBrandLinkedin size={24} />,
}

const socialMedia = [
  {
    title: 'Facebook',
    url: 'https://www.facebook.com/CONIAP2024',
    icon: icons.facebook,
  },
  {
    title: 'Instagram',
    url: 'https://www.instagram.com/coniap2024/',
    icon: icons.instagram,
  },
  {
    title: 'Youtube',
    url: 'https://www.youtube.com/channel/UCz2fX4Qd9QZVvXz6NvL0h6A',
    icon: icons.youtube,
  },
  {
    title: 'Linkedin',
    url: 'https://www.linkedin.com/company/coniap2024',
    icon: icons.linkedin,
  },
]

export const Footer = () => {
  const rangeDate = dataInfo.data.dates['date-conference']

  //getStar Day
  const dateRange = formatConferenceDate(rangeDate)

  const year = rangeDate.start.split('-')[0]

  const modality = dataInfo.data.modalidad

  return (
    <>
      <footer className="border-t-1 bg-gray-200">
        <section className="py-4 sm:pt-8 lg:pt-16">
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
                <div className="lg:col-span-2">
                  <h1 className="text-5xl font-bold">CONIAP</h1>
                  <p className="font-bold uppercase">
                    {dataInfo.data.title.es}
                  </p>
                </div>
                <div>
                  <p>{dateRange}</p>
                  <p className="font-bold">{modality}</p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg">#CONIAP{year}</h3>
                  <div className="flex gap-6">
                    {socialMedia.map((item, index) => (
                      <Link
                        aria-label={item.title}
                        key={index}
                        href={item.url}
                        target="_blank"
                      >
                        {item.icon}
                      </Link>
                    ))}
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
            © {new Date().getFullYear()} Todos los derechos reservados |{' '}
            {dataInfo.data.title.es}
          </p>
        </section>
      </footer>
    </>
  )
}
