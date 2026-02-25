/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
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

  const title = defaultData?.id ? 'Editar coorganizador' : 'Nuevo coorganizador'
  const subtitle = defaultData?.id
    ? 'Edita los datos del coorganizador'
    : 'Añade un nuevo coorganizador'

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <main className="w-full">
            <HeaderSection
              title={title}
              subtitle={subtitle}
            />
          </main>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
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
                    placeholder="Escribe el nombre del coorganizador"
                    className={methods.formState.errors.name ? 'border-destructive' : ''}
                  />
                )}
              />
              {methods.formState.errors.name && (
                <p className="text-xs text-destructive">{methods.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Imagen</Label>
              <FilePond
                allowMultiple={false}
                acceptedFileTypes={['image/*']}
                files={files}
                onupdatefiles={handleUpdateFiles}
                labelIdle='Arrastra y suelta tu imagen o <span class="filepond--label-action"> busca </span>'
                required={defaultData?.id ? false : true}
              />
            </div>

            <footer className="flex gap-3 justify-end pt-4">
              <Button
                variant="ghost"
                onClick={handleOpenChange}
                type="button"
              >
                Cancelar
              </Button>
              <Button
                variant="default"
                type="submit"
                disabled={loading || loadFile}
              >
                {loading || loadFile ? 'Procesando...' : (defaultData?.id ? 'Actualizar' : 'Guardar')}
              </Button>
            </footer>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
