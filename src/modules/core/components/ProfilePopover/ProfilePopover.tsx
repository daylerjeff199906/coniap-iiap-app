'use client'
import { IUser } from '@/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

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

  const getInitials = (name: string) => {
    return name?.charAt(0).toUpperCase() || 'U'
  }

  return (
    <>
      {loading ? (
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-3 w-[120px]" />
          </div>
        </div>
      ) : (
        <>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 flex items-center gap-2 px-2 hover:bg-white/10">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src={user?.photo} alt={user?.userName}><AvatarFallback>{getInitials(user?.userName)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-left ml-1 hidden sm:flex">
                    <span className={`text-xs font-semibold ${!isAdmin && 'text-white'}`}>{user?.userName}</span>
                    <span className="text-[10px] text-muted-foreground line-clamp-1">{user?.email}</span>
                  </div></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {options.map((option) => (
                  <DropdownMenuItem key={option.id} asChild={!!option.href} onClick={option.onClick ? logout : undefined} className={option.color === 'danger' ? 'text-destructive focus:text-destructive' : ''}>
                    {option.href ? (
                      <Link href={option.href}>{option.label}</Link>
                    ) : (
                      <span>{option.label}</span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </>
      )}
    </>
  )
}
