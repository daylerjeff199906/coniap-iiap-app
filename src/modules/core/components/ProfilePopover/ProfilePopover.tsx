'use client'
import { IUser } from '@/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  IconUser,
  IconSettings,
  IconLogout,
  IconLayoutDashboard,
  IconArrowUpRight
} from '@tabler/icons-react'
import { cn } from '@/lib/utils'

interface IProps {
  user: IUser | null
  logout: () => void
  loading: boolean
  isAdmin?: boolean
}

export const ProfilePopover = (props: IProps) => {
  const { user, logout, loading, isAdmin } = props

  const getInitials = (name: string) => {
    return name?.charAt(0).toUpperCase() || 'U'
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 hidden sm:block">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-3 w-[120px]" />
        </div>
      </div>
    )
  }

  if (!user) return null

  const isActuallyAdmin = user.role?.includes('admin') || user.role?.includes('superadmin') || user.role?.includes('editor')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-12 flex items-center gap-3 px-3 hover:bg-accent/50 rounded-xl transition-all group">
          <Avatar className="h-9 w-9 border-2 border-primary/20 group-hover:border-primary/50 transition-all shadow-sm">
            <AvatarImage src={user?.photo || undefined} alt={user?.userName} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {getInitials(user?.userName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start text-left ml-0.5 hidden sm:flex">
            <span className={cn(
              "text-xs font-black tracking-tight uppercase italic",
              isAdmin ? "text-foreground" : "text-white"
            )}>
              {user?.userName}
            </span>
            <span className="text-[10px] text-muted-foreground/80 font-medium line-clamp-1 italic">{user?.email}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-2xl border-2 animate-in slide-in-from-top-2 duration-300">
        <DropdownMenuLabel className="font-normal p-3">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold leading-none uppercase italic tracking-tighter">{user.userName}</p>
            <p className="text-xs leading-none text-muted-foreground italic">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem asChild className="rounded-xl p-2 cursor-pointer">
          <Link href="/" className="flex items-center gap-3">
            <IconArrowUpRight size={18} stroke={1.5} className="text-muted-foreground" />
            <span className="font-bold text-xs uppercase italic tracking-widest">Ir al Portal</span>
          </Link>
        </DropdownMenuItem>

        {!isAdmin && (
          <DropdownMenuItem asChild className="rounded-xl p-2 cursor-pointer">
            <Link href="/dashboard" className="flex items-center gap-3">
              <IconUser size={18} stroke={1.5} className="text-muted-foreground" />
              <span className="font-bold text-xs uppercase italic tracking-widest">Mi Perfil</span>
            </Link>
          </DropdownMenuItem>
        )}

        {isActuallyAdmin && (
          <DropdownMenuItem asChild className="rounded-xl p-2 cursor-pointer">
            <Link href="/admin" className="flex items-center gap-3">
              <IconLayoutDashboard size={18} stroke={1.5} className="text-muted-foreground" />
              <span className="font-bold text-xs uppercase italic tracking-widest text-primary">Panel Admin</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild className="rounded-xl p-2 cursor-pointer text-muted-foreground hover:text-foreground">
          <Link href="/dashboard/settings" className="flex items-center gap-3">
            <IconSettings size={18} stroke={1.5} />
            <span className="font-bold text-xs uppercase italic tracking-widest">Ajustes</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          onClick={logout}
          className="rounded-xl p-2 cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive flex items-center gap-3"
        >
          <IconLogout size={18} stroke={2} />
          <span className="font-black text-xs uppercase italic tracking-widest">Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
