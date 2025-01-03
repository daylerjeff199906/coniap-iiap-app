'use client'
import { Button } from '@nextui-org/button'
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
    <>
      <section className="flex flex-col gap-3">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex gap-2">
            {showBackButton && (
              <div className="pt-2">
                <Button
                  size="sm"
                  radius="sm"
                  isIconOnly
                  variant="bordered"
                  {...(hrefBack && { as: Link, href: hrefBack })}
                >
                  <IconArrowNarrowLeft
                    size={20}
                    stroke={1.5}
                    className="text-gray-500"
                  />
                </Button>
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold">{title}</h1>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
          </div>
          <div className="flex gap-2 sm:justify-end">
            {rigthContent}
            {isButtonVisible && (
              <Button
                aria-label="button"
                radius="sm"
                size="sm"
                startContent={
                  <IconPlus
                    size={16}
                    className="text-white"
                  />
                }
                className="button-dark"
                as={Link}
                href={href || '#'}
              >
                {props.labelButton || 'Nuevo'}
              </Button>
            )}
          </div>
        </header>
      </section>
    </>
  )
}
