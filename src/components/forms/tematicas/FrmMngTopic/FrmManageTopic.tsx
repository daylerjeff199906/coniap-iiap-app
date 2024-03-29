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

import { ISpeaker, ITopic } from '@/types'
import { useTopics } from '@/hooks/admin'
import { useFiles } from '@/hooks/admin'
import { Loading } from './loading'

import { useRouter } from 'next/navigation'
interface IProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  id?: string | null
  loadData?: (value: boolean) => void
}

export const FrmManageTopic = (props: IProps) => {
  const { isOpen, onOpenChange, id, loadData } = props

  const { creatTopic, updateDataTopic, getTopicById, topic, loading } =
    useTopics()
  const {
    uploadImage,
    editField,
    deleteImage,
    loading: fileLoading,
  } = useFiles()
  const router = useRouter()

  const [files, setFiles] = useState([])

  const methods = useForm<ITopic>()

  const handleUpdateFiles = (fileItems: any) => {
    setFiles(fileItems.map((fileItem: any) => fileItem.file))
  }

  const onSubmit: SubmitHandler<ITopic> = async (data: ITopic) => {
    if (id) {
      await updateDataTopic(id, data)
      if (files.length > 0) {
        await deleteImage('topics', topic?.image as string)
        const url = await uploadImage('topics', files[0])
        await editField(id, 'topics', 'image', url)
      }
    } else {
      const newData = {
        ...data,
        image: '',
        isActived: false,
      }
      const dataSpeaker: ISpeaker = await creatTopic(newData)
      if (dataSpeaker && files.length > 0) {
        console.log('Se guardara imagen')
        const url = await uploadImage('topics', files[0])
        await editField(dataSpeaker.id, 'topics', 'image', url)
        new Promise((resolve) => setTimeout(resolve, 2000))
      }
    }
    handleOpenChange(false)
    loadData && loadData(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    loadData && loadData(false)
  }

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open)
    methods.reset()
    setFiles([])
    if (id) {
      router.push('/admin/tematicas')
    }
  }

  useEffect(() => {
    if (id) {
      getTopicById(id)
    }
  }, [id])

  useEffect(() => {
    if (topic) {
      methods.reset(topic)
    }
  }, [topic])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        size="3xl"
      >
        <ModalContent>
          <ModalHeader>{id ? 'Editar Tema' : 'Agregar Tema'}</ModalHeader>
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
                          aria-label="Nombre del colaborador"
                          label="Nombre"
                          labelPlacement="outside"
                          radius="sm"
                          placeholder="Escribe el nombre del colaborador"
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
                    {id ? 'Actualizar' : 'Guardar'}
                  </Button>
                  <Button onPress={() => handleOpenChange(false)}>
                    Cancelar
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
