/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { Image, Input } from '@nextui-org/react'
import { IconSearch } from '@tabler/icons-react'

import { useEvents } from '@/hooks/client'
import { CardEvent, LoadingPages } from '@/components'
import { EventCard } from '@/modules/user'

export const ListEventsPage = () => {
  const [query, setQuery] = useState<string>('')
  const { getEventsActive, events, loading } = useEvents()
  let typingTimer: ReturnType<typeof setTimeout>

  useEffect(() => {
    // Esta función se ejecutará cuando el usuario deje de escribir durante 300ms
    const search = () => {
      getEventsActive(query, '')
    }

    clearTimeout(typingTimer)
    typingTimer = setTimeout(search, 300)

    // Limpia el temporizador en cada cambio de query
    return () => clearTimeout(typingTimer)
  }, [query])

  return (
    <>
      <article className="section-home grid grid-cols-1 gap-4">
        <section className="flex sm:justify-between">
          <div className='w-full hidden sm:flex'></div>
          <div className="w-full sm:max-w-xl sm:min-w-80">
            <Input
              aria-label="Buscar eventos"
              placeholder="Buscar eventos ..."
              variant="bordered"
              radius="sm"
              color="primary"
              startContent={<IconSearch />}
              value={query}
              onValueChange={setQuery}
            />
          </div>
        </section>
        <section>
          {events && events.length > 0 ? (
            <>
              <div className="w-ful grid grid-cols-1 gap-8 lg:p-6">
                {events.map((filteredEvent, eventIndex) => (
                  <EventCard
                    key={eventIndex}
                    data={filteredEvent}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <Image
                  src="/svg/not-courses.svg"
                  alt="No hay cursos disponibles"
                  width={320}
                  height={320}
                />

                <div className="flex flex-col items-start justify-center sm:justify-start sm:items-center">
                  <h3 className="text-sm text-center font-bold lg:text-base">
                    ¡Pronto más eventos para ti!
                  </h3>
                  <p className="text-xs lg:text-sm">
                    Aún no se han programado eventos disponibles
                  </p>
                </div>
              </div>
            </>
          )}
        </section>
      </article>
      <LoadingPages isOpen={loading} />
    </>
  )
}
