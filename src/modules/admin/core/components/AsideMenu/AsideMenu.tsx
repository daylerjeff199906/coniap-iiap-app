'use client'
import { usePathname } from 'next/navigation'
import {
  Button,
  Accordion,
  AccordionItem,
  Divider,
  Image,
} from '@nextui-org/react'
import logo from '@/assets/images/logo-admin.webp'
import { IMenuItem, IMenuSideBar } from '@/types'
import Link from 'next/link'

import {
  IconLayoutDashboard,
  IconCalendarEvent,
  IconUsers,
  IconFlag3,
  IconUserCog,
  IconCards,
  IconTextGrammar,
  IconCategory2,
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
}

function getIcon(icon: string) {
  return icons[icon as keyof typeof icons]
}

export const AsideMenu = (props: IProps) => {
  const { menuAside } = props
  const pathname = usePathname()

  const filterSubItemsByMoreItems = (menu: IMenuSideBar[]): IMenuItem[] => {
    const items: IMenuItem[] = []
    menu.forEach((item) => {
      item.items.forEach((subItem) => {
        if (subItem.moreItems) {
          items.push(subItem)
        }
      })
    })
    return items
  }

  return (
    <div className="w-full">
      <header className="w-full">
        <div className="px-4 py-3">
          <Image
            src={logo.src}
            alt="logo"
            removeWrapper
          />
        </div>
        <Divider />
      </header>
      <div className="w-full py-4 px-2">
        <div className="flex flex-col flex-1 min-h-0 pt-0 dark:bg-gray-800">
          <div className="py-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800">
            {menuAside?.map((item) => (
              <div key={item.id}>
                <h3 className="px-4 text-xs text-stone-300 capitalize dark:text-gray-400">
                  {item.section}
                </h3>
                <ul className="my-2">
                  {item.items?.map((subItem) =>
                    subItem?.moreItems && subItem?.moreItems.length > 0 ? (
                      <li
                        className="px-4"
                        key={subItem?.id}
                      >
                        <Accordion
                          variant="light"
                          isCompact
                          className="w-full min-w-full px-0"
                          itemClasses={{
                            base: 'text-xs w-full px-0',
                            title:
                              'text-xs mx-2 font-medium px-0 w-full min-w-full',
                            content: 'w-full',
                            trigger:
                              'hover:bg-default-200 rounded-lg w-full min-w-full px-0',
                            // titleWrapper: 'w-full min-w-full px-0 mx-2',
                          }}
                        >
                          <AccordionItem
                            title={subItem.title}
                            startContent={
                              <>{getIcon(subItem?.icon as string)}</>
                            }
                          >
                            <ul>
                              {subItem.moreItems.map((moreItem) => (
                                <li key={moreItem.id}>
                                  <Button
                                    radius="sm"
                                    size="sm"
                                    fullWidth
                                    className="flex items-center justify-start"
                                    startContent={
                                      <>{getIcon(moreItem?.icon as string)}</>
                                    }
                                    as={Link}
                                    href={moreItem.href ?? ''}
                                    variant={
                                      pathname === moreItem.href
                                        ? 'solid'
                                        : 'light'
                                    }
                                  >
                                    {moreItem.title}
                                  </Button>
                                </li>
                              ))}
                            </ul>
                          </AccordionItem>
                        </Accordion>
                      </li>
                    ) : (
                      <li
                        className="px-4"
                        key={subItem.id}
                      >
                        <Button
                          radius="sm"
                          size="sm"
                          fullWidth
                          className="flex items-center justify-start"
                          startContent={<>{getIcon(subItem?.icon as string)}</>}
                          as={Link}
                          href={subItem.href ?? ''}
                          variant={
                            pathname === subItem.href ? 'solid' : 'light'
                          }
                        >
                          {subItem.title}
                        </Button>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
