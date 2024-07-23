'use client'
import { useState } from 'react'
import { Button, Image } from '@nextui-org/react'
import { IconCalendarEvent } from '@tabler/icons-react'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { formatConferenceDate } from '@/utils/functions'
import infoData from '@/utils/json/infoConiap.json'
import { TimeSection } from './timeSection'
import { lotScrollDown } from '@/assets'
import Lottie from 'lottie-react'

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

export const BannerHome = () => {
  const [videoLoaded, setVideoLoaded] = useState(false)

  const handleVideoLoaded = () => {
    setVideoLoaded(true)
  }

  const conferenceDate = formatConferenceDate(
    infoData.data.dates['date-conference']
  )

  return (
    <section
      id="banner-home"
      // className="h-screen flex items-center relative bg-gradient-to-r from-black/90 to-transparent w-full"
      className="h-screen flex items-center relative bg-black/60 w-full"
    >
      <div className="container grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
        <motion.div
          className="w-full lg:max-w-2xl space-y-4"
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
          <h1 className="text-[2.3rem] lg:text-[2.8rem]  animate-appearance-in leading-tight text-white">
            Bienvenidos al III Congreso Internacional sobre{' '}
            <span className="text-green-500 font-bold">Amazonía</span> Peruana
            (CONIAP)
          </h1>
          <div className="flex items-center gap-2">
            <IconCalendarEvent
              size={48}
              stroke={1}
              color="#fff"
            />
            <h3 className="text-white text-md max-w-48">{conferenceDate}</h3>
          </div>
          <div className="w-full flex items-center gap-3">
            <Button
              className="animate-appearance-in text-white bg-green-700"
              variant="solid"
              radius="full"
              as={Link}
              href="/agenda"
            >
              Ver agenda
            </Button>
            <Button
              variant="flat"
              radius="full"
              className="bg-white text-black animate-appearance-in"
              as={Link}
              href="/inscripciones"
            >
              Inscríbete
            </Button>
          </div>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex gap-3"
        >
          <div className="space-y-3">
            <motion.div
              className=""
              variants={item}
            >
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/banners%2Findigena.webp?alt=media&token=082b59bc-7cad-41bf-ac9a-916f4fa116fe"
                alt="Banner Home"
                className="w-52 h-56 object-cover "
                radius="sm"
                removeWrapper
              />
            </motion.div>
            <motion.div variants={item}>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/species-iiap-bb45a.appspot.com/o/coniap-iiap%2FiiapTejido.webp?alt=media&token=6e673280-2daa-4b3f-96b7-945ab95b5ede"
                alt="Tejido-iiap"
                radius="sm"
                className="w-52 h-56 object-cover"
              />
            </motion.div>
          </div>
          <div className="space-y-3 pt-8">
            <motion.div variants={item}>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/banners%2FRanitomeya_fantastica_Shawi_GGU_IMG_7937.webp?alt=media&token=41f56cfa-fb64-4294-9530-e4cede2038be"
                alt="expoIIAP"
                radius="sm"
                className="w-48 h-52 object-cover"
              />
            </motion.div>
            <motion.div variants={item}>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/species-iiap-bb45a.appspot.com/o/coniap-iiap%2FiiapFoto.webp?alt=media&token=ebd2a474-f961-48e6-9b4d-06c530dda0c2"
                alt="Banner Home"
                radius="sm"
                className="h-48 object-cover"
              />
            </motion.div>
          </div>
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
