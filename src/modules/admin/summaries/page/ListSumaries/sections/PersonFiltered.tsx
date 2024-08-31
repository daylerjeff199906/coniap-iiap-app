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
} from '@nextui-org/react'

export const PersonFiltered = () => {
  const { getPersons, persons, loading } = usePersons()
  const [page, setPage] = useState(1)
  const limit = 10

  useEffect(() => {
    getPersons({
      column: 'name',
      query: '',
      isPagination: true,
      params: {
        page,
        limit,
      },
    })
  }, [])

  const dataPersons = persons?.data || []

  return (
    <section>
      <Popover>
        <PopoverTrigger>
          <Button
            isLoading={loading}
            radius="sm"
          >
            Filtrar por persona
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div>
            {dataPersons && dataPersons.length > 0 && (
              <Listbox
                topContent={
                  <Input
                    aria-label="Search person"
                    placeholder="Buscar persona"
                    radius="sm"
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
            {!dataPersons ||
              (dataPersons.length === 0 && (
                <section className="h-10 flex flex-col gap-1 justify-center items-center">
                  <p className="text-gray-500">No hay personas registradas</p>
                </section>
              ))}
          </div>
        </PopoverContent>
      </Popover>
    </section>
  )
}
