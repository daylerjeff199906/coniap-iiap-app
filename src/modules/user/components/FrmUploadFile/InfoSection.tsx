'use client'
import { ISummary } from '@/types'
import { Input } from '@nextui-org/react'
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
            labelPlacement="outside"
            placeholder="Título"
            value={value}
            onChange={onChange}
            radius="sm"
            isInvalid={formState.errors?.title !== undefined}
            errorMessage={formState.errors?.title?.message}
          />
        )}
      />
    </>
  )
}
