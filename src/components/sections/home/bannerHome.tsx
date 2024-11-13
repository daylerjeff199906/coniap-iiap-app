'use client'
import { useState } from 'react'
import { Button, Image as ImageUi } from '@nextui-org/react'
import { IconCalendarEvent } from '@tabler/icons-react'
import Image from 'next/image'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { formatConferenceDate } from '@/utils/functions'
import infoData from '@/utils/json/infoConiap.json'
import { TimeSection } from './timeSection'
import { lotScrollDown } from '@/assets'
import { formatDate, getConferenceStatus } from '@/utils/functions'

import Lottie from 'lottie-react'
import {
  IconDeviceLaptop,
  IconMicroscope,
  IconUsers,
} from '@tabler/icons-react'

const URL_PROGRAM =
  'https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/events%2FPrograma%20III%20CONIAP-2024.pdf?alt=media&token=095af6f4-db50-4196-abe6-67ab17bf7bcb'

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

interface InfoItemProps {
  Icon: React.ElementType
  text: string
}

const InfoItem: React.FC<InfoItemProps> = ({ Icon, text }) => (
  <div className="flex items-center gap-2">
    <Icon
      size={24}
      stroke={1}
      color="#fff"
    />
    <h3 className="text-white text-md">{text}</h3>
  </div>
)

function scrollToElement(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

export const BannerHome = () => {
  const [videoLoaded, setVideoLoaded] = useState(false)

  const handleVideoLoaded = () => {
    setVideoLoaded(true)
  }

  //Inicio de conferencia
  const conferenceDate = formatConferenceDate(
    infoData.data.dates['date-conference']
  )

  //Estados de fechas
  const { isBeforeConference, isBeforeSummary, isAfterConference } =
    getConferenceStatus(infoData.data.dates)

  //Modalidad
  const modality = infoData.data.modalidad

  //Fecha límite de envío de resúmen
  const summary = infoData.data.dates['summary']

  // Fecha de inscripción hasta
  // const dateInscriptionTo = formatDate(
  //   infoData.data.dates['date-conference'].start,
  //   'DD/MM/YYYY'
  // )

  //Fecha resumen hasta
  const dateSummaryTo = formatDate(summary.end, 'DD/MM/YYYY')

  const isSpecificDate = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Set time to midnight to avoid time zone issues
    const specificDates = [
      new Date('2024-11-13T00:00:00'),
      new Date('2024-11-14T00:00:00'),
      new Date('2024-11-15T00:00:00'),
    ]

    return specificDates.some((date) => date.getTime() === today.getTime())
  }

  return (
    <section
      id="banner-home"
      className="h-screen flex items-center relative bg-black/60 w-full "
    >
      <div className="container grid grid-cols-1 lg:grid-cols-2 items-start gap-4">
        <motion.div
          className="w-full lg:max-w-2xl space-y-6"
          initial={{
            opacity: 0,
            x: -100,
          }}
          viewport={{
            once: false,
          }}
          whileInView={{
            opacity: 1,
            x: 0, // Slide in to its original position
            transition: {
              duration: 0.5, // Animation duration
            },
          }}
        >
          <div className="flex gap-2 items-center">
            <Image
              src="/logo_coniap.webp"
              alt="Logo CONIAP"
              width={180}
              height={190}
            />
            <div className="flex items-center gap-2 border-l ml-2 pl-4">
              <IconDeviceLaptop
                size={50}
                stroke={1}
                color="#fff"
              />
              <div>
                <h3 className="text-white max-w-8 text-tiny">Modalidad</h3>
                <h3 className="text-white font-medium text-base">{modality}</h3>
              </div>
            </div>
          </div>
          <h1 className="text-[2.3rem] lg:text-[2.8rem]  animate-appearance-in leading-tight text-white">
            Bienvenidos al III Congreso Internacional sobre{' '}
            <span className="text-green-500 font-bold">Amazonía</span> Peruana
          </h1>

          {!isAfterConference && (
            <>
              {isSpecificDate() ? (
                <div className="text-white flex flex-col gap-1">
                  <p className="text-base font-medium">Desde este </p>
                  <h1 className=" text-3xl lg:text-5xl font-bold">
                    13, 14 y 15
                  </h1>
                  <span className="text-xl font-medium">
                    de noviembre de 2024, ¡ te esperamos !
                  </span>
                </div>
              ) : (
                <section className="flex flex-col gap-2">
                  <InfoItem
                    Icon={IconCalendarEvent}
                    text={conferenceDate}
                  />
                  <InfoItem
                    Icon={IconUsers}
                    text={`Inscríbete hasta el 12/11/2024`}
                  />
                  <InfoItem
                    Icon={IconMicroscope}
                    text={`Enviar resumen hasta el ${dateSummaryTo}`}
                  />
                </section>
              )}
            </>
          )}
          <div className="w-full flex items-center gap-3">
            {isSpecificDate() && (
              <div className="flex flex-row gap-1 items-center">
                <Button
                  className="animate-appearance-in text-white bg-green-700 px-6"
                  variant="solid"
                  radius="full"
                  size="lg"
                  as={Link}
                  href="/agenda"
                >
                  Ver agenda
                </Button>
                <Link
                  href={URL_PROGRAM}
                  download={true}
                  className="animate-appearance-in text-white px-6 py-2 rounded-full border"
                  target="_blank"
                >
                  Descargar programa
                </Link>
              </div>
            )}
            {isBeforeConference && (
              <Button
                className="animate-appearance-in text-white bg-green-700"
                variant="solid"
                radius="full"
                as={Link}
                href="/inscripciones"
              >
                Inscríbete
              </Button>
            )}
            {isBeforeSummary && (
              <Button
                variant="flat"
                radius="full"
                className="bg-white text-black animate-appearance-in"
                as={Link}
                href="/login"
              >
                Enviar resumen
              </Button>
            )}
          </div>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex gap-3"
        >
          {!isSpecificDate() ? (
            <>
              <div className="space-y-3">
                <motion.div
                  className=""
                  variants={item}
                >
                  <ImageUi
                    src="https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/banners%2Findigena.webp?alt=media&token=082b59bc-7cad-41bf-ac9a-916f4fa116fe"
                    alt="Banner Home"
                    className="w-52 h-56 object-cover "
                    radius="sm"
                    removeWrapper
                  />
                </motion.div>
                <motion.div variants={item}>
                  <ImageUi
                    src="https://firebasestorage.googleapis.com/v0/b/species-iiap-bb45a.appspot.com/o/coniap-iiap%2FiiapTejido.webp?alt=media&token=6e673280-2daa-4b3f-96b7-945ab95b5ede"
                    alt="Tejido-iiap"
                    radius="sm"
                    className="w-52 h-56 object-cover"
                  />
                </motion.div>
              </div>
              <div className="space-y-3 pt-8">
                <motion.div variants={item}>
                  <ImageUi
                    src="https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/banners%2FRanitomeya_fantastica_Shawi_GGU_IMG_7937.webp?alt=media&token=41f56cfa-fb64-4294-9530-e4cede2038be"
                    alt="expoIIAP"
                    radius="sm"
                    className="w-48 h-52 object-cover"
                  />
                </motion.div>
                <motion.div variants={item}>
                  <ImageUi
                    src="https://firebasestorage.googleapis.com/v0/b/species-iiap-bb45a.appspot.com/o/coniap-iiap%2FiiapFoto.webp?alt=media&token=ebd2a474-f961-48e6-9b4d-06c530dda0c2"
                    alt="Banner Home"
                    radius="sm"
                    className="h-48 object-cover"
                  />
                </motion.div>
              </div>
            </>
          ) : (
            <Link href="/agenda">
              {/* <motion.div
                className="flex items-center justify-center bg-white text-black w-72 h-72 rounded-xl"
                variants={item}
              > */}
              <Image
                src="/banner-speaker.webp"
                alt="Banner Home"
                width={600}
                height={600}
                className="rounded-lg"
                loading="lazy"
              />
              {/* </motion.div> */}
            </Link>
          )}
        </motion.div>
        <section className="absolute right-0 left-0 bottom-0 flex flex-col items-center ">
          <TimeSection />
        </section>
        <section className="absolute left-0 lg:left-auto right-0 z-30 bottom-24 sm:bottom-32 lg:bottom-0 lg:p-6 flex flex-col items-center">
          <Lottie
            aria-label="scroll-down"
            animationData={lotScrollDown}
            loop
            autoplay
            className="w-10 h-10 sm:w-12 sm:h-12"
            onClick={() => scrollToElement('about-us')}
          />
        </section>
      </div>
      <video
        autoPlay
        muted
        loop
        className="fixed w-full h-full max-h-screen object-cover  top-0 -z-50"
        onLoadedData={handleVideoLoaded}
        onLoad={handleVideoLoaded}
      >
        <source
          src="https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/banners%2Fbg-home.mp4?alt=media&token=a15b38ba-d052-42d8-96e5-69411348b070"
          type="video/mp4"
          onLoadedData={handleVideoLoaded}
        />
      </video>
    </section>
  )
}
