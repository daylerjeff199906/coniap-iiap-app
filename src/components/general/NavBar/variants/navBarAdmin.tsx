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

import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/provider'
export const NavBarAdmin = () => {
  const { user, logout } = useAuthContext()

  const router = useRouter()

  const handleLogout = async () => {
    logout()
    router.push('/')
  }

  return (
    <Navbar maxWidth="full">
      {/* <NavbarBrand>Admin</NavbarBrand> */}
      <NavbarContent justify="end">
        {user && (
          <NavbarItem>
            <Popover
              placement="bottom"
              showArrow
            >
              <PopoverTrigger>
                <User
                  as={Button}
                  variant="light"
                  name={user?.userName}
                  description={user?.email}
                  avatarProps={{
                    src: user?.photo,
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
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  )
}
