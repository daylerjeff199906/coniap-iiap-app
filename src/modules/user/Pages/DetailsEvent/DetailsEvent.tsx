'use client'
import ReactMarkdown from 'react-markdown'
import { IEvent } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import NextImage from 'next/image'
import {
  IconCalendarClock,
  IconArrowNarrowLeft,
  IconClockHour12,
} from '@tabler/icons-react'
import Link from 'next/link'
import { UtilsActions } from './UtilsActions'
import { IconsShared } from './IconsShared'
import remarkGfm from 'remark-gfm'
import { formatDateLarge } from '@/utils/functions'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface IProps {
  event: IEvent
}

export const DetailsEvent = (props: IProps) => {
  const { event } = props

  const cleanContent =
    event?.customContent && event.customContent.replace(/<[^>]*>?/gm, '')

  const isMagistral =
    event?.summary?.person &&
    event?.summary?.person?.typePerson === 'speaker_mg'

  return (
    <main className="container section grid grid-cols-1 py-12 gap-6">
      <section>
        <div className="flex gap-4 items-center">
          <Link
            href="/eventos"
            className="text-primary hover:text-primary/80 flex items-center gap-2 font-medium"
          >
            <IconArrowNarrowLeft size={20} />
            Lista de eventos
          </Link>
        </div>
      </section>
      <header className="flex flex-col gap-1">
        <h4 className="text-sm text-muted-foreground">Detalles del evento</h4>
        <section className="flex flex-col gap-3 w-full">
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-[40px] tracking-tight">
            {event?.name}
          </h1>
          {event?.summary && (
            <p className="text-muted-foreground">
              Línea temática:{' '}
              <span className="font-semibold text-foreground">
                {event?.summary?.topic?.name}
              </span>
            </p>
          )}
        </section>
      </header>
      <section className="flex flex-col sm:flex-row gap-8">
        <main className="w-full flex flex-col gap-8">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm">
            <Zoom canSwipeToUnzoom>
              <NextImage
                src={event?.banner || '/banner_coniap_simple.webp'}
                alt={event?.name || 'evento'}
                fill
                className="object-cover bg-muted"
              />
            </Zoom>
          </div>
          <IconsShared />

          <article className="w-full sm:hidden flex flex-col gap-4 bg-muted/50 rounded-xl p-6 border border-border">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-6 bg-primary rounded-full transition-all" />
                <h1 className="text-xl font-bold">Fecha y hora</h1>
              </div>
              <section className="flex flex-col gap-3">
                <div className="flex gap-3 items-center text-muted-foreground">
                  <IconCalendarClock size={24} className="text-primary" />
                  {event?.date && (
                    <p className="font-semibold text-foreground">
                      {formatDateLarge(event?.date)}
                    </p>
                  )}
                </div>
                <div className="flex gap-3 items-center text-muted-foreground">
                  <IconClockHour12 size={24} className="text-primary" />
                  <p className="font-semibold text-foreground">
                    {event?.timeStart} - {event?.timeEnd}
                  </p>
                </div>
              </section>
            </div>
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-6 bg-primary rounded-full transition-all" />
                <h1 className="text-xl font-bold">Acerca de este evento</h1>
              </div>
              <p className="text-muted-foreground leading-relaxed">{event?.shortDescription}</p>
            </div>
            <UtilsActions event={event} />
          </article>

          {event && event?.summary && event?.summary?.person && (
            <section className="space-y-6 w-full pt-4">
              <h1 className="text-2xl font-bold tracking-tight">
                {isMagistral ? 'Ponente magistral' : 'Ponente'}
              </h1>
              <div className="flex items-center gap-5 p-4 rounded-xl border border-border bg-card shadow-sm max-w-2xl">
                <Avatar className="h-24 w-24 border-2 border-primary/10">
                  <AvatarImage src={event?.summary?.person?.image} alt={event?.summary?.person?.name} />
                  <AvatarFallback className="text-2xl">{event?.summary?.person?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h2 className="text-xl sm:text-2xl font-bold">{event?.summary?.person?.name} {event?.summary?.person?.surName}</h2>
                  <p className="text-muted-foreground">{event?.summary?.person?.institution}</p>
                </div>
              </div>
            </section>
          )}
          {event && event?.summary && event?.summary?.person && (
            <div className="space-y-3 w-full max-w-4xl">
              <h2 className="text-lg font-bold">Acerca del ponente</h2>
              <p className="text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-4">
                "{event?.summary?.person?.presentation}"
              </p>
            </div>
          )}
          {event && event.customContent && (
            <main className="pt-4 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-6 bg-primary rounded-full" />
                <h1 className="text-2xl font-bold">Sobre el evento</h1>
              </div>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                >
                  {cleanContent}
                </ReactMarkdown>
              </div>
            </main>
          )}
        </main>

        <article className="hidden sm:flex flex-col gap-6 w-80 lg:w-96 h-fit sticky top-24 bg-card rounded-xl p-6 border shadow-sm">
          <div className="space-y-4 w-full">
            <div className="flex items-center gap-3">
              <div className="w-2 h-6 bg-primary rounded-full" />
              <h1 className="text-xl font-bold">Fecha y hora</h1>
            </div>
            <section className="flex flex-col gap-4">
              {event?.date && (
                <div className="flex gap-3 items-center text-muted-foreground">
                  <IconCalendarClock size={24} className="text-primary" />
                  <p className="font-semibold text-foreground text-sm">
                    {formatDateLarge(event?.date)}
                  </p>
                </div>
              )}
              <div className="flex gap-3 items-center text-muted-foreground">
                <IconClockHour12 size={24} className="text-primary" />
                <p className="font-semibold text-foreground text-sm">
                  {event?.timeStart} - {event?.timeEnd}
                </p>
              </div>
            </section>
          </div>
          <div className="space-y-4 w-full">
            <div className="flex items-center gap-3">
              <div className="w-2 h-6 bg-primary rounded-full" />
              <h1 className="text-xl font-bold">Detalles</h1>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{event?.shortDescription}</p>
          </div>
          <div className="pt-4">
            <UtilsActions event={event} />
          </div>
        </article>
      </section>
    </main>
  )
}
