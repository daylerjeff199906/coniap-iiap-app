'use client'
import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import {
  InfoRoom,
  MoreDescription,
  ProgramSection,
  SummarySection,
} from './sections'
import { IEvent, IEventRes } from '@/types'

import { useEvents } from '@/hooks/admin'
import { LoadingPages, ModalAction } from '@/components'
import Link from 'next/link'

interface IProps {
  dataDefault?: IEvent
}

export const FrmEventEditor = (props: IProps) => {
  const { dataDefault } = props
  const [isOpen, setOpen] = useState(false)

  const router = useRouter()
  const { createDataEvent, updateDataEvent, loading } = useEvents()

  const methods = useForm<IEvent>({
    defaultValues: {
      ...dataDefault,
      program_name: dataDefault?.program?.id
        ? `${dataDefault?.program?.id} - ${dataDefault?.program?.title} - ${dataDefault?.program?.date}`
        : '',
      summary_name: dataDefault?.summary?.id
        ? `${dataDefault?.summary?.id} - ${dataDefault?.summary?.title}`
        : '',
      sala_name: dataDefault?.sala?.name || '',
    },
  })

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IEvent> = async (data: IEvent) => {
    setOpen(false)
    const {
      program,
      summary,
      program_name,
      summary_name,
      sala_name,
      ...resData
    } = data
    const newData: IEventRes = {
      ...resData,
      banner: '',
      program_id: data.program?.id || null,
      summary_id: data.summary?.id || null,
      date: data.date || null,
      sala: data?.sala?.id || null,
      shortDescription: data.shortDescription || '',
      customContent: data.customContent || '',
      isActived: false,
    }

    let res: any
    if (dataDefault) {
      res = await updateDataEvent(dataDefault.id, newData)
    } else {
      res = await createDataEvent(newData)
    }

    if (res.message) {
      return null
    } else {
      resetForm()
      router.push('/admin/eventos')
    }
  }

  const resetForm = () => {
    methods.setValue('name', '')
    methods.setValue('timeStart', '')
    methods.setValue('timeEnd', '')
    methods.setValue('date', '')
    methods.setValue('shortDescription', '')
    methods.setValue('customContent', '')
  }

  return (
    <>
      <FormProvider {...methods}>
        <main className="flex">
          <form
            className="flex flex-col gap-3 max-w-3xl w-full relative h-screen overflow-y-auto max-h-[calc(100vh-6rem)]"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <h1 className="text-2xl font-bold">Agregar Evento</h1>
            <div className="grid grid-cols-1 gap-5">
              <ProgramSection />
              <SummarySection />
              <InfoRoom />
            </div>
            <MoreDescription />
            <footer className="flex items-center gap-2 justify-end sticky bottom-0 bg-white p-4 border-t border-gray-100">
              <Button
                color="primary"
                type="submit"
                isLoading={loading}
                isDisabled={loading}
                radius="sm"
                className="button-dark"
              >
                Agregar evento
              </Button>
              <Button
                as={Link}
                href="/admin/eventos"
                radius="sm"
              >
                Cancelar
              </Button>
            </footer>
          </form>
        </main>
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
