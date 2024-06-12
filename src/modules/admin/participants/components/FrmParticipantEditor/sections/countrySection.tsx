/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Controller, useFormContext } from 'react-hook-form'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import countriesData from '@/utils/json/countries.json'
import { IPerson } from '@/types'

export const CountrySection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPerson>()

  return (
    <>
      <Controller
        control={control}
        // rules={{
        //   required: 'Este campo es requerido',
        // }}
        name="location"
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            label="País"
            labelPlacement="outside"
            placeholder="Selecciona un país"
            name="location"
            value={value || ''}
            onSelectionChange={(value) => {
              const newValue = Object.values(value)[0]
              onChange(newValue)
            }}
            selectedKey={value || ''}
            radius="sm"
            isInvalid={errors.location !== undefined}
            errorMessage={errors.location?.message as string}
          >
            {countriesData?.map((item) => (
              <AutocompleteItem
                key={item.country}
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
