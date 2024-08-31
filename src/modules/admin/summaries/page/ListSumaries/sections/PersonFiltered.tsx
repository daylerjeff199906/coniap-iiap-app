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
import { IconSearch, IconTrash } from '@tabler/icons-react'
interface IFilter {
  onValueChange: (value: string) => void
}

export const PersonFiltered = (props: IFilter) => {
  const { getPersons, persons, loading } = usePersons()
  const { onValueChange } = props
  const [query, setQuery] = useState('')
  const [personSelected, setPersonSelected] = useState<IPerson | null>(null)

  useEffect(() => {
    getPersons({
      column: 'surname',
      isNot: 'participant',
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
    const person = dataPersons.find((person) => person.id?.toString() === val)
    if (person?.id) {
      setPersonSelected(person)
      onValueChange(person.id)
    } else {
      setPersonSelected(null)
      onValueChange('')
    }
  }

  return (
    <section className="flex gap-2">
      <Popover
        radius="sm"
        placement="right-start"
      >
        <PopoverTrigger>
          <Button
            isLoading={loading}
            radius="sm"
          >
            {personSelected ? (
              <div className="flex flex-col justify-start items-start">
                <h3 className="text-xs">
                  {personSelected.name} {personSelected.surName}
                </h3>
                <p className="text-tiny text-gray-500">
                  {personSelected.email}
                </p>
              </div>
            ) : (
              <p>Filtrar por persona</p>
            )}
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
      {personSelected && (
        <Button
          isIconOnly
          radius="sm"
          variant="bordered"
          onPress={() => setPersonSelected(null)}
        >
          <IconTrash size={20} />
        </Button>
      )}
    </section>
  )
}
