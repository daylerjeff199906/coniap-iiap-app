'use client'

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
    <main className="flex">
      <div
        id="backdrop"
        className="bg-black/20 w-full h-full fixed top-0 left-0 z-50 bottom-0 hidden"
        onClick={handleCloseMenu}
      />

      <AsideMenu menuAside={menuAside} />
      <article className="w-full flex flex-col bg-slate-50 max-w-[calc(100%-240px)]">
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
      </article>
    </main>
  )
}
