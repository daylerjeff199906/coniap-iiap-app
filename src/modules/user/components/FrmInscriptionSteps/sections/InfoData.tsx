'use client'
import { IPerson } from '@/types'
import { Input } from '@nextui-org/react'
import { Controller, useFormContext } from 'react-hook-form'

export const InfoData = () => {
  const methods = useFormContext<IPerson>()

  return (
    <>
      <Controller
        control={methods.control}
        name="name"
        rules={{ required: 'Este campo es requerido' }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Nombres"
            labelPlacement="outside"
            radius="sm"
            placeholder="Nombres"
            value={value || ''}
            onValueChange={onChange}
            isInvalid={methods.formState.errors.name !== undefined}
            errorMessage={methods.formState.errors.name?.message as string}
          />
        )}
      />
      <Controller
        control={methods.control}
        name="surName"
        rules={{ required: 'Este campo es requerido' }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Apellidos"
            labelPlacement="outside"
            radius="sm"
            placeholder="Apellidos"
            value={value || ''}
            onValueChange={onChange}
            isInvalid={methods.formState.errors.surName !== undefined}
            errorMessage={methods.formState.errors.surName?.message as string}
          />
        )}
      />
    </>
  )
}
