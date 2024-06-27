import { ListTopics } from '@/modules/admin'
import { HeaderSection } from '@/modules/core'

export default function Page() {
  return (
    <>
      <HeaderSection
        title="Tematicas"
        subtitle="Lista de líneas temáticas a lo largo de los años"
        isButtonVisible
        href="/admin/tematicas/nuevo"
        labelButton="Nueva temática"
      />
      <section className="py-6">
        <ListTopics />
      </section>
    </>
  )
}
