'use client'
import '@mdxeditor/editor/style.css'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from 'react-hook-form'
import { ModalAction } from '@/components'
import { IGeneralData } from '@/types'
import { updateRowInformation } from '@/api'
import {
  BoldItalicUnderlineToggles,
  headingsPlugin,
  InsertTable,
  MDXEditor,
  MDXEditorMethods,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  tablePlugin,
  BlockTypeSelect,
  linkDialogPlugin,
  linkPlugin,
  CreateLink,
  ListsToggle,
  listsPlugin,
} from '@mdxeditor/editor'

import { toast } from 'react-toastify'

interface IProps {
  description?: string
}

export const FrmInfoGeneral = (props: IProps) => {
  const { description } = props
  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const ref = useRef<MDXEditorMethods>(null)

  const methods = useForm<IGeneralData>({
    defaultValues: {
      description,
    },
  })

  const isDirty = methods.formState.isDirty

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IGeneralData> = async (
    data: IGeneralData
  ) => {
    setOpen(false)
    setLoading(true)

    const res = await updateRowInformation('1', 'description', data.description)

    if (res) {
      toast.success('Cambios guardados correctamente')
    } else {
      toast.error('Error al guardar los cambios')
    }
    setLoading(false)
  }

  return (
    <>
      <FormProvider {...methods}>
        <main className="">
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <main>
              <Controller
                control={methods.control}
                name="description"
                render={({ field: { value, onChange } }) => (
                  <MDXEditor
                    className="custom-quill"
                    ref={ref}
                    plugins={[
                      toolbarPlugin({
                        toolbarContents: () => (
                          <>
                            <UndoRedo />
                            <BoldItalicUnderlineToggles />
                            <InsertTable /> {/* Plugin para insertar tablas */}
                            <BlockTypeSelect />
                            <CreateLink />
                            <ListsToggle /> {/* Plugin para listas */}
                            {/* Plugin para cambiar tamaño de fuente */}
                          </>
                        ),
                      }),
                      headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
                      headingsPlugin(), // Plugin para manejar encabezados
                      thematicBreakPlugin(), // Línea horizontal
                      quotePlugin(), // Citas
                      tablePlugin(),
                      linkPlugin(),
                      linkDialogPlugin(),
                      listsPlugin(),
                    ]}
                    markdown={value || ''}
                    onChange={(value) => onChange(value)}
                  />
                )}
              />
            </main>
            <footer className="flex items-center gap-2 justify-end sticky bottom-0 bg-white p-4 border-t border-gray-100">
              <Button
                
                size="sm"
                onClick={() => methods.reset({ description })}
              >
                Cancelar
              </Button>
              <Button variant="default" type="submit" size="sm" className="button-dark" disabled={loading} >
                Guardar
              </Button>
            </footer>
          </form>
        </main>
      </FormProvider>
      <ModalAction
        isOpen={isOpen}
        setOpen={setOpen}
        title="Guardar los cambios"
        message="¿Estás seguro de guardar los cambios?"
        onClick={methods.handleSubmit(handleFormSubmit)}
      />
    </>
  )
}
