'use client'
import { useState } from 'react'
import { Button, Select, SelectItem } from '@nextui-org/react'
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { IPerson } from '@/types'
import { InfoGeneral, MultimediaSection } from './sections'
import { LoadingPages, ModalAction } from '@/components'

import { usePersons, useFiles } from '@/hooks/admin'

const typePerson = [
  { value: 'speaker', label: 'Ponente' },
  { value: 'speaker_mg', label: 'Ponente Magistral' },
  { value: 'participant', label: 'Paricipante' },
]

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
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold w-full">Agregar Participante</h1>
            <div className="max-w-sm">
              <Controller
                control={methods.control}
                name="typePerson"
                rules={{ required: 'Este campo es requerido' }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    label="Tipo de participante"
                    labelPlacement="outside"
                    name="typePerson"
                    value={value}
                    onChange={(value) => {
                      onChange(value)
                    }}
                    size="sm"
                    radius="sm"
                    isInvalid={
                      methods.formState.errors.typePerson !== undefined
                    }
                    errorMessage={
                      methods.formState.errors.typePerson?.message as string
                    }
                  >
                    {typePerson.map((item) => (
                      <SelectItem key={item.value}>{item.label}</SelectItem>
                    ))}
                  </Select>
                )}
              />
            </div>
          </div>
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
