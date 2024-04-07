'use client'
import { useState } from 'react'
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { menuItems } from './components/linkData'
import { NavBarUserPhone } from './components/navBarUserPhone'

export const NavBarUser = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const pathname = usePathname()
  const { scrollY } = useScroll()
  const navbarY = useTransform(scrollY, [0, 20], [-100, 0])

  return (
    <>
      <nav
        className={`hidden lg:block fixed top-0 right-0 left-0 z-50 ${
          navbarY && 'hidden'
        }`}
      >
        <Navbar
          maxWidth="full"
          classNames={{
            base: 'bg-transparent text-white py-2',
          }}
          className="bg-transparent"
          height={72}
          isBlurred={false}
        >
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="sm:hidden"
            />
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
              <Button
                as={Link}
                href="/inscripciones"
                radius="full"
                size="sm"
                className="text-white bg-transparent border-white border-2 hover:bg-white hover:text-black font-bold"
              >
                ¡Inscríbete ya!
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </nav>
      <motion.nav
        className="hidden lg:block fixed top-0 z-50 right-0 left-0"
        style={{ y: navbarY }}
      >
        <Navbar
          maxWidth="full"
          classNames={{
            base: 'bg-gray-800 text-white py-2',
          }}
          height={72}
        >
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="sm:hidden"
            />
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
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </motion.nav>
    </>
  )
}
