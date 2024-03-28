/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { Input } from '@nextui-org/react'
import { IconSearch } from '@tabler/icons-react'

import { useEvents } from '@/hooks/client'
import { CardEvent, DataNotFound, LoadingPages } from '@/components'

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
      <article className="section-home">
        <section className="flex justify-between">
          <div></div>
          <div>
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
                  <CardEvent
                    key={eventIndex}
                    event={filteredEvent}
                    variant="agenda"
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <DataNotFound />
            </>
          )}
        </section>
      </article>
      <LoadingPages isOpen={loading} />
    </>
  )
}
