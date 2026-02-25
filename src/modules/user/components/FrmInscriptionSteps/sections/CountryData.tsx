'use client'
import { IPerson } from '@/types'
// TODO: Check these imports: // Removed NextUI import:  Autocomplete, AutocompleteItem 
import { Controller, useFormContext } from 'react-hook-form'
import countriesData from '@/utils/json/countries.json'

export const CountryData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPerson>()
  return (
    <>
      <Controller
        control={control}
        name="location"
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            label="País"
            
            placeholder="Selecciona un país"
            name="location"
            defaultItems={countriesData}
            onSelectionChange={(value) => {
              onChange(value)
            }}
            selectedKey={value || ''}
            className="rounded-sm"
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
    </>
  )
}
