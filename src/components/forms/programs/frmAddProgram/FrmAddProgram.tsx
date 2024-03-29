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
  const { addProgram, loading } = usePrograms()

  const methods = useForm<IProgram>()

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IProgram> = async (data: IProgram) => {
    setOpen(false)
    const newData = {
      ...data,
      banner: '',
      isActived: false,
    }
    const res = await addProgram(newData)
    if (res) {
      router.push('/admin/programas')
    } else {
      toast.error('Error al crear programa')
    }
    resetForm()
  }

  const resetForm = () => {
    methods.setValue('title', '')
    methods.setValue('shortDescription', '')
    methods.setValue('date', '')
  }

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
