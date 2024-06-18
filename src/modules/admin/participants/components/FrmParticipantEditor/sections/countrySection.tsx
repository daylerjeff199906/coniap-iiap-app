'use client'
import { Controller, useFormContext } from 'react-hook-form'
import { Autocomplete, AutocompleteItem, Input } from '@nextui-org/react'
import countriesData from '@/utils/json/countries.json'
import { IPerson } from '@/types'

export const CountrySection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPerson>()

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Controller
        control={control}
        name="location"
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            label="País"
            labelPlacement="outside"
            placeholder="Selecciona un país"
            name="location"
            defaultItems={countriesData}
            onSelectionChange={(value) => {
              onChange(value)
            }}
            selectedKey={value || ''}
            radius="sm"
            isInvalid={errors.location !== undefined}
            errorMessage={errors.location?.message as string}
          >
            {(item) => (
              <AutocompleteItem key={item.country}>
                {item.country}
              </AutocompleteItem>
            )}
          </Autocomplete>
        )}
      />
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <Input
            aria-label="Teléfono del participante"
            label="Teléfono"
            labelPlacement="outside"
            radius="sm"
            placeholder="Teléfono del participante"
            value={value}
            onValueChange={onChange}
            isInvalid={errors.phone !== undefined}
            errorMessage={errors.phone?.message as string}
          />
        )}
      />
    </section>
  )
}
