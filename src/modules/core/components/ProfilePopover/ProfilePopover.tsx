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
        <>
          <section className="flex gap-3">
            <Skeleton className="w-20 h-20 rounded-full" />
            <div>
              <Skeleton className="w-20 h-4 rounded-sm" />
              <Skeleton className="w-10 h-4 rounded-sm" />
            </div>
          </section>
        </>
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
