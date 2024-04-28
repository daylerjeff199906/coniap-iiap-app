'use client'
import { UploadFile } from '@/modules/user'
import { Controller, useForm, FormProvider } from 'react-hook-form'
import { ISummary } from '@/types'
import { Input } from '@nextui-org/react'

export const FrmUploadSummary = () => {
  const methods = useForm<ISummary>()

  return (
    <>
      <FormProvider {...methods}>
        <form className="flex flex-col gap-4 w-full sm:w-1/2">
          <Controller
            name="title"
            control={methods.control}
            rules={{ required: 'Este campo es requerido' }}
            render={({ field: { value, onChange } }) => (
              <Input
                aria-label="Título"
                label="Título"
                labelPlacement="outside"
                placeholder='Ejemplo: "Resumen de la conferencia"'
                radius="sm"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <UploadFile />
        </form>
      </FormProvider>
    </>
  )
}
