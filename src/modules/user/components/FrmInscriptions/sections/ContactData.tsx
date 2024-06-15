'use client'
import { IPerson } from '@/types'
import { Input } from '@nextui-org/react'
import { Controller, useFormContext } from 'react-hook-form'

export const ContactData = () => {
  const methods = useFormContext<IPerson>()
  return (
    <>
      <Controller
        control={methods.control}
        name="email"
        rules={{
          required: 'Este campo es requerido',
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            message: 'Email no válido',
          },
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Email"
            labelPlacement="outside"
            radius="sm"
            placeholder="ejemplo@hotmail.com"
            value={value || ''}
            onValueChange={onChange}
            isInvalid={methods.formState.errors.email !== undefined}
            errorMessage={methods.formState.errors.email?.message as string}
          />
        )}
      />
    </>
  )
}
