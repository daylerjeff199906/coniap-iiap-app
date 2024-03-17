'use client'
import { Button } from '@nextui-org/react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'

import { InfoGeneral, MoreDescription, MoreInfo } from './sections'
import { IEvent } from '@/types'

export const FrmAddEvent = () => {
  const methods = useForm<IEvent>()
  const onSubmit: SubmitHandler<IEvent> = (data) => {
    console.log(data)
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="space-y-3"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-bold">Agregar Evento</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InfoGeneral />
            <MoreInfo />
          </div>
          <MoreDescription />
          <div className="flex items-center gap-4">
            <Button
              color="primary"
              type="submit"
            >
              Agregar evento
            </Button>
            <Button>Cancelar</Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}
