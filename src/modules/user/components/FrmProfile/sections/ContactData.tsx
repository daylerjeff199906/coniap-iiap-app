'use client'
import { IPerson } from '@/types'
import { Input } from '@nextui-org/react'
import { Controller, useFormContext } from 'react-hook-form'

export const ContactData = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<IPerson>()

  return (
    <>
      <Controller
        control={control}
        name="email"
        rules={{ required: 'Este campo es requerido' }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Correo electrónico"
            placeholder="Escribe tu correo electrónico"
            labelPlacement="outside"
            value={value}
            onValueChange={onChange}
            isInvalid={errors.email !== undefined}
            errorMessage={errors.email?.message}
            isDisabled
            radius="sm"
          />
        )}
      />
      <Controller
        control={control}
        name="phone"
        render={({ field: { value, onChange } }) => (
          <Input
            label="Teléfono"
            placeholder="Escribe tu número de teléfono"
            labelPlacement="outside"
            value={value}
            onValueChange={onChange}
            radius="sm"
          />
        )}
      />
    </>
  )
}
