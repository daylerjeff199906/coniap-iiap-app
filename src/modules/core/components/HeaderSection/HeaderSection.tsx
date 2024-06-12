'use client'
import { Button } from '@nextui-org/button'
import { Divider } from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import Link from 'next/link'

interface IProps {
  title: string
  subtitle: string
  labelButton?: string
  isButtonVisible?: boolean
  href?: string
  rigthContent?: React.ReactNode
}

export const HeaderSection = (props: IProps) => {
  const { title, subtitle, isButtonVisible, href, rigthContent } = props
  return (
    <>
      <section className="flex flex-col gap-3">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
          <div className="flex gap-2 justify-end">
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
        <Divider aria-label="divider" />
      </section>
    </>
  )
}
