import { IPerson } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { IconArrowNarrowLeft } from '@tabler/icons-react'

interface IProps {
  speaker: IPerson
}

const img_default =
  'https://img.freepik.com/foto-gratis/apuesto-hombre-negocios-maduro-traje-negro-mostrando-pulgar-arriba-hombre-negocios-mediana-edad-sonriendo-mirando-camara-aislada-sobre-fondo-amarillo-concepto-negocio_549566-937.jpg'

export const DetailsSpeaker = (props: IProps) => {
  const { speaker } = props

  return (
    <main className="container section-home space-y-12 py-12">
      <section>
        <div className="flex gap-4 items-center">
          <Link
            href="/ponentes"
            className="text-primary hover:text-primary/80 flex items-center gap-2 font-medium"
          >
            <IconArrowNarrowLeft size={20} />
            Lista de ponentes
          </Link>
          <Separator
            orientation="vertical"
            className="h-6 w-[1px]"
          />
          <Link
            href="/agenda"
            className="text-primary hover:text-primary/80 font-medium"
          >
            Ir a Agenda
          </Link>
        </div>
      </section>

      <section className="flex flex-col-reverse sm:flex-row justify-between items-center gap-8">
        <section className="space-y-4 text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {speaker?.name} {speaker?.surName}
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
            <span>{speaker?.job}</span>
            <span className="hidden sm:inline text-border">|</span>
            <span className="font-bold text-foreground">{speaker?.institution}</span>
          </p>
          <div className="flex justify-center sm:justify-start">
            <Separator className="w-24 bg-primary h-1" />
          </div>
          <h3 className="font-medium text-muted-foreground uppercase tracking-widest text-xs">
            {speaker?.location}
          </h3>
        </section>
        <Avatar className="w-48 h-48 border-4 border-primary/10 shadow-xl">
          <AvatarImage src={speaker?.image || img_default} className="object-cover" />
          <AvatarFallback className="text-4xl">{speaker?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </section>

      <div className="space-y-6 max-w-4xl">
        <h2 className="text-2xl font-bold tracking-tight">Presentación</h2>
        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground leading-relaxed text-lg">
            {speaker?.presentation}
          </p>
        </div>
      </div>
    </main>
  )
}
