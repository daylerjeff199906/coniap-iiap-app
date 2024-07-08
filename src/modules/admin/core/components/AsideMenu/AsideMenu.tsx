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
import { IMenuAside } from '@/types'
import Link from 'next/link'

interface IProps {
  menuAside: IMenuAside[]
}

const findId = (url: string, menu: IMenuAside[]) => {
  const idMenu = menu?.find(
    (item) => item.subItems?.find((subItem) => subItem.url === url)?.id
  )
  return idMenu?.id ?? ''
}

export const AsideMenu = (props: IProps) => {
  const { menuAside } = props
  const pathname = usePathname()

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
        {menuAside?.map((item) =>
          item?.subItems !== null ? (
            <Accordion
              isCompact
              key={item.id}
              defaultExpandedKeys={[findId(pathname, menuAside)]}
              className="w-full pr-0"
              itemClasses={{
                base: 'py-0 px-0 w-full ',
                title: 'font-normal text-sm  w-full',
                content: 'w-full',
                heading: 'px-1',
              }}
            >
              <AccordionItem
                key={item.id}
                title={item?.nameOption}
                startContent={item?.icon}
              >
                {item?.subItems?.map((subItem) => (
                  <Button
                    key={subItem.id}
                    as={Link}
                    href={subItem?.url ?? ''}
                    className={`flex justify-start  rounded-xl  ml-5 ${
                      subItem?.url !== pathname && 'text-slate-400'
                    }`}
                    variant={subItem?.url === pathname ? 'solid' : 'light'}
                    color={subItem?.url === pathname ? 'primary' : 'default'}
                    size="sm"
                  >
                    {subItem?.nameOption}
                  </Button>
                ))}
              </AccordionItem>
            </Accordion>
          ) : (
            <Button
              key={item.id}
              as={Link}
              href={item?.hrefLink ?? ''}
              fullWidth
              variant="light"
              className={`flex  text-sm justify-start rounded-lg first-letter:capitalize ${
                item?.hrefLink === pathname && 'bg-gray-200 text-primary-500'
              } `}
              startContent={item?.icon}
              size="sm"
            >
              {item?.nameOption}
            </Button>
          )
        )}
      </div>
    </div>
  )
}
