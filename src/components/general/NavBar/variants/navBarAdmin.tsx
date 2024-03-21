'use client'
import {
  Button,
  Navbar,
  NavbarContent,
  NavbarItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  User,
  Listbox,
  ListboxItem,
} from '@nextui-org/react'

export const NavBarAdmin = () => {
  return (
    <Navbar maxWidth="full">
      {/* <NavbarBrand>Admin</NavbarBrand> */}
      <NavbarContent justify="end">
        <NavbarItem>
          <Popover
            placement="bottom"
            showArrow
          >
            <PopoverTrigger>
              <User
                as={Button}
                name="Admin"
              />
            </PopoverTrigger>
            <PopoverContent>
              <Listbox variant="faded">
                <ListboxItem key="out">Cerrar Sesión</ListboxItem>
              </Listbox>
            </PopoverContent>
          </Popover>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
