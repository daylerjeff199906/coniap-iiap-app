'use client'

import { Tab, Tabs } from '@nextui-org/react'
import Link from 'next/link'
import { IconHome, IconFile, IconUser } from '@tabler/icons-react'
import { usePathname } from 'next/navigation'

const dataTabs = [
  {
    title: 'Inicio',
    href: '/dashboard',
    icon: <IconHome size={28} />,
  },
  {
    title: 'Mis resumenes',
    href: '/dashboard/files',
    icon: <IconFile size={28} />,
  },
  {
    title: 'Perfil',
    href: '/dashboard/profile',
    icon: <IconUser size={28} />,
  },
]

export const TabsSections = () => {
  const pathname = usePathname()
  return (
    <>
      <aside className="hidden sm:block">
        <header className="py-2">
          <main className="">
            <Tabs
              size="lg"
              radius="sm"
              variant="solid"
              selectedKey={pathname}
              classNames={{
                tab: 'gap-4 py-12 px-4 sm:px-6 text-sm',
              }}
              isVertical={true}
            >
              {dataTabs.map((tab) => (
                <Tab
                  key={tab.href}
                  title={
                    <div className="flex flex-col items-center gap-2">
                      {tab.icon}
                      <span>{tab.title}</span>
                    </div>
                  }
                  as={Link}
                  href={tab.href}
                />
              ))}
            </Tabs>
          </main>
        </header>
      </aside>
      <section className="block sm:hidden">
        <Tabs
          size="sm"
          radius="sm"
          variant="underlined"
          selectedKey={pathname}
        >
          {dataTabs.map((tab) => (
            <Tab
              key={tab.href}
              title={
                <div className="flex items-center gap-2">
                  <span>{tab.title}</span>
                </div>
              }
              as={Link}
              href={tab.href}
            />
          ))}
        </Tabs>
      </section>
    </>
  )
}
