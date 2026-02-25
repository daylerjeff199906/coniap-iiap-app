'use client'
import { usePathname } from 'next/navigation'
import NextImage from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import logo from '@/assets/images/logo-admin.webp'
import { IMenuSideBar } from '@/types'
import Link from 'next/link'
import { cn } from '@/lib/utils'

import {
  IconLayoutDashboard,
  IconCalendarEvent,
  IconUsers,
  IconFlag3,
  IconUserCog,
  IconCards,
  IconTextGrammar,
  IconCategory2,
  IconSettings,
  IconFileSpreadsheet,
} from '@tabler/icons-react'

interface IProps {
  menuAside: IMenuSideBar[]
}

const icons = {
  dashboard: <IconLayoutDashboard size={18} />,
  calendar: <IconCalendarEvent size={18} />,
  cards: <IconCards size={18} />,
  users: <IconUsers size={18} />,
  text: <IconTextGrammar size={18} />,
  sponsors: <IconFlag3 size={18} />,
  categories: <IconCategory2 size={18} />,
  usersConfig: <IconUserCog size={18} />,
  settings: <IconSettings size={18} />,
  excel: <IconFileSpreadsheet size={18} />,
}

function getIcon(icon: string) {
  return icons[icon as keyof typeof icons]
}

export const AsideMenu = (props: IProps) => {
  const { menuAside } = props
  const pathname = usePathname()

  return (
    <aside
      className="fixed lg:sticky top-0 z-50 w-64 hidden lg:flex max-w-64 min-w-64 flex-col flex-shrink-0 bg-background h-screen border-r transition-all duration-300"
      id="aside-menu"
    >
      <header className="p-6">
        <NextImage
          src={logo.src}
          alt="Admin Logo"
          width={180}
          height={60}
          className="object-contain"
          priority
        />
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
        {menuAside?.map((item) => (
          <div key={item.id} className="space-y-2">
            <h3 className="px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
              {item.section}
            </h3>
            <ul className="space-y-1">
              {item.items?.map((subItem) =>
                subItem?.moreItems && subItem?.moreItems.length > 0 ? (
                  <li key={subItem?.id}>
                    <Accordion type="single" collapsible className="border-none">
                      <AccordionItem value={subItem.id} className="border-none">
                        <AccordionTrigger className="py-2 px-3 hover:bg-accent rounded-lg hover:no-underline text-sm font-medium transition-colors">
                          <div className="flex items-center gap-3">
                            {getIcon(subItem?.icon as string)}
                            <span>{subItem.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-1 pb-0 pl-7 space-y-1">
                          {subItem.moreItems.map((moreItem) => (
                            <Button
                              key={moreItem.id}
                              asChild
                              variant={pathname === moreItem.href ? 'secondary' : 'ghost'}
                              size="sm"
                              className={cn(
                                "w-full justify-start font-medium gap-3",
                                pathname === moreItem.href && "bg-secondary text-secondary-foreground"
                              )}
                            >
                              <Link href={moreItem.href ?? ''}>
                                {getIcon(moreItem?.icon as string)}
                                {moreItem.title}
                              </Link>
                            </Button>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </li>
                ) : (
                  <li key={subItem.id}>
                    <Button
                      asChild
                      variant={pathname === subItem.href ? 'secondary' : 'ghost'}
                      size="sm"
                      className={cn(
                        "w-full justify-start font-medium gap-3 h-10 px-3",
                        pathname === subItem.href && "bg-secondary text-secondary-foreground"
                      )}
                    >
                      <Link href={subItem.href ?? ''}>
                        {getIcon(subItem?.icon as string)}
                        {subItem.title}
                      </Link>
                    </Button>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}
