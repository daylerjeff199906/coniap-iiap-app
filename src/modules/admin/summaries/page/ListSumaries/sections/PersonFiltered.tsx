/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { usePersons } from '@/hooks/admin'
import {
  Button,
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

  //   useEffect(() => {
  //     getPersons({
  //       column: 'name',
  //       query: '',
  //       isPagination: true,
  //       params: {
  //         page,
  //         limit,
  //       },
  //     })
  //   }, [])

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
              <Listbox>
                {dataPersons?.map((person) => (
                  <ListboxItem
                    key={String(person?.id)}
                    value={person.id}
                  >
                    {person.name}
                  </ListboxItem>
                ))}
              </Listbox>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </section>
  )
}
