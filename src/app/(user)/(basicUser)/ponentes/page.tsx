'use client'
import { Divider } from '@nextui-org/react'
import { motion } from 'framer-motion'

export default function Page() {
  return (
    <>
      <section className="section-page">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center flex flex-col items-center">
            <h4 className="subtitle-section-home">Invitados especiales</h4>
            <h2 className="title-section-home">Conferencistas</h2>
            <Divider className="bg-orange-500 pt-1 rounded-full mt-4 w-36 " />
          </div>
        </motion.div>
      </section>
    </>
  )
}
