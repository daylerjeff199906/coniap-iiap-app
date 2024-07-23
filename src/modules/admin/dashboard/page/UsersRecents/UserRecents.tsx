'use client'
import { IUser } from '@/types'
import { ScrollShadow, User } from '@nextui-org/react'
import Link from 'next/link'

interface IProps {
  data: IUser[]
}

export const UserRecents = (props: IProps) => {
  const { data } = props
  return (
    <div className="section-admin w-full flex flex-col gap-2">
      <header>
        <h1 className="text-sm font-bold">Usuarios añadidos recientemente</h1>
        <p className="text-xs text-gray-500">
          Últimos 10 usuarios registrados en el sistema
        </p>
      </header>

      <ScrollShadow 
        hideScrollBar
        className="h-[300px]"
      >
        <section className="flex flex-col gap-1">
          {data.map((item) => {
            return (
              <div
                key={item.id}
                className=""
              >
                <User
                  name={item.userName}
                  avatarProps={{
                    src: item.photo,
                    color: 'secondary',
                  }}
                  description={item.email}
                />
              </div>
            )
          })}
        </section>
      </ScrollShadow>
      <footer className="flex justify-center">
        <Link
          href="/admin/users"
          className="text-xs text-primary-500"
        >
          Ver todos los usuarios
        </Link>
      </footer>
    </div>
  )
}
