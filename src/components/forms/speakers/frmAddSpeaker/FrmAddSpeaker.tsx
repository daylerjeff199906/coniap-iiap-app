'use client'
import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import Link from 'next/link'

import { ISpeaker } from '@/types'
import { InfoGeneral, MultimediaSection } from './sections'
import { ModalAction } from '@/components'

import { useSpeakers } from '@/hooks/admin'

export const FrmAddSpeaker = () => {
  const [isOpen, setOpen] = useState(false)
  const [file, setFile] = useState([])
  const methods = useForm<ISpeaker>()

  const { createSpeaker, uploadImage, editSpeakerField } = useSpeakers()

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<ISpeaker> = async (data: ISpeaker) => {
    const newData = {
      ...data,
      image: '',
    }
    const idSpeaker = await createSpeaker(newData)
    if (idSpeaker !== null && file.length > 0) {
      const url = await uploadImage(file[0])
      await editSpeakerField(idSpeaker, 'image', url)
    }
    // const url = await uploadImage(data.image[0], 'speakers')
    // const url = await uploadImage(data.image[0])
    setOpen(false)
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="space-y-4"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-bold">Agregar Ponente</h1>
          <div className="grid grid-cols-1 gap-4">
            <InfoGeneral />
            <MultimediaSection
              setFiles={setFile}
              files={file}
            />
          </div>
          <footer className="flex items-center justify-end gap-3">
            <Button
              type="submit"
              color="primary"
            >
              Guardar
            </Button>
            <Button
              as={Link}
              href="/admin/ponentes"
              type="reset"
            >
              Cancelar
            </Button>
          </footer>
        </form>
      </FormProvider>
      <ModalAction
        isOpen={isOpen}
        setOpen={setOpen}
        title="Agregar ponente"
        message="¿Estás seguro de agregar este ponente?"
        onPress={methods.handleSubmit(handleFormSubmit)}
      />
    </>
  )
}
