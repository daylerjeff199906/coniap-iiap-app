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
          description="Puedes realizar seguimiento de tus resumenes y  perfil registrado"
        />
        <section className="container flex flex-col sm:flex-row gap-4 py-4">
          <TabsSections />
          <main className="w-full sm:p-4 lg:p-6 min-h-72">{children}</main>
        </section>
      </AuthProvider>
    </>
  )
}
