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
import { HeaderSection } from '@/modules/core'

const typePerson = [
  { value: 'speaker', label: 'Ponente' },
  { value: 'speaker_mg', label: 'Ponente Magistral' },
  { value: 'participant', label: 'Paricipante' },
]

interface IProps {
  dataDefault?: IPerson
}

export const FrmParticipantEditor = (props: IProps) => {
  const [isOpen, setOpen] = useState(false)
  const [file, setFile] = useState([])

  const { dataDefault } = props
  const methods = useForm<IPerson>({
    defaultValues: dataDefault,
  })

  const { addPerson, updatePersonData, loading } = usePersons()
  const { editField, loading: loadFile, uploadImage } = useFiles()
  const router = useRouter()

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IPerson> = async (data: IPerson) => {
    setOpen(false)

    const { imageFile, ...rest } = data

    const newData: IPerson = {
      ...rest,
      image: dataDefault?.id ? dataDefault.image : '',
      isActived: dataDefault?.id ? dataDefault.isActived : false,
    }

    if (dataDefault?.id) {
      const speaker = await updatePersonData(dataDefault.id, newData)
      if (speaker && file.length > 0) {
        const url = await uploadImage('speaker', file[0])
        await editField(dataDefault.id, 'persons', 'image', url)
      }
    } else {
      const speaker: IPerson = await addPerson(newData)
      if (speaker && file.length > 0) {
        const url = await uploadImage('speaker', file[0])
        await editField(String(speaker.id), 'persons', 'image', url)
      }
    }
    router.back()
  }

  const handleBack = () => {
    router.back()
  }

  const title = dataDefault?.id ? 'Editar datos' : 'Agregar participante'
  const subtitle = dataDefault?.id
    ? 'Edita los datos del participante'
    : 'Agrega un nuevo participante'

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="space-y-4 max-w-3xl border border-gray-200 p-4 rounded-lg w-full"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <HeaderSection
            title={title}
            subtitle={subtitle}
          />
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
                  aria-label="select"
                  label="Tipo de participante"
                  labelPlacement="outside"
                  placeholder="Selecciona un tipo de participante"
                  defaultSelectedKeys={['participant']}
                  selectedKeys={[value] || ['participant']}
                  onSelectionChange={(value) => {
                    const newValue = Object.values(value)[0]
                    onChange(newValue)
                  }}
                  disallowEmptySelection
                  radius="sm"
                  isInvalid={methods.formState.errors.typePerson !== undefined}
                  errorMessage={
                    methods.formState.errors.typePerson?.message as string
                  }
                >
                  {typePerson.map((item) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </SelectItem>
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
              radius="sm"
            >
              Guardar
            </Button>
            <Button
              type="reset"
              onPress={handleBack}
              radius="sm"
            >
              Cancelar
            </Button>
          </footer>
        </form>
      </FormProvider>
      <ModalAction
        isOpen={isOpen}
        setOpen={setOpen}
        title="Guardar cambios"
        message="¿Estás seguro de guardar los cambios?"
        onPress={methods.handleSubmit(handleFormSubmit)}
      />
      <LoadingPages isOpen={loading || loadFile} />
    </>
  )
}
