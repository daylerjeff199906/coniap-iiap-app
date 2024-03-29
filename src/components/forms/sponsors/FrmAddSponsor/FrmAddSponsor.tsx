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
import { Loading } from './loading'

import { useRouter } from 'next/navigation'
interface IProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  id?: string | null
  loadData?: (value: boolean) => void
}

export const FrmAddSponsor = (props: IProps) => {
  const { isOpen, onOpenChange, id, loadData } = props

  const {
    createDataSponsor,
    updateDataSponsor,
    getSponsorById,
    sponsor,
    loading,
  } = useSponsors()
  const { uploadImage, editField, loading: loadFile } = useFiles()
  const router = useRouter()

  const [files, setFiles] = useState([])

  const methods = useForm<ISponsor>()

  const handleUpdateFiles = (fileItems: any) => {
    setFiles(fileItems.map((fileItem: any) => fileItem.file))
  }

  const onSubmit: SubmitHandler<ISponsor> = async (data: ISponsor) => {
    if (id) {
      await updateDataSponsor(id, data)
      if (files.length > 0) {
        const url = await uploadImage('sponsors', files[0])
        await editField(id, 'sponsors', 'image', url)
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
      router.push('/admin/sponsors')
    }
  }

  useEffect(() => {
    if (id) {
      getSponsorById(id)
    }
  }, [id])

  useEffect(() => {
    if (sponsor) {
      methods.reset(sponsor)
    }
  }, [sponsor])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        size="3xl"
      >
        <ModalContent>
          <ModalHeader>
            {id ? 'Editar Colaborador' : 'Agregar Colaborador'}
          </ModalHeader>
          <ModalBody>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                {loading || loadFile ? (
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
                    <p className="mt-4 mb-2 text-sm">Imagen</p>
                    <FilePond
                      allowMultiple={false}
                      acceptedFileTypes={['image/*']}
                      files={files}
                      onupdatefiles={handleUpdateFiles}
                      labelIdle='Arrastra y suelta tu imagen o <span class="filepond--label-action"> busca </span>'
                      required={id ? false : true}
                    />
                  </>
                )}
                <footer className="flex gap-3 justify-end pt-4 pb-4">
                  <Button
                    color="primary"
                    type="submit"
                    isDisabled={loading || loadFile}
                    isLoading={loading || loadFile}
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
