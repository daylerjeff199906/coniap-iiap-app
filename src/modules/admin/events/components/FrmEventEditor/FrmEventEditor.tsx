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
      program_name:
        dataDefault?.program?.title + ' - ' + dataDefault?.date || '',
      summary_name:
        dataDefault?.summary?.person?.name +
        ' - ' +
        dataDefault?.summary?.person?.surName,
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
        <form
          className="space-y-3 max-w-3xl"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-bold">Agregar Evento</h1>
          <div className="grid grid-cols-1 gap-5">
            <ProgramSection />
            <SummarySection />
            <InfoRoom />
          </div>
          <MoreDescription />
          <div className="flex items-center gap-4 justify-end">
            <Button
              color="primary"
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
