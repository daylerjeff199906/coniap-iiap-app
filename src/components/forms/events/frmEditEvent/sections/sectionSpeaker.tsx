/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'
import { usePersons, useEvents } from '@/hooks/admin'

export const SectionSpeaker = () => {
  const { getPersons, persons } = usePersons()
  const { getEvents, events } = useEvents()
  const [query, setQuery] = useState('')

  useEffect(() => {
    getPersons(query)
  }, [query])

  useEffect(() => {
    getEvents('', 'person_id')
  }, [])

  const dataEvents = events ? events : []
  // const dataEvents = events ? events.map((event) => event.persons) : []

  // const filteredPersons = events
  //   ? dataEvents?.filter((person) => {
  //       return !events.some((event) => event.persons?.id === person.id)
  //     })
  //   : []

  const {
    control,
    formState: { errors },
    watch,
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
            isInvalid={errors.person_id !== undefined}
            errorMessage={errors.person_id?.message as string}
            onSelectionChange={(value) => onChange(value)}
            defaultSelectedKey={watch('person_id')}
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
