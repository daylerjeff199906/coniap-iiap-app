'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { Footer, NavBar } from '@/components'

import imgTipo from '@/assets/svg/IMAGOTIPO - CONIAP.svg'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  // add splash screen
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="h-screen">
        <div className="flex flex-col justify-center items-center h-full w-full">
          <motion.div
            className="w-1/3"
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
              src={imgTipo}
              alt="IMAGOTIPO - CONIAP"
            />
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
