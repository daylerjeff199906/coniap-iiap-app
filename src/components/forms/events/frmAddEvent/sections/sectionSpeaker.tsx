/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { usePersons } from '@/hooks/admin'
import { useFormContext, Controller } from 'react-hook-form'

export const SectionSpeaker = () => {
  const { getPersons, persons } = usePersons()
  const [query, setQuery] = useState('')

  useEffect(() => {
    getPersons(query)
  }, [query])

  const dataEvents = persons ? persons : []

  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <Controller
        name="person_id"
        control={control}
        rules={{
          required: 'Este campo es requerido',
        }}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            aria-label="Speakers"
            label="Ponente"
            placeholder="Seleccionar ponente"
            labelPlacement="outside"
            inputValue={query}
            onInputChange={(value) => setQuery(value)}
            value={value}
            onValueChange={onChange}
            isInvalid={errors.id_person !== undefined}
            errorMessage={errors.id_person?.message as string}
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
        )}
      />
    </>
  )
}
