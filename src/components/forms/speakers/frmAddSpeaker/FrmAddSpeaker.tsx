'use client'
import { useState } from 'react'
import { Button, Select, SelectItem } from '@nextui-org/react'
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from 'react-hook-form'
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
      await editField(String(speaker.id), 'persons', 'image', url)
    }

    if (speaker) {
      router.back()
    }
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="space-y-4 max-w-3xl"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-bold w-full">Agregar Participante</h1>
          <MultimediaSection
            setFiles={setFile}
            files={file}
          />
          <div className="pt-3">
            <Controller
              control={methods.control}
              name="typePerson"
              rules={{ required: 'Este campo es requerido' }}
              render={({ field: { onChange, value } }) => (
                <Select
                  label="Tipo de participante"
                  labelPlacement="outside"
                  placeholder="Selecciona un tipo de participante"
                  name="typePerson"
                  value={value}
                  onChange={(value) => {
                    onChange(value)
                  }}
                  radius="sm"
                  isInvalid={methods.formState.errors.typePerson !== undefined}
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
          <InfoGeneral />
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
              type="reset"
              onPress={handleBack}
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
