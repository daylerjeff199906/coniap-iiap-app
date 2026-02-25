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
    <section className="flex flex-col gap-3 w-full">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex gap-4 items-center">
          {showBackButton && (
            <Button
              size="icon"
              variant="outline"
              asChild
              className="h-8 w-8"
            >
              <Link href={hrefBack || '#'}>
                <IconArrowNarrowLeft
                  size={20}
                  stroke={1.5}
                  className="text-gray-500"
                />
              </Link>
            </Button>
          )}
          <div>
            <h1 className="text-xl font-bold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <div className="flex gap-2 sm:justify-end items-center">
          {rigthContent}
          {isButtonVisible && (
            <Button
              size="sm"
              asChild
              className="gap-2"
            >
              <Link href={href || '#'}>
                <IconPlus
                  size={16}
                />
                {props.labelButton || 'Nuevo'}
              </Link>
            </Button>
          )}
        </div>
      </header>
    </section>
  )
}
