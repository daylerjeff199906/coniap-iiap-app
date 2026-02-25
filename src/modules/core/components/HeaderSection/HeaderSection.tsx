'use client'
import { Button } from '@/components/ui/button'
import { IconPlus, IconArrowNarrowLeft } from '@tabler/icons-react'
import Link from 'next/link'

interface IProps {
  title: string
  subtitle: string
  labelButton?: string
  isButtonVisible?: boolean
  href?: string
  rigthContent?: React.ReactNode
  showBackButton?: boolean
  hrefBack?: string
}

export const HeaderSection = (props: IProps) => {
  const {
    title,
    subtitle,
    isButtonVisible,
    href,
    rigthContent,
    showBackButton,
    hrefBack,
  } = props

  return (
    <section className="flex flex-col gap-4 w-full mb-6 animate-in fade-in slide-in-from-left-4 duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-4 items-center">
          {showBackButton && (
            <Button size="icon" variant="outline" asChild className="h-10 w-10 rounded-xl shadow-sm hover:shadow transition-all shrink-0">
              <Link href={hrefBack || '#'}>
                <IconArrowNarrowLeft size={22} stroke={2} className="text-muted-foreground" />
              </Link>
            </Button>
          )}
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black tracking-tight text-foreground uppercase italic">{title}</h1>
            <p className="text-sm font-medium text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <div className="flex gap-3 sm:justify-end items-center">
          {rigthContent}
          {isButtonVisible && (
            <Button size="sm" asChild variant="default" className="gap-2 rounded-xl px-5 h-10 font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
              <Link href={href || '#'}>
                <IconPlus size={18} stroke={3} />
                {props.labelButton || 'Nuevo'}
              </Link>
            </Button>
          )}
        </div>
      </header>
    </section>
  )
}
