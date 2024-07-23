import { GeneralInfo } from '@/modules/admin'
import { fetchInformationById } from '@/api'

export default async function page() {
  const res = await fetchInformationById(1)

  if (!res) {
    return (
      <>
        <div>
          <h1>Error al traer los datos</h1>
        </div>
      </>
    )
  }
  return <GeneralInfo data={res} />
}
