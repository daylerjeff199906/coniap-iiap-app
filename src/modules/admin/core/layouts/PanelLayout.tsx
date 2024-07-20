'use client'
import {
  IconLayoutDashboard,
  IconCalendarEvent,
  IconUsers,
  IconFlag3,
  IconPresentationAnalytics,
  IconStack3,
  IconUserCog,
} from '@tabler/icons-react'

import { NavBar } from '@/modules/core'
import { AsideMenu } from '@/modules/admin'

import { IMenuSideBar } from '@/types'

interface IProps {
  menuAside: IMenuSideBar[]
  children: React.ReactNode
}

export const PanelLayout = (props: IProps) => {
  const { children, menuAside } = props
  const handleCloseMenu = () => {
    const asideMenu = document.getElementById('aside-menu')
    const backdrop = document.getElementById('backdrop')
    if (asideMenu) {
      asideMenu.classList.add('hidden')
    }
    if (backdrop) {
      backdrop.classList.add('hidden')
    }
  }

  return (
    <div className="flex w-full">
      <div
        id="backdrop"
        className="bg-black/20 w-full h-full fixed top-0 left-0 z-50 bottom-0 hidden"
        onClick={handleCloseMenu}
      />
      <aside
        className="w-52 min-w-52 max-w-52 bg-white h-screen fixed z-50 lg:sticky top-0 overflow-y-auto hidden lg:block"
        id="aside-menu"
      >
        <AsideMenu menuAside={menuAside} />
      </aside>
      <main className="w-full bg-slate-50">
        <NavBar variant="admin" />
        <main className="w-full max-w-[1920px] mx-auto p-4 sm:p-6">
          {children}
        </main>
        <footer className="w-full  p-4 text-center">
          <h3 className="text-sm">
            Realizado con ❤️ por el equipo de desarrollo de GESCON | Todos los
            derechos reservados © {new Date().getFullYear()}
          </h3>
        </footer>
      </main>
    </div>
  )
}
