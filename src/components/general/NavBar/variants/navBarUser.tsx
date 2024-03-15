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
import Image from 'next/image'
import Link from 'next/link'

const menuItems = [
  { name: 'Home', link: '/' },
  { name: 'Sobre nosotros', link: '/sobre-coniap' },
  { name: 'Agenda', link: '/agenda' },
  { name: 'Ponentes', link: '/ponentes' },
  { name: 'Eventos', link: '/eventos' },
]

export const NavBarUser = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <Navbar
        maxWidth="full"
        classNames={{
          base: 'bg-gray-800 text-white py-3',
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
                width={140}
                height={100}
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
            <NavbarItem key={index}>
              <Link href={item.link}>{item.name}</Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          {/* <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem> */}
          <NavbarItem>
            <Button
              as={Link}
              color="danger"
              href="#"
              variant="solid"
              radius="full"
            >
              ¡Inscríbete ya!
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems?.map((item, index) => (
            <NavbarMenuItem key={index}>
              <Link href={item.link}>{item.name}</Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  )
}
