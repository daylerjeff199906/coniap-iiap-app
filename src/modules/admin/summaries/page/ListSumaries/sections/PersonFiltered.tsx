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
  Selection,
} from '@nextui-org/react'
import { IPerson } from '@/types'
import { IconSearch } from '@tabler/icons-react'

export const PersonFiltered = () => {
  const { getPersons, persons, loading } = usePersons()
  const [query, setQuery] = useState('')
  const [personSelected, setPersonSelected] = useState<IPerson | null>(null)

  useEffect(() => {
    getPersons({
      column: 'surname',
      query: query,
      isPagination: true,
      params: {
        page: 1,
        limit: 10,
      },
    })
  }, [query])

  const dataPersons = persons?.data || []

  const handlePerson = (value: Selection) => {
    const val = Object.values(value)[0]
    const person = dataPersons.find((person) => person.id === val)
  }

  return (
    <section>
      <Popover
        radius="sm"
        placement="right-start"
      >
        <PopoverTrigger>
          <Button
            isLoading={loading}
            radius="sm"
          >
            Filtrar por persona
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="min-w-[200px]">
            <Listbox
              selectionMode="single"
              onSelectionChange={handlePerson}
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
          </div>
        </PopoverContent>
      </Popover>
    </section>
  )
}
