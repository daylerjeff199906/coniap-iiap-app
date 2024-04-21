/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { useCountries } from '@/hooks/admin'
import { Controller, useFormContext } from 'react-hook-form'
import { Autocomplete, AutocompleteItem, Image, Input } from '@nextui-org/react'

export const CountrySection = () => {
  const { countries, getCountries, loading } = useCountries()
  const [query, setQuery] = useState<string>('')

  const {
    control,
    formState: { errors },
  } = useFormContext()

  useEffect(() => {
    if (query && query.length >= 2) {
      getCountries(query)
    }
  }, [query])

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
            aria-label="localidad"
            label="Localidad"
            isLoading={loading}
            labelPlacement="outside"
            placeholder="Escribe para buscar..."
            radius="sm"
            value={value}
            // onValueChange={onChange}
            // onValueChange={(value) => {
            //   onChange(value)
            //   setQuery(value)
            // }}
            onInputChange={(value) => {
              setQuery(value)
            }}
            isInvalid={errors.location !== undefined}
            errorMessage={errors.location?.message as string}
          >
            {countries !== null
              ? countries.map((country, i) => (
                  <AutocompleteItem
                    key={i}
                    value={country.name.common}
                  >
                    <div className="flex gap-2 items-center">
                      <Image
                        src={country?.flags?.png}
                        alt={country?.flags?.alt}
                        removeWrapper
                        className="w-6 h-6"
                      />
                      {country.name.common}
                    </div>
                  </AutocompleteItem>
                ))
              : []}
          </Autocomplete>
        )}
      />
    </>
  )
}
