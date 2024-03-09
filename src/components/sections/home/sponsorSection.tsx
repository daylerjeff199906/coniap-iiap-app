'use client'
import { motion } from 'framer-motion'
import { Divider } from '@nextui-org/react'

export const SponsorSection = () => {
  return (
    <>
      <section className="bg-white section-home">
        <div className="container space-y-6">
          <motion.div
            className="flex"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mr-4">
              <Divider
                orientation="vertical"
                className=" bg-orange-500 h-full w-1 rounded-full"
              />
            </div>
            <div className="">
              <h4 className="subtitle-section-home">sponsors</h4>
              <h2 className="title-section-home">Nuestros colaboradores</h2>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
