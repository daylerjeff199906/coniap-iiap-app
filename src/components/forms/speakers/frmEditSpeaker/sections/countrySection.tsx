/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { useCountries } from '@/hooks/admin'
import { Controller, useFormContext } from 'react-hook-form'
import { Avatar, Select, SelectItem } from '@nextui-org/react'

export const CountrySection = () => {
  const { allCountries, getAllCountries, loading } = useCountries()
  // const [query, setQuery] = useState<string>('a')

  const {
    control,
    formState: { errors },
  } = useFormContext()

  useEffect(() => {
    // if (query && query.length >= 2) {
    getAllCountries()
    // }
  }, [])

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
            items={allCountries || []}
            label="Assigned to"
            placeholder="Select a user"
            labelPlacement="outside"
            classNames={{
              base: 'max-w-xs',
              trigger: 'h-12',
            }}
            renderValue={(items) => {
              return items.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center gap-2"
                >
                  <Avatar
                    alt={item.data?.flags.alt}
                    className="flex-shrink-0"
                    size="sm"
                    src={item.data?.flags.png}
                  />
                  <div className="flex flex-col">
                    <span>{item.data?.name.common}</span>
                  </div>
                </div>
              ))
            }}
          >
            {(country) => (
              <SelectItem
                key={country.cca2}
                textValue={country.name.common}
              >
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={country.flags.alt}
                    className="flex-shrink-0"
                    size="sm"
                    src={country.flags.png}
                  />
                  <div className="flex flex-col">
                    <span className="text-small">{country.name.common}</span>
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
