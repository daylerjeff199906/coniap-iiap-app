'use client'
import { BannerStatic } from '@/components'
import { TabsSections, AuthProvider } from '@/modules/user'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <BannerStatic
          title="Mi perfil"
          urlImage=""
          subtitle="¡Bienvenido!"
          description="Aquí puedes ver y editar tu perfil."
        />
        <section className="container sm:flex gap-4 py-4">
          <aside className="hidden sm:block">
            <TabsSections />
          </aside>
          <main className="w-full sm:p-4 lg:p-6">{children}</main>
        </section>
      </AuthProvider>
    </>
  )
}
