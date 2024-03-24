'use client'
import { Card, Divider } from '@nextui-org/react'
import {
  IconFish,
  IconTrees,
  IconPlant,
  IconSettings,
  IconBrain,
} from '@tabler/icons-react'
import { motion } from 'framer-motion'

const topicsExample = [
  {
    title:
      'EL AGUA Y SUS RECURSOS EN LA AMAZONIA: HIDROBIOLOGIA, ACUICULTURA Y PESCA',
    icon: (
      <IconFish
        size={60}
        stroke={1}
      />
    ),
  },
  {
    title: 'ECOLOGiA Y USO SOSTENIBLE DE BOSQUES AMAZÓNICOS',
    icon: (
      <IconTrees
        size={60}
        stroke={1}
      />
    ),
  },
  {
    title: 'BIODIVERSIDAD',
    icon: (
      <IconPlant
        size={60}
        stroke={1}
      />
    ),
  },
  {
    title:
      'CONOCIMIENTOS TRADICIONALES, CONSERVACIÓN Y BUEN VIVIR EN LA AMAZONIA PERUANA',

    icon: (
      <IconSettings
        size={60}
        stroke={1}
      />
    ),
  },
  {
    title: 'GESTIÓN TERRITORIAL PARA EL DESARROLLO DE LA AMAZONÍA PERUANA',
    icon: (
      <IconBrain
        size={60}
        stroke={1}
      />
    ),
  },
]

export const TopicsSection = () => {
  return (
    <section className=" bg-black/70">
      <div className="container section-home space-y-2">
        <header>
          <div className="flex items-center gap-3 pb-3">
            <div className="dot-custom" />
            <p className="text-xs font-semibold text-white">#CONIAP- 2024</p>
          </div>
          <div className="w-full max-w-4xl">
            <h2 className="text-3xl sm:text-[40px] pb-6 leading-tight text-white">
              Líneas <b>temáticas</b>
            </h2>
            {/* <h3 className="text-lg">
                Fomentando un Diálogo Multidisciplinario para el Avance
                Sostenible Globalmente.
              </h3> */}
          </div>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-3  py-4">
          {topicsExample.map((topic, i) => (
            <CardTopics
              key={i}
              title={topic.title}
              icon={topic.icon}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const CardTopics = ({ title, icon }: { title: string; icon: JSX.Element }) => {
  return (
    <Card
      className={`bg-transparent text-white p-6 text-center flex flex-col justify-center items-center gap-2 animate-appearance-in `}
      radius="none"
      shadow="none"
    >
      <div className="flex justify-center items-center  rounded-full p-4">
        {icon}
      </div>
      <h3 className="font-bold">{title}</h3>
    </Card>
  )
}
