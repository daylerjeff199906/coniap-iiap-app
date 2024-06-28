'use client'
import { IUser } from '@/types'
import {
  Button,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  User,
} from '@nextui-org/react'

interface IProps {
  user: IUser | null
  logout: () => void
  loading: boolean
}

export const ProfilePopover = (props: IProps) => {
  const { user, logout, loading } = props

  return (
    <>
      {loading ? (
        <section className="flex gap-3 w-full max-w-xl items-start">
          <Skeleton className="w-14 h-14 rounded-full" />
          <div className="flex flex-col gap-1 w-full">
            <Skeleton className="w-40 h-4 rounded-sm" />
            <Skeleton className="w-20 h-2 rounded-sm" />
          </div>
        </section>
      ) : (
        <>
          {user ? (
            <Popover
              placement="bottom"
              showArrow
            >
              <PopoverTrigger>
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
                    name: 'text-xs',
                    description: 'text-tiny',
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
                    onPress={logout}
                  >
                    Cerrar Sesión
                  </ListboxItem>
                </Listbox>
              </PopoverContent>
            </Popover>
          ) : null}
        </>
      )}
    </>
  )
}
