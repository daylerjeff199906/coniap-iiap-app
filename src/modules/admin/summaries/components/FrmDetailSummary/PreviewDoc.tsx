'use client'
import { ISummary } from '@/types'
import { useFormContext } from 'react-hook-form'
import { getFileType } from '../../functions'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { IconDownload } from '@tabler/icons-react'
import { cleanFilePath } from '../../functions'

export const PreviewDoc = () => {
  const { watch } = useFormContext<ISummary>()
  const value = watch('file')

  const fileType = getFileType(value)

  return (
    <section className="w-full h-full">
      {value && (
        <section className="flex items-center gap-4 justify-between px-4 py-2 bg-white border-l-8 border-primary-500 rounded-sm">
          <div>
            <h3 className="text-xs font-medium">
              ARCHIVO:
              {value && (
                <span className="text-sm font-semibold text-gray-800">
                  {' '} {cleanFilePath(value)}
                </span>
              )}
            </h3>
            <p className="text-tiny text-gray-500">
              Si el archivo no se visualiza correctamente, descárgalo y ábrelo
            </p>
          </div>
          <div>
            <Button
              as={Link}
              href={value || '#'} // This is the only difference
              download={value ? 'file' : ''} // This is the only difference
              isDisabled={!value}
              radius="sm"
              size="sm"
              color="primary"
              variant="light"
              endContent={
                <IconDownload
                  stroke={1.5}
                  size={16}
                />
              }
            >
              Descargar
            </Button>
          </div>
        </section>
      )}
      {value && fileType === 'pdf' && (
        <iframe
          src={value}
          width="100%"
          className="h-screen max-h-[calc(100vh-11rem)]"
          title="PDF file"
        ></iframe>
      )}
      {value && fileType === 'word' && (
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            value
          )}`}
          width="100%"
          className="h-screen max-h-[calc(100vh-11rem)]"
          title="Word file"
        ></iframe>
      )}
      {!value && (
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-gray-500">No hay documento para mostrar</p>
        </div>
      )}
    </section>
  )
}
