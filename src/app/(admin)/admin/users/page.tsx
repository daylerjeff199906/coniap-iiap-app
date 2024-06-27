import { ListUsers } from '@/modules/admin'
import { HeaderSection } from '@/modules/core'

export default function Page() {
  return (
    <>
      <HeaderSection
        title="Usuarios"
        subtitle="Lista de usuarios"
        isButtonVisible
        href="/admin/users/nuevo"
        labelButton="Nuevo usuario"
      />
      <ListUsers />
    </>
  )
}
