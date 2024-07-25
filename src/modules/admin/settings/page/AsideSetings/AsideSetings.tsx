'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const options = [
  {
    title: 'Configuración general',
    url: '/admin/settings',
  },
  {
    title: 'Peronal del comité',
    url: '/admin/settings/committee',
  },
]
export const AsideSetings = () => {
  const pathname = usePathname()

  return (
    <aside className="flex flex-col w-full gap-1 max-w-40 sticky top-20 z-10 h-full">
      {options.map((option, index) => (
        <Link
          key={index}
          href={option.url}
          className={`${
            pathname === option.url
              ? 'bg-primary-700 font-bold text-white'
              : 'hover:bg-primary-50'
          } p-2 text-xs rounded-md`}
        >
          {option.title}
        </Link>
      ))}
    </aside>
  )
}
