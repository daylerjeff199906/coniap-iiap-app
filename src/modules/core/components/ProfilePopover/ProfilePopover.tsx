'use client'
import { IUser } from '@/types'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Skeleton,
  User,
} from '@nextui-org/react'
import Link from 'next/link'

interface IProps {
  user: IUser | null
  logout: () => void
  loading: boolean
  isAdmin?: boolean
}

export const ProfilePopover = (props: IProps) => {
  const { user, logout, loading, isAdmin } = props

  const rol = user?.role
  const isAdm = rol === 'admin'

  return (
    <>
      {loading ? (
        <div className="max-w-[300px] w-full flex items-center gap-3">
          <div>
            <Skeleton
              isLoaded
              className="flex rounded-full w-12 h-12"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton
              isLoaded
              className="h-3 w-3/5 rounded-lg"
            />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
      ) : (
        <>
          {user ? (
            <Dropdown
              radius="sm"
              showArrow
              classNames={{
                base: 'before:bg-default-200', // change arrow background
                content: 'p-0 border-small border-divider bg-background',
              }}
            >
              <DropdownTrigger>
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
                  classNames={{
                    name: `text-xs font-medium ${!isAdmin && 'text-white'}`,
                    description: 'text-tiny',
                  }}
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Custom item styles"
                className="p-3"
                itemClasses={{
                  base: [
                    'rounded-md',
                    'text-default-500',
                    'transition-opacity',
                    'data-[hover=true]:text-foreground',
                    'data-[hover=true]:bg-default-100',
                    'dark:data-[hover=true]:bg-default-50',
                    'data-[selectable=true]:focus:bg-default-50',
                    'data-[pressed=true]:opacity-70',
                    'data-[focus-visible=true]:ring-default-500',
                  ],
                }}
              >
                <DropdownSection showDivider>
                  <DropdownItem
                    key="dashboard"
                    as={Link}
                    href="/"
                  >
                    Ir al inicio
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection showDivider>
                  <DropdownItem
                    key="profile"
                    as={Link}
                    href={isAdm ? '/admin' : '/dashboard'}
                  >
                    {isAdm ? 'Dashboard' : 'Panel de Usuario'}
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection>
                  <DropdownItem
                    key="logout"
                    onPress={logout}
                  >
                    Cerrar Sesión
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          ) : null}
        </>
      )}
    </>
  )
}
