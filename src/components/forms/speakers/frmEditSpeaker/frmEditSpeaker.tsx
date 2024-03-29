'use client'
import { useState } from 'react'
import { IPerson } from '@/types'
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from 'react-hook-form'
import { useSearchParams, useRouter } from 'next/navigation'

import { Button, Select, SelectItem } from '@nextui-org/react'
import Link from 'next/link'

import { InfoGeneralSection, MultimediasSection } from './sections'

import { LoadingPages, ModalAction } from '@/components'
import { useSpeakers } from '@/hooks/admin'
import { usePersons } from '@/hooks/admin/usePersons'

const typePerson = [
  { value: 'speaker', label: 'Ponente' },
  { value: 'speaker_mg', label: 'Ponente Magistral' },
  { value: 'participant', label: 'Paricipante' },
]
interface IProps {
  speaker: IPerson
}

export const FrmEditSpeaker = (props: IProps) => {
  const { speaker } = props
  const { updatePersonData, loading } = usePersons()

  const [isEditables, setIsEditables] = useState(true)
  const [openConfirm, setOpenConfirm] = useState(false)

  const methods = useForm<IPerson>({
    defaultValues: speaker,
  })

  const onSubmit = () => {
    setOpenConfirm(true)
  }
  const searchParams = useSearchParams()
  const router = useRouter()

  const id = searchParams.get('edit') || ''

  const handleSave: SubmitHandler<IPerson> = async (data: IPerson) => {
    setOpenConfirm(false)
    updatePersonData(id, data)
      .then(() => {
        clearForm()
        router.push('/admin/ponentes')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const clearForm = () => {
    methods.setValue('name', '')
    methods.setValue('surName', '')
    methods.setValue('institution', '')
    methods.setValue('email', '')
    methods.setValue('location', '')
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
            <div className="">
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
                    defaultSelectedKeys={[speaker.typePerson]}
                    onSelectionChange={onChange}
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
