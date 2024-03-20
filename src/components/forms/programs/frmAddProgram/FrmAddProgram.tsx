'use client'
import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { InfoGeneral } from './sections'
import { IProgram } from '@/types'

import { usePrograms } from '@/hooks/admin'
import { toast } from 'sonner'
import { LoadingPages, ModalAction } from '@/components'
import Link from 'next/link'

export const FrmAddProgram = () => {
  const [isOpen, setOpen] = useState(false)

  const router = useRouter()
  const { createProgram, loading } = usePrograms()

  const methods = useForm<IProgram>()

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IProgram> = (data: IProgram) => {
    setOpen(false)
    const newData = {
      ...data,
      banner: '',
      isActived: false,
      events: [],
    }
    createProgram(newData)
      .then(() => {
        router.push('/admin/programas')
      })
      .catch(() => {
        toast.error('Error al crear evento')
      })
    resetForm()
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
              href="/admin/programas"
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
      <LoadingPages isOpen={loading} />
    </>
  )
}
