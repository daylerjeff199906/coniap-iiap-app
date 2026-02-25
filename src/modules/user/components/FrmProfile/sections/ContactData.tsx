'use client'
import { IPerson } from '@/types'
import { Input } from '@/components/ui/input'
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
            
            value={value}
            onValueChange={onChange}
            isInvalid={errors.email !== undefined}
            errorMessage={errors.email?.message}
            disabled
            
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
            
            value={value}
            onValueChange={onChange}
            
          />
        )}
      />
    </>
  )
}
