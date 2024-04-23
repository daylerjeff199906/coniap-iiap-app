'use client'
import { ListSummaries } from '@/modules/admin'
import { Button, Tab, Tabs } from '@nextui-org/react'
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
      <div className="flex gap-2 items-center justify-between pb-4">
        <h1 className="text-2xl font-bold">Resúmenes</h1>
        <Button
          color="primary"
          size="sm"
        >
          Añadir resumen
        </Button>
      </div>
      <ListSummaries />
    </>
  )
}
