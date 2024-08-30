import { AlertCustom } from '@/modules/core'
import { IUser } from '@/types'
import { formatDate, getConferenceStatus, getUser } from '@/utils/functions'
import infoData from '@/utils/json/infoConiap.json'

export default async function Page() {
  const user: IUser = (await getUser()) as IUser

  const name = infoData.data.title.es
  const siglas = infoData.data.siglas
  const modalidad = infoData.data.modalidad

  const dateFormatted = formatDate(
    infoData.data.dates.summary.end,
    'DD/MM/YYYY'
  )
  const { isBeforeSummary } = getConferenceStatus(infoData.data.dates)

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
      <section>
        <p>
          ¡ Bienvenido a {name} - {siglas}, modalidad {modalidad} !
        </p>
      </section>
      <section className="flex flex-col gap-4">
        <main>
          <AlertCustom
            showIcon
            title="Atención, fecha límite"
            type={isBeforeSummary ? 'warning' : 'error'}
            message={`La fecha límite para enviar resúmenes es ${dateFormatted}. ${
              isBeforeSummary
                ? '¡No te quedes sin participar!'
                : '¡Fecha límite vencida!'
            }`}
          />
        </main>
      </section>
    </div>
  )
}
