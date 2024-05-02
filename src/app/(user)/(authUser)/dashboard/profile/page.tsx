'use client'
import { FrmProfile } from '@/modules/user'

export default function Page() {
  return (
    <>
      <main className="flex flex-col gap-4">
        <section>
          <h1 className="sm:text-xl font-semibold">Configurar perfil</h1>
          <p className="text-gray-500">
            Mantén actualizada tu información personal
          </p>
        </section>
        <section>
          <FrmProfile />
        </section>
      </main>
    </>
  )
}
