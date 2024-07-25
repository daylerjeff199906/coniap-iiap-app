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
    if (dataDefault?.id) {
    } else {
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
                >
                  {dataDefault?.id ? 'Actualizar' : 'Guardar'}
                </Button>
                <Button onPress={handleExit}>Cancelar</Button>
              </footer>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
