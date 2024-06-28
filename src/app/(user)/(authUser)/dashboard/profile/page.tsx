import { ProfileSection } from '@/modules/user'
import { fetchPersonByEmail } from '@/api'
import { getCookie } from '@/lib'
import { IUser, IResCookie } from '@/types'

export default async function Page() {
  const user: IResCookie = (await getCookie('user')) as unknown as IResCookie
  const dataParse: IUser = await JSON.parse(user.value as unknown as string)

  const res = await fetchPersonByEmail(dataParse.email)

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
          <ProfileSection person={res} />
        </section>
      </main>
    </>
  )
}
