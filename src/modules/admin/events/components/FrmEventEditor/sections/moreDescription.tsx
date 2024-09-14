'use client'
import '@mdxeditor/editor/style.css'
import { Controller, useFormContext } from 'react-hook-form'
// import { Skeleton } from '@nextui-org/react'
// import dynamic from 'next/dynamic'

//For the text field
// const ReactQuill = dynamic(() => import('react-quill'), {
//   ssr: false,
//   loading: () => (
//     <div className="w-ful">
//       <Skeleton className="max-h-52 w-full h-52 rounded-md" />
//     </div>
//   ),
// })
import 'react-quill/dist/quill.snow.css'
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
} from '@mdxeditor/editor'

export const MoreDescription = () => {
  const { control } = useFormContext<IEvent>()
  const ref = useRef<MDXEditorMethods>(null)

  return (
    <section className="grid grid-cols-1 gap-4">
      <div className=" h-72 section-admin">
        <h1 className="text-gray-400">Personalizar contenido</h1>

        <Controller
          control={control}
          name="customContent"
          render={({ field: { value, onChange } }) => (
            <MDXEditor
              ref={ref}
              plugins={[
                toolbarPlugin({
                  toolbarContents: () => (
                    <>
                      <UndoRedo />
                      <BoldItalicUnderlineToggles />
                      <InsertTable /> {/* Plugin para insertar tablas */}
                      {/* Plugin para cambiar tamaño de fuente */}
                    </>
                  ),
                }),
                headingsPlugin(), // Plugin para manejar encabezados
                thematicBreakPlugin(), // Línea horizontal
                quotePlugin(), // Citas
                tablePlugin(),
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
