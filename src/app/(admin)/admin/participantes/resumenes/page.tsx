'use client'
import { ListSummaries } from '@/modules/admin'
import { Button, Tab, Tabs } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

const listTabs = [
  {
    key: 'all',
    label: 'Todos',
    description: 'Todos los resúmenes',
  },
  {
    key: 'approved',
    label: 'Aprobados',
    description: 'Resúmenes aprobados',
  },
  {
    key: 'pending',
    label: 'Pendientes',
    description: 'Resúmenes pendientes',
  },
]

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const status = searchParams.get('status') || 'all'

  const handleTabChange = (key: string) => {
    if (key === 'all') {
      router.push('/admin/participantes/resumenes')
    } else {
      router.push(`/admin/participantes/resumenes?status=${key}`)
    }
  }

  return (
    <>
      <Tabs
        size="sm"
        variant="underlined"
        selectedKey={status}
        onSelectionChange={(key) => handleTabChange(String(key))}
      >
        {listTabs.map((tab) => (
          <Tab
            key={tab.key}
            title={tab.label}
          />
        ))}
      </Tabs>
      <div className="flex gap-2 items-center justify-between py-3">
        <div>
          <h1 className="text-2xl font-bold">Temas (Resúmenes)</h1>
          <p className="text-sm text-gray-500">
            {listTabs.find((tab) => tab.key === status)?.description}
          </p>
        </div>
        <Button
          color="primary"
          size="sm"
          as={Link}
          href="/admin/participantes/resumenes/nuevo"
        >
          Añadir resumen
        </Button>
      </div>
      <ListSummaries />
    </>
  )
}
