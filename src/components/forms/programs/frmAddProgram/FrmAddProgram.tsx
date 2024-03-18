'use client'
import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { InfoGeneral } from './sections'
import { IProgram } from '@/types'

import { useEvents } from '@/hooks/admin'
import { toast } from 'sonner'
import { ModalAction } from '@/components'
import Link from 'next/link'

export const FrmAddProgram = () => {
  const [isOpen, setOpen] = useState(false)

  const router = useRouter()
  const { createEvent, loading } = useEvents()

  const methods = useForm<IProgram>()

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

  const handleFormSubmit: SubmitHandler<IProgram> = (data: IProgram) => {
    setOpen(false)
    const newData = {
      ...data,
      place: '',
      banner: '',
      images: [],
      salaId: '',
      idProgram: '',
      isActived: false,
      idTypeEvent: '',
    }
    // createEvent(newData)
    //   .then(() => {
    //     toast.success('Evento creado')
    //     router.push('/admin/eventos')
    //   })
    //   .catch(() => {
    //     toast.error('Error al crear evento')
    //   })
    // resetForm()
  }

  const resetForm = () => {}

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="space-y-3"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-bold">Agregar Programa</h1>
          <InfoGeneral />
          {/* <MoreInfo /> */}
          {/* <MoreDescription /> */}
          <div className="flex items-center gap-4 justify-end">
            <Button
              color="primary"
              type="submit"
              isLoading={loading}
              isDisabled={loading}
            >
              Agregar Programa
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
        title="Crear programa"
        message="¿Estás seguro de crear este programa?"
        onPress={methods.handleSubmit(handleFormSubmit)}
      />
    </>
  )
}
