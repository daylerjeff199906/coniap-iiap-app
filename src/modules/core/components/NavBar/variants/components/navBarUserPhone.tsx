'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconX, IconMenu, IconChevronRight, IconLogin } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'

import { menuItems } from './linkData'
import { menuSlide, scale, slide } from './anim'
import { cn } from '@/lib/utils'

export const NavBarUserPhone = () => {
  const [isActived, setIsActived] = useState(false)

  return (
    <>
      <Button
        className={cn(
          "fixed top-4 right-4 z-[60] rounded-full h-12 w-12 shadow-2xl transition-all duration-300",
          isActived ? "bg-white text-primary hover:bg-white" : "bg-primary text-white hover:bg-primary/90"
        )}
        onClick={() => setIsActived(!isActived)}
        size="icon"
        variant="ghost"
      >
        {isActived ? (
          <IconX size={24} stroke={2.5} />
        ) : (
          <IconMenu size={24} stroke={2.5} />
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

  // Curva de diseño SVG
  const curve = {
    initial: {
      d: `M100 0 L100 ${typeof window !== 'undefined' ? window.innerHeight : 800} Q-100 ${(typeof window !== 'undefined' ? window.innerHeight : 800) / 2
        } 100 0`,
    },
    enter: {
      d: `M100 0 L100 ${typeof window !== 'undefined' ? window.innerHeight : 800} Q100 ${(typeof window !== 'undefined' ? window.innerHeight : 800) / 2
        } 100 0`,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: `M100 0 L100 ${typeof window !== 'undefined' ? window.innerHeight : 800} Q-100 ${(typeof window !== 'undefined' ? window.innerHeight : 800) / 2
        } 100 0`,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  }

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed right-0 top-0 h-screen text-white bg-primary-900/95 backdrop-blur-xl z-50 w-full sm:w-[400px] shadow-[-20px_0_60px_rgba(0,0,0,0.5)]"
    >
      <div className="h-full flex flex-col justify-between p-10 pt-24 pb-12 overflow-y-auto">
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-xs font-black tracking-widest text-white/50 uppercase">Menú de Navegación</h3>
          </div>

          <nav className="flex flex-col gap-4">
            {menuItems.map((data, index) => (
              <LinkUi
                key={index}
                data={{ ...data, index }}
                isActive={selectedIndicator === data.link}
                setSelectedIndicator={setSelectedIndicator}
                onValueChange={onValueChange}
              />
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-3">
            <Button size="lg" variant="secondary" className="font-bold h-14 rounded-2xl w-full gap-3 shadow-xl" asChild onClick={onValueChange}>
              <Link href="/login">
                <IconLogin size={20} />
                Iniciar Sesión
              </Link>
            </Button>
            <Button size="lg" variant="default" className="font-bold h-14 rounded-2xl w-full gap-3 shadow-xl bg-green-600 hover:bg-green-500" asChild onClick={onValueChange}>
              <Link href="/inscripciones">
                ¡Participa Ahora!
                <IconChevronRight size={20} />
              </Link>
            </Button>
          </div>

          <div className="flex justify-between items-center text-xs text-white/40 pt-8 border-t border-white/5">
            <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-white transition-colors">Facebook</Link>
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
          </div>
        </div>
      </div>

      <svg className="absolute top-0 -left-24 w-24 h-full stroke-none fill-primary-900/95 backdrop-blur-xl pointer-events-none lg:hidden hidden sm:block">
        <motion.path
          variants={curve}
          initial="initial"
          animate="enter"
          exit="exit"
        />
      </svg>
    </motion.div>
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
      className="relative flex items-center group px-2 py-1"
      onMouseEnter={() => setSelectedIndicator(link)}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? 'open' : 'closed'}
        className="w-2 h-2 bg-green-400 absolute left-0 rounded-full"
      />

      <Link
        href={link}
        onClick={onValueChange}
        className={cn(
          "text-3xl sm:text-4xl font-black italic uppercase tracking-tighter transition-all pl-6",
          isActive ? "text-white" : "text-white/40 hover:text-white/70"
        )}
      >
        {name}
      </Link>
    </motion.div>
  )
}
