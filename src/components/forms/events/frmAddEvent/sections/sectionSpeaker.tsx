/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { usePersons } from '@/hooks/admin'

export const SectionSpeaker = () => {
  const { getPersons, persons } = usePersons()
  const [query, setQuery] = useState('')

  useEffect(() => {
    getPersons(query)
  }, [query])

  const dataEvents = persons ? persons : []

  return (
    <>
      <Autocomplete
        aria-label="Speakers"
        placeholder="Seleccionar ponente"
        inputValue={query}
        onInputChange={(value) => setQuery(value)}
      >
        {dataEvents?.map((person) => (
          <AutocompleteItem
            key={person.id}
            value={person.id}
          >
            {person.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </>
  )
}
