'use client'
import { useEffect, useState } from 'react'
import {
  Button,
  Listbox,
  ListboxItem,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Popover,
  PopoverContent,
  PopoverTrigger,
  User,
} from '@nextui-org/react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { usePathname } from 'next/navigation'
import { menuItems } from './components/linkData'
import { NavBarUserPhone } from './components/navBarUserPhone'
import { getLocalStorage, deleteLocalStorage, deleteCookie } from '@/lib'
import { IUser } from '@/types'

export const NavBarUser = () => {
  const [user, setUser] = useState<IUser | null>(null)

  const pathname = usePathname()
  const router = useRouter()

  const { scrollY } = useScroll()
  const navbarY = useTransform(scrollY, [0, 20], [-100, 0])
  const navbarYEmpty = useTransform(scrollY, [0, 20], [0, -100])
  const backgroundColor = useTransform(
    scrollY,
    [0, 20], // Rango de entrada: de 0 a 20 píxeles
    ['rgba(0,0,0,0)', 'rgba(0,45,97,1)'] // Rango de salida: de transparente a azul con opacidad
  )

  useEffect(() => {
    const user: IUser = getLocalStorage('user')
    setUser(user)
  }, [])

  const handleLogout = () => {
    deleteLocalStorage('user')
    deleteCookie('user')
    router.push('/')
  }

  return (
    <>
      {/* NavBar Phone */}
      <motion.nav
        className="lg:hidden fixed top-0 right-0 left-0 z-50 flex justify-between items-center p-4"
        style={{ backgroundColor }} // Aplicar color de fondo dinámico
        initial={{ backgroundColor: 'rgba(0,0,0,0)' }} // Color de fondo inicial transparente
        transition={{ duration: 1 }}
      >
        <div className="z-50">
          <Link href={'/'}>
            <Image
              src="/logo_coniap.webp"
              alt="Logo"
              width={120}
              height={90}
              priority
            />
          </Link>
        </div>
        <NavBarUserPhone />
      </motion.nav>
      {/* NavBar Desktop Transparent */}
      <motion.nav
        className="hidden lg:block fixed top-0 right-0 left-0 z-50"
        style={{ y: navbarYEmpty }}
      >
        <Navbar
          maxWidth="full"
          classNames={{
            base: 'bg-transparent text-white py-3',
          }}
          className="bg-transparent"
          height={72}
          isBlurred={false}
        >
          <NavbarContent>
            <NavbarBrand
              as={Link}
              href={'/'}
            >
              <Image
                src="/logo_coniap.webp"
                alt="Logo"
                width={120}
                height={90}
                priority
              />
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent
            className="hidden sm:flex gap-4"
            justify="center"
          >
            {menuItems.map((item, index) => (
              <NavbarItem
                key={index}
                isActive={pathname === item.link}
                className={` hover:text-gray-300 ${
                  pathname === item.link ? 'text-success-500' : 'text-white'
                }`}
              >
                <Link href={item.link}>{item.name}</Link>
              </NavbarItem>
            ))}
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem>
              {user?.id ? (
                <Popover
                  placement="bottom"
                  showArrow
                >
                  <PopoverTrigger>
                    <User
                      as={Button}
                      variant="light"
                      size="sm"
                      name={user?.userName}
                      description={user?.email}
                      avatarProps={{
                        src: user?.photo,
                        size: 'sm',
                      }}
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <Listbox
                      variant="faded"
                      aria-label="Menu"
                    >
                      <ListboxItem
                        aria-label="Cerrar Sesión"
                        key="out"
                        onPress={handleLogout}
                      >
                        Cerrar Sesión
                      </ListboxItem>
                    </Listbox>
                  </PopoverContent>
                </Popover>
              ) : (
                <Button
                  as={Link}
                  href="/inscripciones"
                  // variant="solid"
                  radius="full"
                  size="sm"
                  className="bg-transparent hover:bg-[#002D61] text-white hover:text-white border-white border"
                >
                  ¡Inscríbete ya!
                </Button>
              )}
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </motion.nav>

      {/* NavBar Desktop Color */}
      <motion.nav
        className="hidden lg:block fixed top-0 z-50 right-0 left-0"
        style={{ y: navbarY }}
        initial={{ y: -100 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar
          maxWidth="full"
          classNames={{
            base: 'bg-[rgba(0,45,97,1)] text-white py-3',
          }}
          height={72}
        >
          <NavbarContent>
            <NavbarBrand>
              <Link href={'/'}>
                <Image
                  src="/logo_coniap.webp"
                  alt="Logo"
                  width={120}
                  height={90}
                  priority
                />
              </Link>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent
            className="hidden sm:flex gap-4"
            justify="center"
          >
            {menuItems.map((item, index) => (
              <NavbarItem
                key={index}
                isActive={pathname === item.link}
                className={` hover:text-gray-300 ${
                  pathname === item.link ? 'text-success-500' : 'text-white'
                }`}
              >
                <Link href={item.link}>{item.name}</Link>
              </NavbarItem>
            ))}
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem>
              {user?.id ? (
                <Popover
                  placement="bottom"
                  showArrow
                >
                  <PopoverTrigger>
                    <User
                      as={Button}
                      variant="light"
                      size="sm"
                      name={user?.userName}
                      description={user?.email}
                      avatarProps={{
                        src: user?.photo,
                        size: 'sm',
                      }}
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <Listbox
                      variant="faded"
                      aria-label="Menu"
                    >
                      <ListboxItem
                        aria-label="Cerrar Sesión"
                        key="out"
                        onPress={handleLogout}
                      >
                        Cerrar Sesión
                      </ListboxItem>
                    </Listbox>
                  </PopoverContent>
                </Popover>
              ) : (
                <Button
                  as={Link}
                  color="danger"
                  href="/inscripciones"
                  variant="solid"
                  radius="full"
                  size="sm"
                >
                  ¡Inscríbete ya!
                </Button>
              )}
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </motion.nav>
    </>
  )
}
