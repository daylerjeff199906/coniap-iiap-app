'use client'

import { Tab, Tabs } from '@nextui-org/react'
import Link from 'next/link'
import { IconHome, IconFile, IconUser } from '@tabler/icons-react'
import { usePathname } from 'next/navigation'

const dataTabs = [
  {
    title: 'Inicio',
    href: '/dashboard',
    icon: (
      <IconHome
        size={28}
        stroke={1.5}
      />
    ),
  },
  {
    title: 'Mis resumenes',
    href: '/dashboard/files',
    icon: (
      <IconFile
        size={28}
        stroke={1.5}
      />
    ),
  },
  {
    title: 'Perfil',
    href: '/dashboard/profile',
    icon: (
      <IconUser
        size={28}
        stroke={1.5}
      />
    ),
  },
]

export const TabsSections = () => {
  const pathname = usePathname()
  return (
    <main className="border-b">
      <section className="h-16 bg-primary-800"></section>
      <section className="container py-2">
        <Tabs
          radius="sm"
          variant="underlined"
          selectedKey={pathname}
        >
          {dataTabs.map((tab) => (
            <Tab
              key={tab.href}
              title={
                <div className="flex items-center gap-2">
                  <div>{tab.icon}</div>
                  <span>{tab.title}</span>
                </div>
              }
              as={Link}
              href={tab.href}
            />
          ))}
        </Tabs>
      </section>
    </main>
  )
}
