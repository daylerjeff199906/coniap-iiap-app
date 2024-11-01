/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import {
  Image,
  Input,
  Pagination,
  Select,
  SelectItem,
  Selection,
} from '@nextui-org/react'
import { IconSearch } from '@tabler/icons-react'

import { EventCard } from '@/modules/user'
import { IEvent } from '@/types'
import { useFilterFromUrl } from '@/modules/core'
import { useDebounce } from '@/hooks/core'

interface IEventsPage {
  events: { event: IEvent[]; count: number }
}

const optionsTypesEvents = [
  { value: 'all', label: 'Todos los eventos' },
  { value: 'true', label: 'Ponencias' },
  { value: 'false', label: 'Foros y otros' },
]

export const ListEventsPage = (props: IEventsPage) => {
  const { events } = props
  const [query, setQuery] = useState<string>('')
  const { updateFilters, getParams } = useFilterFromUrl()

  const searchDefault = getParams('search', '')
  const searchType = getParams('type', 'all')
  const currentPage = getParams('page', '1')
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    updateFilters({ search: debouncedQuery })
  }, [debouncedQuery])

  const handleSelectType = (key: Selection) => {
    const value = Object.values(key)[0]
    if (value === 'all') {
      updateFilters({ type: '' })
    } else {
      updateFilters({ type: value })
    }
  }

  return (
    <>
      <article className="section-home grid grid-cols-1 gap-4">
        <section className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <div className="w-full sm:flex">
            <Select
              aria-label="Filtrar por tipo de evento"
              selectedKeys={[searchType]}
              onSelectionChange={handleSelectType}
              variant="bordered"
              radius="sm"
              className="w-full sm:max-w-xs"
            >
              {optionsTypesEvents.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="w-full sm:max-w-xl sm:min-w-80">
            <Input
              defaultValue={searchDefault}
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
          {events && events.event.length > 0 ? (
            <>
              <div className="w-ful grid grid-cols-1 gap-8 lg:p-6">
                {events.event.map((filteredEvent, eventIndex) => (
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
        {Math.ceil(events.count / 10) > 1 && (
          <footer>
            <Pagination
              page={parseInt(currentPage)}
              onChange={(page) => updateFilters({ page: page.toString() })}
              showControls
              total={Math.ceil(events.count / 10)}
            />
          </footer>
        )}
      </article>
    </>
  )
}
