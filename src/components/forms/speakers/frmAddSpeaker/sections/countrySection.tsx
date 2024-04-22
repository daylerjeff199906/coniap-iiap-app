/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { useCountries } from '@/hooks/admin'
import { Controller, useFormContext } from 'react-hook-form'
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Image,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react'

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
          <Select
            items={countries ? countries : []}
            label="País"
            labelPlacement="outside"
            placeholder="Seleccionar país"
            renderValue={(items) => {
              return items.map((item) => (
                <div
                  className="flex gap-2 items-center"
                  key={item.key}
                >
                  <Avatar
                    alt={item?.data?.flags.alt}
                    className="flex-shrink-0"
                    size="sm"
                    src={item?.data?.flags.png}
                  />
                  <div className="flex flex-col">
                    <span className="text-small">
                      {item?.data?.name.common}
                    </span>
                  </div>
                </div>
              ))
            }}
          >
            {(countries) => (
              <SelectItem
                key={countries.cca2}
                textValue={countries.name.common}
              >
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={countries.flags.alt}
                    className="flex-shrink-0"
                    size="sm"
                    src={countries.flags.png}
                  />
                  <div className="flex flex-col">
                    <span className="text-small">{countries.name.common}</span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        )}
      />
    </>
  )
}
