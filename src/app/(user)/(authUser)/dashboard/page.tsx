import { IUser } from '@/types'
import { getUser } from '@/utils/functions'
import infoData from '@/utils/json/infoConiap.json'

export default async function Page() {
  const user: IUser = (await getUser()) as IUser

  const name = infoData.data.title.es
  const siglas = infoData.data.siglas
  const modalidad = infoData.data.modalidad

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-1">
        <h1 className="text-xl">
          Hola,
          <span className="font-bold"> {user.userName}</span>
        </h1>
        <p className="text-sm text-gray-500">
          Tu correo es:
          <span className="font-bold"> {user.email}</span>
        </p>
      </section>
      <p>
        ¡ Bienvenido a {name} - {siglas}, modalidad {modalidad} !
      </p>
    </div>
  )
}
