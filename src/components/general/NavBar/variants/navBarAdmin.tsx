'use client'
import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/react'

import { useAuthContext } from '@/provider'
import { ProfilePopover } from '@/modules/core'
export const NavBarAdmin = () => {
  const { user, logout, loading } = useAuthContext()

  const handleLogout = async () => {
    logout()
  }

  return (
    <Navbar maxWidth="full">
      {/* <NavbarBrand>Admin</NavbarBrand> */}
      <NavbarContent justify="end">
        <NavbarItem>
          <ProfilePopover
            user={user}
            logout={handleLogout}
            loading={loading}
          />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
