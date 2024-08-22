'use client'
import { motion } from 'framer-motion'
import { imgImagoTipoConiap } from '@/assets'
import Image from 'next/image'

interface IProps {
  description: string
}

export const InfoAboutUs = (props: IProps) => {
  const { description } = props
  return (
    <>
      <section className="">
        <main className="p-4 grid grid-cols-1 sm:grid-cols-2 items-center">
          <motion.div
            className=""
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: 'spring',
                damping: 5,
                stiffness: 100,
                restDelta: 0.001,
              },
            }}
          >
            <Image
              src={imgImagoTipoConiap.src}
              alt="CONIAP 2024"
              width={420}
              height={520}
              className="w-full h-full max-h-[520px] rounded-xl"
            />
          </motion.div>
          <section className="w-full">
            <motion.div
              className="flex items-center gap-3 pb-3"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
              }}
            >
              <div className="dot-custom" />
              <p className="text-xs font-semibold">#CONIAP - 2024</p>
            </motion.div>
            <motion.h2
              className="text-3xl sm:text-[40px] pb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
              }}
            >
              Congreso <b>Internacional</b> sobre <b>AMAZONÍA </b> Peruana
            </motion.h2>
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
              }}
            >
              {RenderHtml(description || '')}
            </motion.div>
          </section>
        </main>
      </section>
    </>
  )
}

const RenderHtml = (html: string) => {
  return (
    <>
      <div
        className="custom-quill"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  )
}
