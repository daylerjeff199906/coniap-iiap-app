'use client'
import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import {
  InfoGeneral,
  MoreDescription,
  MoreInfo,
  SectionSpeaker,
} from './sections'
import { IEvent } from '@/types'

import { useEvents } from '@/hooks/admin'
import { toast } from 'sonner'
import { LoadingPages, ModalAction } from '@/components'
import Link from 'next/link'

export const FrmAddEvent = () => {
  const [isOpen, setOpen] = useState(false)

  // const router = useRouter()
  const { createDataEvent, loading } = useEvents()

  const methods = useForm<IEvent>()

  const onSubmit: SubmitHandler<IEvent> = (data: IEvent) => {
    console.log(data)
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IEvent> = async (data: IEvent) => {
    setOpen(false)
    const newData = {
      ...data,
      banner: '',
      shortDescription: data.shortDescription || '',
      customContent: data.customContent || '',
      linkZoom: data.linkZoom || '',
      linkYoutube: data.linkYoutube || '',
      linkFacebook: data.linkFacebook || '',
      isActived: false,
    }
    console.log(newData)
    // const res = await createDataEvent(newData)
    // console.log(res)
    // // if (!res) {
    // //   toast.error('Error al crear el evento')
    // // } else {
    // //   toast.success('Evento creado con exito')
    // //   router.push('/admin/eventos')
    // // }

    resetForm()
  }

  const resetForm = () => {
    methods.setValue('name', '')
    methods.setValue('timeStart', '')
    methods.setValue('timeEnd', '')
    methods.setValue('date', '')
    methods.setValue('shortDescription', '')
    methods.setValue('linkZoom', '')
    methods.setValue('linkYoutube', '')
    methods.setValue('linkFacebook', '')
    methods.setValue('customContent', '')
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="space-y-3 max-w-3xl"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-bold">Agregar Evento</h1>
          <div className="grid grid-cols-1 gap-5">
            <SectionSpeaker />
            <InfoGeneral />
            <MoreInfo />
          </div>
          <MoreDescription />
          <div className="flex items-center gap-4 justify-end">
            <Button
              color="primary"
              // onPress={onSubmit}
              type="submit"
              isLoading={loading}
              isDisabled={loading}
            >
              Agregar evento
            </Button>
            <Button
              as={Link}
              href="/admin/eventos"
            >
              Cancelar
            </Button>
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
      <LoadingPages isOpen={loading} />
    </>
  )
}
