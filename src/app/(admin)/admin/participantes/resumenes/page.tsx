'use client'
import { ListSummaries } from '@/modules/admin'
import { HeaderSection } from '@/modules/core'
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
    <main className="flex flex-col gap-3">
      {/* <Tabs
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
      </Tabs> */}

      <HeaderSection
        title="Temas (Resúmenes)"
        subtitle={
          listTabs?.find((tab) => tab.key === status)?.description || ''
        }
        isButtonVisible
        labelButton="Añadir resumen"
        href="/admin/participantes/resumenes/nuevo"
      />
      <ListSummaries />
    </main>
  )
}
