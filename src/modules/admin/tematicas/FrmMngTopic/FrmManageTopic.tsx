/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Input,
  Button,
  Textarea,
} from '@nextui-org/react'
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { FilePond } from 'react-filepond'

import { ITopic } from '@/types'
import { useTopics } from '@/hooks/admin'
import { useFiles } from '@/hooks/admin'
import { Loading } from './loading'

import { useRouter } from 'next/navigation'
interface IProps {
  dataDefault?: ITopic
}

export const FrmManageTopic = (props: IProps) => {
  const { dataDefault } = props

  const { creatTopic, updateDataTopic, topic, loading } = useTopics()
  const {
    uploadImage,
    editField,
    deleteImage,
    loading: fileLoading,
  } = useFiles()

  const router = useRouter()

  const [files, setFiles] = useState([])

  const methods = useForm<ITopic>({
    defaultValues: dataDefault,
  })

  const handleUpdateFiles = (fileItems: any) => {
    setFiles(fileItems.map((fileItem: any) => fileItem.file))
  }

  const onSubmit: SubmitHandler<ITopic> = async (data: ITopic) => {
    if (dataDefault?.id) {
      const res = await updateDataTopic(dataDefault?.id, data)
      if (files.length > 0) {
        await deleteImage(topic?.image as string)
        const url = await uploadImage('topics', files[0])
        await editField(dataDefault?.id, 'topics', 'image', url)
      }
      if (res) {
        router.push('/admin/tematicas')
      }
    } else {
      const newData = {
        ...data,
        image: '',
        isActived: false,
      }
      const dataTopic: ITopic = await creatTopic(newData)
      if (dataTopic && files.length > 0) {
        const url = await uploadImage('topics', files[0])
        await editField(dataTopic.id, 'topics', 'image', url)
        new Promise((resolve) => setTimeout(resolve, 2000))
      }
      handleExit()
    }
  }

  const handleExit = () => {
    methods.reset()
    setFiles([])
    router.push('/admin/tematicas')
  }

  return (
    <>
      <Modal
        isOpen
        onOpenChange={handleExit}
        size="3xl"
      >
        <ModalContent>
          <ModalHeader>
            {dataDefault?.id ? 'Editar Tema' : 'Agregar Tema'}
          </ModalHeader>
          <ModalBody>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                {loading || fileLoading ? (
                  <>
                    <Loading />
                  </>
                ) : (
                  <>
                    <Controller
                      control={methods.control}
                      name="name"
                      rules={{ required: 'Este campo es requerido' }}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          aria-label="Nombre del TENA"
                          label="Nombre"
                          labelPlacement="outside"
                          radius="sm"
                          placeholder="Escribe el nombre del tema"
                          value={value}
                          onValueChange={onChange}
                          isInvalid={
                            methods.formState.errors.name !== undefined
                          }
                          errorMessage={methods.formState.errors.name?.message}
                        />
                      )}
                    />
                    <Controller
                      control={methods.control}
                      name="description"
                      // rules={{ required: 'Este campo es requerido' }}
                      render={({ field: { onChange, value } }) => (
                        <Textarea
                          aria-label="Descripción del colaborador"
                          label="Descripción"
                          labelPlacement="outside"
                          radius="sm"
                          placeholder="Escribe la descripción del colaborador"
                          value={value}
                          onValueChange={onChange}
                          className="pt-4"
                          isInvalid={
                            methods.formState.errors.description !== undefined
                          }
                          errorMessage={
                            methods.formState.errors.description?.message
                          }
                        />
                      )}
                    />
                    <Controller
                      control={methods.control}
                      name="color"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          aria-label="Descripción del colaborador"
                          label="Color del tema"
                          labelPlacement="outside"
                          radius="sm"
                          placeholder="Selecciona un color"
                          description="Selecciona un color o escribe el código hexadecimal"
                          value={value}
                          type="color"
                          onValueChange={onChange}
                          className="pt-4"
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
                      // required={id ? false : true}
                    />
                  </>
                )}
                <footer className="flex gap-3 justify-end pt-4 pb-4">
                  <Button
                    color="primary"
                    type="submit"
                    isDisabled={loading || fileLoading}
                    isLoading={loading || fileLoading}
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
    </>
  )
}
