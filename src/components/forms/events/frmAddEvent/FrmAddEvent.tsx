'use client'
import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'

import { InfoGeneral, MoreDescription, MoreInfo } from './sections'
import { IEvent } from '@/types'

import { useEvents } from '@/hooks/admin'
import { toast } from 'sonner'
import { ModalAction } from '@/components'

export const FrmAddEvent = () => {
  const [isOpen, setOpen] = useState(false)
  const { createEvent } = useEvents()
  const methods = useForm<IEvent>()
  const onSubmit = () => {
    setOpen(true)
  }

  const handleOnSubmit: SubmitHandler<IEvent> = (data: IEvent) => {
    createEvent(data)
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
          <div className="flex items-center gap-4 justify-end">
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
      <ModalAction
        isOpen={isOpen}
        setOpen={setOpen}
        title="Agregar evento"
        message="¿Estás seguro de agregar este evento?"
        onPress={() => {}}
      />
    </>
  )
}
