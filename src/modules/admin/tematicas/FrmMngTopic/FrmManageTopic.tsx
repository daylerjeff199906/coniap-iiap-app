/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
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
    <Dialog open onOpenChange={handleExit}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{dataDefault?.id ? 'Editar Tema' : 'Agregar Tema'}</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            {loading || fileLoading ? (
              <Loading />
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Controller
                    control={methods.control}
                    name="name"
                    rules={{ required: 'Este campo es requerido' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="name"
                        placeholder="Escribe el nombre del tema"
                        className={methods.formState.errors.name ? 'border-destructive' : ''}
                      />
                    )}
                  />
                  {methods.formState.errors.name && (
                    <p className="text-xs text-destructive">{methods.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Controller
                    control={methods.control}
                    name="description"
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        id="description"
                        placeholder="Escribe la descripción"
                        className={methods.formState.errors.description ? 'border-destructive' : ''}
                      />
                    )}
                  />
                  {methods.formState.errors.description && (
                    <p className="text-xs text-destructive">{methods.formState.errors.description.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color del tema</Label>
                  <Controller
                    control={methods.control}
                    name="color"
                    render={({ field }) => (
                      <div className="flex gap-2 items-center">
                        <Input
                          {...field}
                          id="color"
                          type="color"
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          {...field}
                          placeholder="#000000"
                          className="flex-1"
                        />
                      </div>
                    )}
                  />
                  <p className="text-xs text-muted-foreground">Selecciona un color o escribe el código hexadecimal</p>
                </div>

                <div className="space-y-2">
                  <Label>Imagen</Label>
                  <FilePond
                    allowMultiple={false}
                    acceptedFileTypes={['image/*']}
                    files={files}
                    onupdatefiles={handleUpdateFiles}
                    labelIdle='Arrastra y suelta tu imagen o <span class="filepond--label-action"> busca </span>'
                  />
                </div>
              </>
            )}
            <footer className="flex gap-3 justify-end pt-4">
              <Button
                variant="ghost"
                onClick={handleExit}
                type="button"
              >
                Cancelar
              </Button>
              <Button
                variant="default"
                type="submit"
                disabled={loading || fileLoading}
              >
                {loading || fileLoading ? 'Procesando...' : (dataDefault?.id ? 'Actualizar' : 'Guardar')}
              </Button>
            </footer>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
