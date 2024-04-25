import { BannerStatic } from '@/components'
import { TabsSections } from '@/modules/user'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BannerStatic
        title="Mi perfil"
        urlImage=""
        subtitle="¡Bienvenido!"
        description="Aquí puedes ver y editar tu perfil."
      />
      <TabsSections />
      <main className="container">{children}</main>
    </>
  )
}
