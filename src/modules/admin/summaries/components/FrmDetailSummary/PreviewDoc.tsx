'use client'
import { ISummary } from '@/types'
import { useFormContext } from 'react-hook-form'
import { getFileType } from '../../functions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { IconDownload, IconFileSearch } from '@tabler/icons-react'

export const PreviewDoc = () => {
  const { watch } = useFormContext<ISummary>()
  const value = watch('file')

  const fileType = getFileType(value)

  return (
    <section className="w-full h-full space-y-4 animate-in fade-in duration-500">
      {value && (
        <section className="flex items-center gap-4 justify-between px-6 py-4 bg-primary/5 border-l-4 border-primary rounded-r-xl shadow-sm">
          <div className="space-y-1">
            <h3 className="text-[10px] font-black tracking-widest text-primary uppercase">ARCHIVO ADJUNTO</h3>
            <p className="text-sm text-muted-foreground font-medium">
              Si no se visualiza correctamente, descárgalo aquí.
            </p>
          </div>
          <Button asChild
            size="sm"
            variant="default"
            className="gap-2 font-bold px-6 shadow-md shadow-primary/20"
            disabled={!value}
          >
            <Link href={value || '#'} target="_blank" download>
              <IconDownload stroke={2} size={18} />
              Descargar
            </Link>
          </Button>
        </section>
      )}
      <div className="rounded-2xl overflow-hidden border-2 bg-muted/30 min-h-[600px] shadow-inner">
        {value && fileType === 'pdf' && (
          <iframe
            src={value}
            width="100%"
            className="h-screen max-h-[calc(100vh-14rem)] bg-white"
            title="PDF file"
          ></iframe>
        )}
        {value && fileType === 'word' && (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
              value
            )}`}
            width="100%"
            className="h-screen max-h-[calc(100vh-14rem)] bg-white"
            title="Word file"
          ></iframe>
        )}
        {!value && (
          <div className="flex flex-col items-center justify-center p-20 text-center gap-6">
            <div className="p-8 bg-muted/50 rounded-full">
              <IconFileSearch size={64} stroke={1} className="text-muted-foreground/40" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-bold text-muted-foreground italic">No hay documento para mostrar</p>
              <p className="text-xs text-muted-foreground/60 max-w-xs mx-auto">Sube un archivo en el formulario para poder visualizarlo en esta sección.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
