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
import { IconPdf } from '@tabler/icons-react'

import { InfoGeneralSection, MultimediasSection } from './sections'

import { LoadingPages, ModalAction } from '@/components'
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

  console.log(speaker)

  const onSubmit = () => {
    setOpenConfirm(true)
  }
  const searchParams = useSearchParams()
  const router = useRouter()

  const id = searchParams.get('edit') || ''

  const handleSave: SubmitHandler<IPerson> = async (data: IPerson) => {
    setOpenConfirm(false)
    const res = await updatePersonData(id, data)
    if (res.message) {
      return
    } else {
      clearForm()
      router.back()
    }
  }

  const handleBack = () => {
    router.back()
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
          className="flex flex-col gap-2 sm:gap-4 lg:gap-5 max-w-3xl"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
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
                  onChange={(value) => {
                    onChange(value)
                  }}
                  size="sm"
                  radius="sm"
                  disallowEmptySelection
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
          <InfoGeneralSection />
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
              type="reset"
              onPress={handleBack}
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

{
  /* <div className="py-4">
                {speaker?.file_resumen && (
                  <Button
                    as={Link}
                    href={speaker.file_resumen}
                    target="_blank"
                    fullWidth
                    size="sm"
                    radius="sm"
                    color="danger"
                    startContent={<IconPdf size={20} />}
                  >
                    Visualizar resumen
                  </Button>
                )}
              </div> */
}
