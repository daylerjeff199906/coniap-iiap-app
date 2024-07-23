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
    <section className="bg-success-700/70 w-full relative container rounded-t-xl ">
      <div className="py-4 sm:py-8 lg:py-5 flex items-center justify-center">
        {isCurrent && (
          <h2 className="text-white">The event is happening now</h2>
        )}
        {isFuture && (
          <div className="flex flex-col gap-2 lg:max-w-2xl w-full">
            <div className="flex text-white w-full items-center ">
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
          </div>
        )}
        {!isCurrent && !isFuture && (
          <h2 className="text-white">Próximamente</h2>
        )}
      </div>
      <Image
        className="w-full object-cover h-full object-center absolute -z-10 top-0 left-0 right-0 rounded-xl"
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
      <motion.h1 className="text-2xl lg:text-5xl font-bold">
        {rounded}
      </motion.h1>
      <p className="text-white font-medium text-tiny lg:text-base">{label}</p>
    </div>
  )
}
