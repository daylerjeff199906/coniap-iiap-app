'use client'
import { ISummary } from '@/types'
import { Input } from '@/components/ui/input'
import { Controller, useFormContext } from 'react-hook-form'

export const InfoSection = () => {
  const { control, formState } = useFormContext<ISummary>()
  return (
    <>
      <Controller
        name="title"
        control={control}
        rules={{ required: 'Este campo es requerido' }}
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="Título del resumen"
            label="Título del tema del resumen"
            
            placeholder="Título"
            value={value}
            onChange={onChange}
            
            isInvalid={formState.errors?.title !== undefined}
            errorMessage={formState.errors?.title?.message}
          />
        )}
      />
    </>
  )
}
