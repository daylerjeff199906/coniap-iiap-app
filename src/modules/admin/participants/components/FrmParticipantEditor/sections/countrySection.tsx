/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Controller, useFormContext } from 'react-hook-form'
import { Autocomplete, AutocompleteItem, Avatar } from '@nextui-org/react'
import countriesData from '@/utils/json/countries.json'

export const CountrySection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <Controller
        control={control}
        rules={{
          required: 'Este campo es requerido',
        }}
        name="location"
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            label="País"
            labelPlacement="outside"
            placeholder="Selecciona un país"
            name="location"
            value={value}
            selectedKey={value}
            onChange={(value) => {
              onChange(value)
            }}
            radius="sm"
            isInvalid={errors.location !== undefined}
            errorMessage={errors.location?.message as string}
          >
            {countriesData.map((item) => (
              <AutocompleteItem
                key={item.code}
                value={item.country}
              >
                {item.country}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        )}
      />
    </>
  )
}
