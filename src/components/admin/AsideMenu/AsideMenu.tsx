'use client'
import { usePathname } from 'next/navigation'
import { Button, Accordion, AccordionItem } from '@nextui-org/react'
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
    <>
      {menuAside?.map((item) =>
        item?.subItems !== null ? (
          <Accordion
            isCompact
            key={item.id}
            defaultExpandedKeys={[findId(pathname, menuAside)]}
            className="w-full pr-0"
            itemClasses={{
              base: 'py-0 px-0 w-full text-white',
              title: 'font-normal text-sm text-white w-full',
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
            className={`flex text-white/70 text-sm justify-start rounded-lg first-letter:capitalize ${
              item?.hrefLink === pathname && 'bg-[#2E3A4D] text-white'
            } `}
            startContent={item?.icon}
            size="sm"
          >
            {item?.nameOption}
          </Button>
        )
      )}
    </>
  )
}
