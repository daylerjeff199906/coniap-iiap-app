/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { usePrograms } from '@/hooks/admin'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'
import { IProgram } from '@/types'

export const ProgramSection = () => {
  const { getPrograms, programs } = usePrograms()
  const [query, setQuery] = useState('')

  useEffect(() => {
    getPrograms(query)
  }, [query])

  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext()

  const dataPrograms: IProgram[] = programs ?? []
  const programSelected: IProgram = dataPrograms.find(
    (program) => program.id === watch('program_id')
  ) as IProgram

  return (
    <>
      <Controller
        name="program_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            aria-label="Programs"
            label="Programa"
            placeholder="Seleccionar programa"
            labelPlacement="outside"
            inputValue={query}
            onInputChange={(value) => setQuery(value)}
            value={value}
            isInvalid={errors.person_id !== undefined}
            errorMessage={errors.person_id?.message as string}
            onSelectionChange={(value) => onChange(value)}
            defaultSelectedKey={String(watch('program_id'))}
            // defaultInputValue={programSelected?.title}
            disabled={true}
            description="Seleccione el programa al que pertenece el evento, es opcional"
          >
            {dataPrograms?.map((program) => (
              <AutocompleteItem
                key={String(program?.id)}
                value={program?.id}
              >
                {program?.title} - {program?.date}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        )}
      />
    </>
  )
}
