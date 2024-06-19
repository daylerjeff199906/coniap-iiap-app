'use client'
import { IPerson } from '@/types'
import { Input } from '@nextui-org/react'
import { Controller, useFormContext } from 'react-hook-form'

export const ContactData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPerson>()

  return (
    <>
      <div>
        <h2 className="text-sm font-semibold text-gray-500">
          Datos de contacto
        </h2>
        <p className="text-xs text-gray-400">
          Completa tus datos de contacto para que otros usuarios puedan
          comunicarse contigo
        </p>
      </div>
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
          />
        )}
      />
    </>
  )
}
