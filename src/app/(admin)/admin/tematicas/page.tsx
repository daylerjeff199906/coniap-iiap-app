import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { ListTopics } from '@/modules/admin'

export default function Page() {
  return (
    <>
      <section className="flex gap-4 justify-between items-center">
        <h1 className="text-2xl font-bold">Temáticas</h1>
        <Button
          color="primary"
          as={Link}
          href="/admin/tematicas/nuevo"
          size="sm"
        >
          Añadir tema
        </Button>
      </section>
      <section className="py-6">
        <ListTopics />
      </section>
    </>
  )
}
