'use client'
import { IPerson } from '@/types'
import { Input, Textarea } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

export const PersonData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPerson>()
  return (
    <>
      <Controller
        control={control}
        name="name"
        rules={{ required: 'Este campo es requerido' }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Nombres"
            placeholder="Escribe tus nombres"
            labelPlacement="outside"
            value={value || ''}
            onValueChange={onChange}
            isInvalid={errors.name !== undefined}
            errorMessage={errors.name?.message}
            radius="sm"
          />
        )}
      />
      <Controller
        control={control}
        name="surName"
        rules={{ required: 'Este campo es requerido' }}
        render={({ field: { value, onChange } }) => (
          <Input
            label="Apellidos"
            placeholder="Escribe tus apellidos"
            labelPlacement="outside"
            value={value || ''}
            onValueChange={onChange}
            isInvalid={errors.surName !== undefined}
            errorMessage={errors.surName?.message}
            radius="sm"
          />
        )}
      />

      <Controller
        control={control}
        name="job"
        render={({ field: { value, onChange } }) => (
          <Input
            label="Puesto de trabajo | Ocupación | Profesión"
            placeholder="Escribe tu puesto de trabajo, ocupación o profesión"
            labelPlacement="outside"
            description="Ejemplo: Desarrollador de software"
            value={value || ''}
            onValueChange={onChange}
            radius="sm"
          />
        )}
      />
      <Controller
        control={control}
        name="institution"
        render={({ field: { value, onChange } }) => (
          <Input
            label="Institucion | Empresa"
            placeholder="Escribe el nombre de la institución donde te desempeñas"
            labelPlacement="outside"
            value={value || ''}
            onValueChange={onChange}
            radius="sm"
          />
        )}
      />
      <Controller
        control={control}
        name="presentation"
        render={({ field: { value, onChange } }) => (
          <Textarea
            label="Presentación"
            placeholder="Escribe una presentación corta sobre ti"
            labelPlacement="outside"
            value={value || ''}
            onValueChange={onChange}
            radius="sm"
          />
        )}
      />
    </>
  )
}
