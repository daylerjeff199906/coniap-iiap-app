'use client'
import { useEffect, useState } from 'react'

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
    <section className="bg-green-700">
      <div className="container section-home">
        {isCurrent && (
          <h2 className="text-white">The event is happening now</h2>
        )}
        {isFuture && (
          <div className="w-full flex flex-col justify-center text-center">
            <div className="w-full justify-around">
              <div className="grid grid-cols-4 text-white w-full">
                <TimeDisplay
                  label="Days"
                  value={days}
                />
                <TimeDisplay
                  label="Hours"
                  value={hours}
                />
                <TimeDisplay
                  label="Minutes"
                  value={minutes}
                />
                <TimeDisplay
                  label="Seconds"
                  value={seconds}
                />
              </div>
            </div>
          </div>
        )}
        {!isCurrent && !isFuture && (
          <h2 className="text-white">Próximamente</h2>
        )}
      </div>
    </section>
  )
}

const TimeDisplay = ({ label, value }: { label: string; value: number }) => (
  <div className="w-full text-center">
    <h2 className="text-white">{label}</h2>
    <h1 className="lg:text-5xl font-bold">{value}</h1>
  </div>
)
