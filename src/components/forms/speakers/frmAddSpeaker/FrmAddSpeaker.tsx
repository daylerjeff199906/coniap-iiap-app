'use client'
import { ISpeaker } from '@/types'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { InfoGeneral, MultimediaSection } from './sections'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

export const FrmAddSpeaker = () => {
  const methods = useForm<ISpeaker>()

  const onSubmit: SubmitHandler<ISpeaker> = (data) => {
    console.log(data)
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="space-y-4"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-bold">Agregar Ponente</h1>
          <div className="grid grid-cols-1 gap-4">
            <InfoGeneral />
            <MultimediaSection />
          </div>
          <footer className="flex items-center justify-end gap-3">
            <Button
              type="submit"
              color="primary"
            >
              Guardar
            </Button>
            <Button
              as={Link}
              href="/admin/ponentes"
              type="reset"
            >
              Cancelar
            </Button>
          </footer>
        </form>
      </FormProvider>
    </>
  )
}
