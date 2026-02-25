'use client'
import { ISummary } from '@/types'
import { useFormContext } from 'react-hook-form'
import { getFileType } from '../../functions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { IconDownload } from '@tabler/icons-react'

export const PreviewDoc = () => {
  const { watch } = useFormContext<ISummary>()
  const value = watch('file')

  const fileType = getFileType(value)

  return (
    <section className="w-full h-full space-y-4">
      {value && (
        <section className="flex items-center gap-4 justify-between px-6 py-4 bg-accent/20 border-l-4 border-primary rounded-r-xl">
          <div className="space-y-1">
            <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">ARCHIVO ADJUNTO</h3>
            <p className="text-sm text-muted-foreground">
              Si no se visualiza correctamente, descárgalo aquí.
            </p>
          </div>
          <Button
            asChild
            size="sm"
            variant="default"
            className="gap-2"
            disabled={!value}
          >
            <Link href={value || '#'} target="_blank" download>
              <IconDownload stroke={1.5} size={16} />
              Descargar
            </Link>
          </Button>
        </section>
      )}
      <div className="rounded-xl overflow-hidden border bg-muted/30 min-h-[500px]">
        {value && fileType === 'pdf' && (
          <iframe
            src={value}
            width="100%"
            className="h-screen max-h-[calc(100vh-14rem)]"
            title="PDF file"
          ></iframe>
        )}
        {value && fileType === 'word' && (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
              value
            )}`}
            width="100%"
            className="h-screen max-h-[calc(100vh-14rem)]"
            title="Word file"
          ></iframe>
        )}
        {!value && (
          <div className="flex flex-col items-center justify-center h-full py-20 text-center gap-4">
            <IconDownload size={48} className="text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground font-medium">No hay documento para mostrar</p>
          </div>
        )}
      </div>
    </section>
  )
}
