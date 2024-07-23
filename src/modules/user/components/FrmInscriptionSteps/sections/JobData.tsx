import { IPerson } from '@/types'
import { Input } from '@nextui-org/react'
import { Controller, useFormContext } from 'react-hook-form'

export const JobData = () => {
  const methods = useFormContext<IPerson>()
  return (
    <>
      <Controller
        control={methods.control}
        name="job"
        rules={{ required: 'Este campo es requerido' }}
        render={({ field: { value, onChange } }) => (
          <Input
            className="sm:col-span-2"
            label="Formación/Profesión"
            labelPlacement="outside"
            radius="sm"
            placeholder="Biólogo, Ingeniero, etc."
            value={value || ''}
            onValueChange={onChange}
            isInvalid={methods.formState.errors.job !== undefined}
            errorMessage={methods.formState.errors.job?.message as string}
          />
        )}
      />
      <Controller
        control={methods.control}
        name="institution"
        rules={{ required: 'Este campo es requerido' }}
        render={({ field: { value, onChange } }) => (
          <Input
            className="sm:col-span-2"
            label="Institución"
            labelPlacement="outside"
            radius="sm"
            placeholder="Escriba el nombre de la institución"
            value={value || ''}
            onValueChange={onChange}
            isInvalid={methods.formState.errors.institution !== undefined}
            errorMessage={
              methods.formState.errors.institution?.message as string
            }
          />
        )}
      />
    </>
  )
}
