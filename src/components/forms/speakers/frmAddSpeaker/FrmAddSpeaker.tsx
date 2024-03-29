'use client'
import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { IPerson } from '@/types'
import { InfoGeneral, MultimediaSection } from './sections'
import { LoadingPages, ModalAction } from '@/components'

import { usePersons, useFiles } from '@/hooks/admin'

export const FrmAddSpeaker = () => {
  const [isOpen, setOpen] = useState(false)
  const [file, setFile] = useState([])
  const methods = useForm<IPerson>()

  const { addPerson, loading } = usePersons()
  const { editField, loading: loadFile, uploadImage } = useFiles()
  const router = useRouter()

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IPerson> = async (data: IPerson) => {
    const newData: IPerson = {
      ...data,
      image: '',
      isActived: false,
      typePerson: 'speaker',
    }
    setOpen(false)
    const speaker: IPerson = await addPerson(newData)
    if (speaker && file.length > 0) {
      const url = await uploadImage('speaker', file[0])
      await editField(speaker.id, 'persons', 'image', url)
    }

    if (speaker) {
      router.push('/admin/ponentes')
    }
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
              isDisabled={loading || loadFile}
              isLoading={loading || loadFile}
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
      <LoadingPages isOpen={loading || loadFile} />
    </>
  )
}
