'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconX, IconMenu } from '@tabler/icons-react'
import { Button } from '@nextui-org/react'

import { menuItems } from './linkData'
import { menuSlide, scale, slide } from './anim'

export const NavBarUserPhone = () => {
  const [isActived, setIsActived] = useState(false)

  return (
    <>
      <Button
        className="fixed right-4 z-50 text-white"
        onPress={() => setIsActived(!isActived)}
        isIconOnly
        radius="lg"
        variant="light"
      >
        {isActived ? (
          <IconX
            size={24}
            stroke={1}
          />
        ) : (
          <IconMenu
            size={24}
            stroke={1}
          />
        )}
      </Button>
      <AnimatePresence mode="wait">
        {isActived && <NavSection onValueChange={() => setIsActived(false)} />}
      </AnimatePresence>
    </>
  )
}

interface IProps {
  onValueChange: () => void
}

const NavSection = (props: IProps) => {
  const { onValueChange } = props
  const pathname = usePathname()
  const [selectedIndicator, setSelectedIndicator] = useState(pathname)

  const initialPath = `M100 0 L100 ${window.innerHeight} Q-100 ${
    window.innerHeight / 2
  } 100 0`

  const targetPath = `M100 0 L100 ${window.innerHeight} Q100 ${
    window.innerHeight / 2
  } 100 0`

  const curve = {
    initial: {
      d: initialPath,
    },

    enter: {
      d: targetPath,

      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },

    exit: {
      d: initialPath,

      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  }

  return (
    <>
      <motion.div
        variants={menuSlide}
        initial="initial"
        animate="enter"
        exit="exit"
        className="h-screen fixed right-0 top-0 text-white bg-primary-800"
      >
        <div className="h-full p-20 flex flex-col justify-between">
          <div
            onMouseLeave={() => {
              setSelectedIndicator(pathname)
            }}
            className="flex flex-col text-5xl gap-3 mt-12"
          >
            <div className="border-b border-gray-200 uppercase text-xs mb-10">
              <p>Navigation</p>
            </div>

            {menuItems.map((data, index) => {
              return (
                <LinkUi
                  key={index}
                  data={{ ...data, index }}
                  isActive={selectedIndicator == data.link}
                  setSelectedIndicator={setSelectedIndicator}
                  onValueChange={onValueChange}
                />
              )
            })}
          </div>

          <div className="pt-4 flex flex-col gap-2">
            <Button
              size="lg"
              variant="light"
              radius="full"
              fullWidth
              as={Link}
              href="/login"
              className="text-white"
            >
              Ya tengo mi cuenta
            </Button>
            <Button
              size="lg"
              variant="solid"
              color="danger"
              radius="full"
              fullWidth
              as={Link}
              href="/inscripciones"
            >
              ¡Inscríbete ya!
            </Button>
          </div>

          <div className="flex w-full justify-between text-sm pt-6">
            <a className="text-white font-semibold">Instagram</a>
            <a className="text-white font-semibold">Facebook</a>
            <a className="text-white font-semibold">Tik tok</a>
          </div>
        </div>
        <svg className="absolute top-0 -left-24 w-24 h-full stroke-none fill-primary-800">
          <motion.path
            variants={curve}
            initial="initial"
            animate="enter"
            exit="exit"
          ></motion.path>
        </svg>
      </motion.div>
    </>
  )
}

interface ILinkProps {
  data: {
    name: string
    link: string
    index: number
  }
  isActive: boolean
  setSelectedIndicator: (href: string) => void
  onValueChange?: () => void
}

const LinkUi = (props: ILinkProps) => {
  const { data, isActive, setSelectedIndicator, onValueChange } = props
  const { name, link, index } = data
  return (
    <motion.div
      className="relative flex items-center"
      onMouseEnter={() => {
        setSelectedIndicator(link)
        onValueChange && onValueChange()
      }}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? 'open' : 'closed'}
        className="w-[10px] h-[10px] bg-white absolute -left-6 rounded-small"
      ></motion.div>

      <Link href={link}>{name}</Link>
    </motion.div>
  )
}
