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

  // id: string
  // name: string
  // timeStart: string
  // timeEnd: string
  // date?: string
  // shortDescription?: string
  // place: string
  // banner?: string
  // image: string[]
  // salas: string
  // linkZoom?: string
  // linkYoutube?: string
  // linkFacebook?: string
  // customContent?: string
  // body?: string
  // idProgram?: string
  // inProgram?: boolean
  // idTypeEvent?: string

  const handleFormSubmit: SubmitHandler<IEvent> = (data: IEvent) => {
    setOpen(false)
    const newData = {
      ...data,
      place: '',
      banner: '',
      images: [],
      salaId: '',
      customContent: data.customContent || '',
      idProgram: '',
      inProgram: data.idProgram ? true : false,
      idTypeEvent: '',
    }
    // createEvent(data)
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
        onPress={methods.handleSubmit(handleFormSubmit)}
      />
    </>
  )
}
