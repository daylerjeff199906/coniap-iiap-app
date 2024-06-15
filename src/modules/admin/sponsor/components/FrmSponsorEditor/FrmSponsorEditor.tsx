/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Input,
  Button,
} from '@nextui-org/react'
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { FilePond } from 'react-filepond'

import { ISponsor } from '@/types'
import { useSponsors } from '@/hooks/admin'
import { useFiles } from '@/hooks/admin'

import { useRouter } from 'next/navigation'
import { HeaderSection } from '@/modules/core'
interface IProps {
  defaultData?: ISponsor
}

export const FrmSponsorEditor = (props: IProps) => {
  const { defaultData } = props

  const { createDataSponsor, updateDataSponsor, loading } = useSponsors()
  const { uploadImage, editField, loading: loadFile } = useFiles()
  const router = useRouter()

  const [files, setFiles] = useState([])

  const methods = useForm<ISponsor>({
    defaultValues: defaultData,
  })

  const handleUpdateFiles = (fileItems: any) => {
    setFiles(fileItems.map((fileItem: any) => fileItem.file))
  }

  const onSubmit: SubmitHandler<ISponsor> = async (data: ISponsor) => {
    if (defaultData?.id) {
      await updateDataSponsor(defaultData?.id, data)
      if (files.length > 0) {
        const url = await uploadImage('sponsors', files[0])
        await editField(defaultData?.id, 'sponsors', 'image', url)
      }
    } else {
      const newData = {
        ...data,
        image: '',
        isActived: false,
      }
      const sponsor: ISponsor = await createDataSponsor(newData)
      if (sponsor && files.length > 0) {
        const url = await uploadImage('sponsors', files[0])
        await editField(sponsor.id, 'sponsors', 'image', url)
      }
    }
    handleOpenChange()
  }

  const handleOpenChange = () => {
    router.push('/admin/sponsors')
  }

  return (
    <>
      <Modal
        isOpen
        onOpenChange={handleOpenChange}
        size="3xl"
      >
        <ModalContent>
          <ModalHeader>
            <main className="w-full">
              <HeaderSection
                title={
                  defaultData?.id ? 'Editar colaborador' : 'Nuevo colaborador'
                }
                subtitle={
                  defaultData?.id
                    ? 'Edita los datos del colaborador'
                    : 'Añade un nuevo colaborador'
                }
              />
            </main>
          </ModalHeader>
          <ModalBody>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Controller
                  control={methods.control}
                  name="name"
                  rules={{ required: 'Este campo es requerido' }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      aria-label="Nombre del colaborador"
                      label="Nombre"
                      labelPlacement="outside"
                      radius="sm"
                      placeholder="Escribe el nombre del colaborador"
                      value={value}
                      onValueChange={onChange}
                      isInvalid={methods.formState.errors.name !== undefined}
                      errorMessage={methods.formState.errors.name?.message}
                    />
                  )}
                />
                <p className="mt-4 mb-2 text-sm">Imagen</p>
                <FilePond
                  allowMultiple={false}
                  acceptedFileTypes={['image/*']}
                  files={files}
                  onupdatefiles={handleUpdateFiles}
                  labelIdle='Arrastra y suelta tu imagen o <span class="filepond--label-action"> busca </span>'
                  required={defaultData?.id ? false : true}
                />
                <footer className="flex gap-3 justify-end pt-4 pb-4">
                  <Button
                    color="primary"
                    type="submit"
                    isDisabled={loading || loadFile}
                    isLoading={loading || loadFile}
                  >
                    {defaultData?.id ? 'Actualizar' : 'Guardar'}
                  </Button>
                  <Button onPress={handleOpenChange}>Cancelar</Button>
                </footer>
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
