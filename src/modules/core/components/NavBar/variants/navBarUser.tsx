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
        className="lg:hidden fixed top-0 right-0 left-0 z-50 flex justify-between items-center p-4"
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
        <div className="bg-transparent text-white py-3 px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex gap-2 items-center">
              <Image src="/minamf.webp" alt="Logo" width={120} height={40} priority className="w-auto h-10" />
              <Image src="/logo_iiap.webp" alt="Logo" width={120} height={40} priority className="w-auto h-10" />
            </Link>
          </div>

          <nav className="flex gap-6 items-center">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={`text-sm font-medium transition-colors hover:text-gray-300 ${pathname === item.link ? 'text-green-400' : 'text-white'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ProfilePopover user={user} logout={handleLogout} loading={loading} />
            {!user?.id && !loading && (
              <div className="flex gap-2 items-center">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" asChild>
                  <Link href="/login">Iniciar sesión</Link>
                </Button>
                <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/10" asChild>
                  <Link href="/inscripciones">¡Participa ya!</Link>
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
        <div className="bg-[#002D61] text-white py-3 px-6 h-[72px] flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex gap-2 items-center">
              <Image src="/minamf.webp" alt="Logo" width={120} height={40} priority className="w-auto h-10"><Image src="/logo_iiap.webp" alt="Logo" width={120} height={40} priority className="w-auto h-10" />
            </Link>
          </div>

          <nav className="flex gap-6 items-center">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={`text-sm font-medium transition-colors hover:text-gray-300 ${pathname === item.link ? 'text-green-400' : 'text-white'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ProfilePopover user={user} logout={handleLogout} loading={loading} />
            {!user?.id && !loading && (
              <div className="flex gap-2 items-center">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" asChild>
                  <Link href="/login">Iniciar sesión</Link></Button>
                <Button variant="destructive" size="sm" asChild>
                  <Link href="/inscripciones">¡Participa ya!</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.nav>
    </>
  )
}
