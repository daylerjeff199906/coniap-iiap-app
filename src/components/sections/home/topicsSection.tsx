/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Card, Image } from '@nextui-org/react'

import { motion } from 'framer-motion'

import { ITopic } from '@/types'

interface IProps {
  topics: ITopic[] | undefined
}

export const TopicsSection = (props: IProps) => {
  const { topics } = props

  return (
    <section className=" bg-black/70">
      <div className="container section-home space-y-2">
        <motion.header
          initial={{ opacity: 0, x: -50 }}
          viewport={{
            once: false,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 1,
            },
          }}
        >
          <div className="flex items-center gap-3 pb-3">
            <div className="dot-custom" />
            <p className="text-xs font-semibold text-white uppercase">#CONIAP- 2024</p>
          </div>
          <div className="w-full max-w-4xl">
            <h2 className="text-3xl sm:text-[40px] pb-6 leading-tight text-white">
              Líneas <b>temáticas</b>
            </h2>
          </div>
        </motion.header>
        <div className="grid grid-cols-1 sm:grid-cols-3  py-4">
          {topics &&
            topics?.map((topic, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                viewport={{
                  once: false,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 1,
                  },
                }}
              >
                <CardTopics
                  title={topic.name}
                  icon={topic.image}
                />
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  )
}

const CardTopics = ({ title, icon }: { title: string; icon: string }) => {
  return (
    <Card
      className={`bg-transparent text-white p-6 text-center flex flex-col justify-center items-center gap-2 animate-appearance-in `}
      radius="none"
      shadow="none"
    >
      <div className="flex justify-center items-center  rounded-full p-4 ">
        <Image
          src={icon}
          alt={title}
          className="h-24 w-24"
        />
      </div>
      <h3 className="">{title}</h3>
    </Card>
  )
}
