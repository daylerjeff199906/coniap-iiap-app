'use client'
import { useState } from 'react'
import { ISpeaker } from '@/types'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { useSearchParams, useRouter } from 'next/navigation'

import { Button } from '@nextui-org/react'
import Link from 'next/link'

import { InfoGeneralSection, MultimediasSection } from './sections'

import { LoadingPages, ModalAction } from '@/components'
import { useSpeakers } from '@/hooks/admin'
interface IProps {
  speaker: ISpeaker
}

export const FrmEditSpeaker = (props: IProps) => {
  const { speaker } = props
  const { updateSpeaker, loading } = useSpeakers()

  const [isEditables, setIsEditables] = useState(true)
  const [openConfirm, setOpenConfirm] = useState(false)

  const methods = useForm<ISpeaker>({
    defaultValues: speaker,
  })

  const onSubmit = () => {
    setOpenConfirm(true)
  }
  const searchParams = useSearchParams()
  const router = useRouter()

  const id = searchParams.get('edit') || ''

  const handleSave: SubmitHandler<ISpeaker> = async (data: ISpeaker) => {
    setOpenConfirm(false)
    updateSpeaker(id, data)
      .then(() => {
        clearForm()
        router.push('/admin/ponentes')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const clearForm = () => {
    methods.setValue('fullName', '')
    methods.setValue('surName', '')
    methods.setValue('levelStudy', '')
    methods.setValue('institution', '')
    methods.setValue('job', '')
    methods.setValue('image', '')
    methods.setValue('presentation', '')
  }

  return (
    <>
      <header className="pb-4">
        <h2 className="text-2xl font-bold">
          {isEditables ? 'Editar ponente' : 'Detalles del ponente'}
        </h2>
      </header>
      <FormProvider {...methods}>
        <form
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-5"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="w-full col-span-1">
            <MultimediasSection />
          </div>
          <div className="w-full col-span-1 lg:col-span-2">
            <InfoGeneralSection />
          </div>
          <footer className="flex items-center gap-3 justify-end col-span-1 sm:col-span-2 lg:col-span-3">
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
              href="/admin/ponentes"
            >
              Cancelar
            </Button>
          </footer>
        </form>
      </FormProvider>
      <ModalAction
        isOpen={openConfirm}
        message="¿Estás seguro de guardar los cambios?"
        onPress={methods.handleSubmit(handleSave)}
        setOpen={setOpenConfirm}
        title="Guardar cambios"
      />
      <LoadingPages isOpen={loading} />
    </>
  )
}
