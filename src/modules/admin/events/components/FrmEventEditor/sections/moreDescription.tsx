'use client'
import '@mdxeditor/editor/style.css'
import { Controller, useFormContext } from 'react-hook-form'
import { IEvent } from '@/types'
import { useRef } from 'react'
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

export const MoreDescription = () => {
  const { control } = useFormContext<IEvent>()
  const ref = useRef<MDXEditorMethods>(null)

  return (
    <section className="grid grid-cols-1 gap-4">
      <div className="min-h-72 section-admin">
        <h1 className="text-gray-400">Personalizar contenido</h1>

        <Controller
          control={control}
          name="customContent"
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
      </div>
    </section>
  )
}
