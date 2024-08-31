/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { usePersons } from '@/hooks/admin'
import {
  Button,
  Input,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from '@nextui-org/react'
import { IPerson } from '@/types'
import { IconSearch } from '@tabler/icons-react'

export const PersonFiltered = () => {
  const { getPersons, persons, loading } = usePersons()
  const [query, setQuery] = useState('')
  const [personSelected, setPersonSelected] = useState<IPerson | null>(null)

  useEffect(() => {
    getPersons({
      column: 'surName',
      query: query,
      isPagination: true,
      params: {
        page: 1,
        limit: 10,
      },
    })
  }, [query])

  const dataPersons = persons?.data || []

  return (
    <section>
      <Popover>
        <PopoverTrigger>
          <Button radius="sm">Filtrar por persona</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div>
            {!loading && dataPersons && dataPersons.length > 0 && (
              <Listbox
                topContent={
                  <Input
                    startContent={<IconSearch stroke={1.5} />}
                    aria-label="Search person"
                    placeholder="Buscar por apellido..."
                    radius="sm"
                    value={query}
                    onValueChange={(value) => setQuery(value)}
                  />
                }
              >
                {dataPersons?.map((person) => (
                  <ListboxItem
                    key={String(person?.id)}
                    value={person.id}
                  >
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm">
                        {person.name} {person.surName}
                      </h3>
                      <p className="text-xs text-gray-500">{person.email}</p>
                    </div>
                  </ListboxItem>
                ))}
              </Listbox>
            )}
            {(!loading && !dataPersons) ||
              (dataPersons.length === 0 && (
                <section className="h-10 flex flex-col gap-1 justify-center items-center">
                  <p className="text-gray-500">No hay personas registradas</p>
                </section>
              ))}

            {loading && (
              <section className="w-full flex flex-col gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="w-full rounded-md h-6 min-w-[200px]"
                  />
                ))}
              </section>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </section>
  )
}
