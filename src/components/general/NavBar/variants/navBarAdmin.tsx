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

// import { getCookie } from '@/lib/actions'
// import { IUser } from '@/types'

export const NavBarAdmin = () => {
  // const user = getCookie('user')
  // console.log(user)
  // const dataUser: IUser = user ? JSON.parse(user) : null

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
