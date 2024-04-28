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
import { getLocalStorage, deleteLocalStorage, deleteCookie } from '@/lib'
import { useEffect, useState } from 'react'
import { IUser } from '@/types'
// import { IUser } from '@/types'

export const NavBarAdmin = () => {
  // const [user, setUser] = useState<IUser | null>(null)

  const router = useRouter()
  const user: IUser = getLocalStorage('user')

  // useEffect(() => {
  //   setUser(user)
  // }, [user])

  const handleLogout = async () => {
    await deleteLocalStorage('user')
    await deleteCookie('user')
    router.refresh()
  }

  return (
    <Navbar maxWidth="full">
      {/* <NavbarBrand>Admin</NavbarBrand> */}
      <NavbarContent justify="end">
        <NavbarItem>
          {user && (
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
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
