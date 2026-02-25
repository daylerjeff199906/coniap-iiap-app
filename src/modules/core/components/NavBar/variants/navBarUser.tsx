'use client'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import { useAuthContext } from '@/provider'
import { usePathname } from 'next/navigation'
import { menuItems } from './components/linkData'
import { NavBarUserPhone } from './components/navBarUserPhone'
import { ProfilePopover } from '@/modules/core'

export const NavBarUser = () => {
  const { user, logout, loading } = useAuthContext()
  const pathname = usePathname()
  const { scrollY } = useScroll()

  const navbarY = useTransform(scrollY, [0, 20], [-100, 0])
  const navbarYEmpty = useTransform(scrollY, [0, 20], [0, -100])
  const backgroundColor = useTransform(
    scrollY,
    [0, 20],
    ['rgba(0,0,0,0)', 'rgba(0,45,97,1)']
  )

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      {/* NavBar Phone */}
      <motion.nav
        className="lg:hidden fixed top-0 right-0 left-0 z-50 flex justify-between items-center p-4 bg-[#002B61]"
        style={{ backgroundColor }}
        initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
        transition={{ duration: 1 }}
      >
        <div className="z-50">
          <Link href="/" className="flex gap-2">
            <Image src="/minamf.webp" alt="Logo" width={120} height={40} priority className="w-auto h-8" />
            <Image src="/logo_iiap.webp" alt="Logo" width={120} height={40} priority className="w-auto h-8" />
          </Link>
        </div>
        <NavBarUserPhone />
      </motion.nav>

      {/* NavBar Desktop Transparent */}
      <motion.nav
        className="hidden lg:block fixed top-0 right-0 left-0 z-50 w-full"
        style={{ y: navbarYEmpty }}
      >
        <div className="bg-transparent text-white py-3 px-6 h-[80px] flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex gap-2 items-center">
              <Image src="/minamf.webp" alt="Logo" width={140} height={48} priority className="w-auto h-11" />
              <div className="h-8 w-px bg-white/20" />
              <Image src="/logo_iiap.webp" alt="Logo" width={140} height={48} priority className="w-auto h-11" />
            </Link>
          </div>

          <nav className="flex gap-8 items-center bg-white/5 backdrop-blur-md px-8 py-2.5 rounded-full border border-white/10 shadow-2xl">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={`text-sm font-bold tracking-tight uppercase transition-all hover:text-white/80 ${pathname === item.link ? 'text-green-400' : 'text-white'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ProfilePopover user={user} logout={handleLogout} loading={loading} />
            {!user?.id && !loading && (
              <div className="flex gap-3 items-center">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 font-bold px-4" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
                <Button variant="default" size="sm" className="bg-white text-primary hover:bg-white/90 font-bold rounded-full px-6 shadow-xl" asChild>
                  <Link href="/inscripciones">¡Participa!</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* NavBar Desktop Color */}
      <motion.nav
        className="hidden lg:block fixed top-0 z-50 right-0 left-0 w-full"
        style={{ y: navbarY }}
        initial={{ y: -100 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-[#002D61]/95 backdrop-blur-lg text-white py-3 px-6 h-[72px] flex items-center justify-between shadow-2xl border-b border-white/10">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex gap-2 items-center">
              <Image src="/minamf.webp" alt="Logo" width={120} height={40} priority className="w-auto h-9" />
              <Image src="/logo_iiap.webp" alt="Logo" width={120} height={40} priority className="w-auto h-9" />
            </Link>
          </div>

          <nav className="flex gap-8 items-center">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={`text-sm font-bold uppercase tracking-tight transition-all hover:text-white/70 ${pathname === item.link ? 'text-green-400' : 'text-white'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ProfilePopover user={user} logout={handleLogout} loading={loading} />
            {!user?.id && !loading && (
              <div className="flex gap-3 items-center">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 font-bold px-4" asChild>
                  <Link href="/login">Acceder</Link>
                </Button>
                <Button variant="default" size="sm" className="rounded-full px-6 font-bold shadow-lg" asChild>
                  <Link href="/inscripciones">Inscríbete</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.nav>
    </>
  )
}
