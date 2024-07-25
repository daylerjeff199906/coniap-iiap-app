/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Button,
} from '@nextui-org/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { ISala } from '@/types'
import { useSalas } from '@/hooks/admin'

import { useRouter } from 'next/navigation'
import { HeaderSection } from '@/modules/core'
import { InfoData, PlatformData } from './sections'
import { toast } from 'react-toastify'

interface IProps {
  dataDefault?: ISala
}

export const FrmRoomEditor = (props: IProps) => {
  const { dataDefault } = props

  const { createRoom, updateRoom, loading } = useSalas()

  const router = useRouter()

  const methods = useForm<ISala>({
    defaultValues: dataDefault,
  })

  const onSubmit: SubmitHandler<ISala> = async (data: ISala) => {
    const res = dataDefault?.id
      ? await updateRoom(dataDefault.id, data)
      : await createRoom(data)

    if (res instanceof Error) {
      toast.error(
        <CustomToast
          title="Error"
          description={res.message}
        />
      )
    } else {
      toast.success(
        <CustomToast
          title="Éxito"
          description={`Sala  ${dataDefault?.id ? 'actualizada' : 'creada'}`}
        />
      )
      router.push('/admin/eventos/salas')
    }
  }

  const title = dataDefault?.id ? 'Editar sala' : 'Agregar sala'
  const description = dataDefault?.id
    ? 'Edita la información de la sala'
    : 'Agrega una nueva sala'

  const handleExit = () => {
    methods.reset()
    router.push('/admin/eventos/salas')
  }

  return (
    <Modal
      isOpen
      onOpenChange={handleExit}
      size="xl"
    >
      <ModalContent>
        <ModalHeader>
          <header className="w-full">
            <HeaderSection
              title={title}
              subtitle={description}
            />
          </header>
        </ModalHeader>
        <ModalBody>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <PlatformData />
              <InfoData />
              <footer className="flex gap-3 justify-end pt-4 pb-4">
                <Button
                  color="primary"
                  type="submit"
                  isDisabled={loading}
                  isLoading={loading}
                  radius="sm"
                >
                  {dataDefault?.id ? 'Actualizar' : 'Guardar'}
                </Button>
                <Button
                  onPress={handleExit}
                  radius="sm"
                >
                  Cancelar
                </Button>
              </footer>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

interface IPropsToast {
  title: string
  description: string
}

const CustomToast = (props: IPropsToast) => {
  const { title, description } = props
  return (
    <div className="flex flex-col">
      <h2 className="text-sm">{title}</h2>
      <p className="text-tiny text-gray-200">{description}</p>
    </div>
  )
}
