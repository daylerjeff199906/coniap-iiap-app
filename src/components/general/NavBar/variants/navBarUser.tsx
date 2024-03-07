import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import Image from 'next/image'

export const NavBarUser = () => {
  return (
    <>
      <Navbar
        maxWidth="full"
        classNames={{
          base: 'bg-gray-800 text-white py-3',
          //   content: 'flex justify-between',
          item: 'text-sm',
        }}
        height={72}
      >
        <NavbarBrand>
          <Image
            src="/logo_coniap.webp"
            alt="Logo"
            width={140}
            height={100}
            priority
          />
        </NavbarBrand>
        <NavbarContent>
          <NavbarItem>Home</NavbarItem>
          <NavbarItem>About</NavbarItem>
          <NavbarItem>Contact</NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  )
}
