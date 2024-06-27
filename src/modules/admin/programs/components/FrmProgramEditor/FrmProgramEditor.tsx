'use client'
import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { InfoGeneral } from './sections'
import { IProgram } from '@/types'

import { usePrograms } from '@/hooks/admin'
import { LoadingPages, ModalAction } from '@/components'
import Link from 'next/link'
import { HeaderSection } from '@/modules/core'
// import { toast } from 'sonner'

interface IProps {
  program?: IProgram
}

export const FrmProgramEditor = (props: IProps) => {
  const [isOpen, setOpen] = useState(false)

  const router = useRouter()
  const { program } = props
  const { addProgram, loading, updateDataProgram } = usePrograms()

  const methods = useForm<IProgram>({
    defaultValues: program,
  })

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
    const res = program?.id
      ? await updateDataProgram(program?.id, newData)
      : await addProgram(newData)
    if (res.message) {
      return null
    } else {
      router.push('/admin/programas')
    }
    resetForm()
  }

  const resetForm = () => {
    methods.setValue('title', '')
    methods.setValue('shortDescription', '')
    methods.setValue('date', '')
  }

  const title = program?.id ? 'Editar Programa' : 'Crear Programa'

  return (
    <main className="flex flex-col gap-5 w-full max-w-5xl border p-4">
      <HeaderSection
        title={title}
        subtitle="Un programa hace referencia a un conjunto de eventos que se realizan en una fecha determinada."
      />
      <FormProvider {...methods}>
        <form
          className="space-y-3"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <InfoGeneral />
          <div className="flex items-center gap-4 justify-end">
            <Button
              color="primary"
              type="submit"
              isLoading={loading}
              isDisabled={loading}
            >
              Guardar
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
        title={'Confirmación'}
        message={'¿Estás seguro de que deseas guardar los cambios?'}
        onPress={methods.handleSubmit(handleFormSubmit)}
      />
      <LoadingPages isOpen={loading} />
    </main>
  )
}
