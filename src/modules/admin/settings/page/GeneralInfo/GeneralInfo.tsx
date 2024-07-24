import { IGeneralData } from '@/types'
import { FrmInfoGeneral } from '../../components'
import Link from 'next/link'

interface IProps {
  data?: IGeneralData
}

export const GeneralInfo = (props: IProps) => {
  const { data } = props
  return (
    <div className="flex flex-col gap-3">
      <section className="section-admin grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="col-span-1 ">
          <h1 className="font-bold text-sm">Información general</h1>
          <p className="text-xs text-gray-500">
            Descripción general del sitio web. Esta información se mostrará en
            la página de {`"Sobre nosotros"`}
          </p>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <FrmInfoGeneral description={data?.description} />
        </div>
      </section>
      <section className="section-admin grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="col-span-1 ">
          <h1 className="font-bold text-sm">Formato de presentación</h1>
          <p className="text-xs text-gray-500">
            Formato de resumen para los participantes del evento.
          </p>
          <Link
            href="https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/files%2Fformato_resumen_III-CONIAP-2024.docx?alt=media&token=9c893f8a-74c4-4564-a126-28f81965ccac"
            download={true}
            className="text-xs text-blue-500 hover:underline"
          >
            Descargar formato
          </Link>
        </div>
        <div className="col-span-1 sm:col-span-2"></div>
      </section>
      <section className="section-admin grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="col-span-1 ">
          <h1 className="font-bold text-sm">Links de interés</h1>
          <p className="text-xs text-gray-500">
            Links de interés para los participantes del evento.
          </p>
        </div>
        <div className="col-span-1 sm:col-span-2"></div>
      </section>
    </div>
  )
}
