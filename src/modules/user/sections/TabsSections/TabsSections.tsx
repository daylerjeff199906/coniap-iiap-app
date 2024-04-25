'use client'

import { Tab, Tabs } from '@nextui-org/react'
import Link from 'next/link'
import { IconHome, IconFile, IconUser } from '@tabler/icons-react'

const dataTabs = [
  {
    title: 'Inicio',
    href: '/dashboard',
    icon: <IconHome size={20} />,
  },
  {
    title: 'Mis archivos',
    href: '/dashboard/files',
    icon: <IconFile size={20} />,
  },
  {
    title: 'Configuración',
    href: '/dashboard/settings',
    icon: <IconUser size={20} />,
  },
]

export const TabsSections = () => {
  return (
    <>
      <header className="py-2">
        <main className="container">
          <Tabs
            size="sm"
            radius="sm"
            variant="underlined"
            color="primary"
          >
            {dataTabs.map((tab, index) => (
              <Tab
                key={index}
                title={
                  <div className="flex items-center space-x-2">
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
    </>
  )
}
