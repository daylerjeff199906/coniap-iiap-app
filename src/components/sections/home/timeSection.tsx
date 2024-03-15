'use client'
import { useEffect, useState } from 'react'
import Vector from '@/assets/svg/patron_vectores.svg'
import Image from 'next/image'

const dateStart = new Date('2024-11-13').getTime()
const dateEnd = new Date('2024-11-15').getTime()
const dateNext = new Date('2026-11-01').getTime()

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
      <div className="container section-home">
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

const TimeDisplay = ({ label, value }: { label: string; value: number }) => (
  <div className="w-full text-center">
    <h2 className="text-white lg:pb-3 font-medium text-tiny lg:text-base">
      {label}
    </h2>
    <h1 className="text-2xl lg:text-5xl font-bold">{value}</h1>
  </div>
)
