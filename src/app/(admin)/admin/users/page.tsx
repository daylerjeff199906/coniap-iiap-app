import { ListUsers } from '@/modules/admin'
import { HeaderSection } from '@/modules/core'

export default function Page() {
  return (
    <main className="flex flex-col gap-3">
      <HeaderSection
        title="Usuarios"
        subtitle="Lista de usuarios"
        isButtonVisible
        href="/admin/users/nuevo"
        labelButton="Nuevo usuario"
      />
      <section>
        <ListUsers />
      </section>
    </main>
  )
}
