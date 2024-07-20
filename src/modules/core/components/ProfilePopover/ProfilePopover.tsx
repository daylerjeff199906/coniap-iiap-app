'use client'
import { IUser } from '@/types'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
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

const optionMenu = [
  {
    id: 'portal',
    label: 'Ver página de inicio',
    key: 'portal',
    href: '/',
    show: true,
    role: 'all',
    color: 'default',
    onClick: false,
  },
  {
    id: 'profile',
    label: 'Mi perfil',
    key: 'profile',
    href: '/dashboard',
    show: true,
    role: 'speaker',
    color: 'default',
    onClick: false,
  },
  {
    id: 'admin',
    label: 'Panel de administración',
    href: '/admin',
    show: true,
    role: 'admin',
    color: 'default',
    onClick: false,
  },
  {
    id: 'logout',
    label: 'Cerrar Sesión',
    href: null,
    show: true,
    role: 'all',
    color: 'danger',
    onClick: true,
  },
]

const filterOptionsByRole = (roles: string[]): typeof optionMenu => {
  if (roles.includes('admin')) {
    return optionMenu.filter(
      (option) => option.role === 'admin' || option.role === 'all'
    )
  } else if (roles.includes('speaker')) {
    return optionMenu.filter(
      (option) => option.role === 'speaker' || option.role === 'all'
    )
  } else {
    return optionMenu.filter((option) => option.role === 'all')
  }
}

export const ProfilePopover = (props: IProps) => {
  const { user, logout, loading, isAdmin } = props

  const rol = user?.role
  const options = filterOptionsByRole(rol || [])

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
              aria-label="Profile"
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
                  name={user?.userName}
                  description={user?.email}
                  avatarProps={{
                    isBordered: true,
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
                variant="flat"
                className="p-2"
                itemClasses={{
                  base: 'hover:bg-default-200 text-xs',
                  title: 'text-xs font-medium',
                }}
              >
                {options.map((option) => (
                  <DropdownItem
                    key={option.id}
                    color={option.color as 'default' | 'danger'}
                    {...(option.href && {
                      href: option.href,
                      as: Link,
                    })}
                    onClick={option.onClick ? logout : undefined}
                  >
                    {option.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          ) : null}
        </>
      )}
    </>
  )
}
