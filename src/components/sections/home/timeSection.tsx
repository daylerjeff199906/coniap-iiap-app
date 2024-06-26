/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import Vector from '@/assets/svg/patron_vectores.svg'
import Image from 'next/image'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import dataInfo from '@/utils/json/infoConiap.json'

const dateStart = new Date(
  dataInfo.data.dates['date-conference'].start
).getTime()
const dateEnd = new Date(dataInfo.data.dates['date-conference'].end).getTime()
// sumar 2 años a dateEnd para que sea la fecha de la próxima conferencia
function addYears(date: Date, years: number) {
  const newDate = new Date(date)
  newDate.setFullYear(newDate.getFullYear() + years)
  return newDate
}

const dateNext = addYears(
  new Date(dataInfo.data.dates['date-conference'].end),
  2
).getTime()

export const TimeSection = () => {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [isCurrent, setIsCurrent] = useState(false)
  const [isFuture, setIsFuture] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const interval = setInterval(() => {
        const now = new Date().getTime()

        if (now >= dateStart && now <= dateEnd) {
          setIsCurrent(true)
          setIsFuture(false)
        } else if (now < dateStart) {
          setIsCurrent(false)
          setIsFuture(true)
          setTimeRemaining(dateStart - now)
        } else {
          setIsCurrent(false)
          setIsFuture(false)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [])

  const days = Math.floor(
    timeRemaining !== null ? timeRemaining / (1000 * 60 * 60 * 24) : 0
  )
  const hours = Math.floor(
    (timeRemaining !== null ? timeRemaining % (1000 * 60 * 60 * 24) : 0) /
      (1000 * 60 * 60)
  )
  const minutes = Math.floor(
    (timeRemaining !== null ? timeRemaining % (1000 * 60 * 60) : 0) /
      (1000 * 60)
  )
  const seconds = Math.floor(
    (timeRemaining !== null ? timeRemaining % (1000 * 60) : 0) / 1000
  )

  return (
    <section className="bg-success-700/70 relative">
      <div className="container py-4 sm:py-6 lg:py-10">
        {isCurrent && (
          <h2 className="text-white">The event is happening now</h2>
        )}
        {isFuture && (
          <div className="flex text-white w-full items-center px-0 sm:px-28 lg:px-36 xl:px-72">
            <TimeDisplay
              label="Días"
              value={days}
            />
            <h1 className="text-sm :sm:text-lg lg:text-2xl font-bold">:</h1>
            <TimeDisplay
              label="Horas"
              value={hours}
            />
            <h1 className="text-sm :sm:text-lg lg:text-2xl font-bold">:</h1>
            <TimeDisplay
              label="Minutos"
              value={minutes}
            />
            <h1 className="text-sm :sm:text-lg lg:text-2xl font-bold">:</h1>
            <TimeDisplay
              label="Segundos"
              value={seconds}
            />
          </div>
        )}
        {!isCurrent && !isFuture && (
          <h2 className="text-white">Próximamente</h2>
        )}
      </div>
      <div className="w-full h-full absolute top-0 -z-20 left-0 bg-success-700" />
      <Image
        className="w-full object-cover h-full object-center absolute -z-10 top-0 left-0 right-0"
        alt="bg-home"
        src={Vector}
      />
    </section>
  )
}

const TimeDisplay = ({ label, value }: { label: string; value: number }) => {
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)

  useEffect(() => {
    const controls = animate(count, value, {
      // type: 'tween',
      duration: 2,
    })
  }, [value])

  return (
    <div className="w-full text-center">
      <h2 className="text-white lg:pb-3 font-medium text-tiny lg:text-base">
        {label}
      </h2>
      <motion.h1 className="text-2xl lg:text-5xl font-bold">
        {rounded}
      </motion.h1>
    </div>
  )
}
