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
interface IProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const FrmAddSponsor = (props: IProps) => {
  const { isOpen, onOpenChange } = props
  const { createSponsor } = useSponsors()
  const { uploadImage, editField } = useFiles()

  const [files, setFiles] = useState([])

  const methods = useForm<ISponsor>()

  const handleUpdateFiles = (fileItems: any) => {
    setFiles(fileItems.map((fileItem: any) => fileItem.file))
  }

  const onSubmit: SubmitHandler<ISponsor> = async (data: ISponsor) => {
    const newData = {
      ...data,
      image: '',
      isActive: false,
    }
    const idSpeaker = await createSponsor(newData)
    if (idSpeaker !== null && files.length > 0) {
      const url = await uploadImage('sponsors', files[0])
      await editField(idSpeaker, 'sponsors', 'image', url)
    }
  }

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open)
    methods.reset()
    setFiles([])
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        size="3xl"
      >
        <ModalContent>
          <ModalHeader>Añadir colaborador</ModalHeader>
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
                  required
                />
                <footer className="flex justify-end pt-4 pb-4">
                  <Button
                    color="primary"
                    type="submit"
                  >
                    Guardar
                  </Button>
                </footer>
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
