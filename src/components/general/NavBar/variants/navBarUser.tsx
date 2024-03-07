import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'

export const NavBarUser = () => {
  return (
    <nav className="w-full">
      <Navbar
        maxWidth="full"
        classNames={{
          base: 'bg-gray-800 text-white py-4',
          //   content: 'flex justify-between',
          item: 'text-sm',
        }}
        height={72}
      >
        <NavbarBrand>
          <h3>CONIAP-IIAP</h3>
        </NavbarBrand>
        <NavbarContent>
          <NavbarItem>Home</NavbarItem>
          <NavbarItem>About</NavbarItem>
          <NavbarItem>Contact</NavbarItem>
        </NavbarContent>
      </Navbar>
    </nav>
  )
}
