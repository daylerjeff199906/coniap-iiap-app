import { IGeneralData } from '@/types'
import { FrmComiteEditor, FrmInfoGeneral } from '../../components'

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
        <div>
          <h1 className="font-bold text-sm">Comité organizador</h1>
          <p className="text-xs text-gray-500">
            Información sobre el comité organizador del evento.
          </p>
        </div>
        <div>
          <FrmComiteEditor
            typeComite="c_organizador"
            list={data?.c_organizador}
          />
        </div>
      </section>
      <section className="section-admin grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <h1 className="font-bold text-sm">Comité científico</h1>
          <p className="text-xs text-gray-500">
            Información sobre el comité científico del evento.
          </p>
        </div>
        <div></div>
      </section>
      <section className="section-admin grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <h1 className="font-bold text-sm">
            Comité de informática y difusión
          </h1>
          <p className="text-xs text-gray-500">
            Información sobre el comité de informática y difusión del evento.
          </p>
        </div>
        <div></div>
      </section>
      <section className="section-admin grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <h1 className="font-bold text-sm">Links de interés</h1>
          <p className="text-xs text-gray-500">
            Links de interés para los participantes del evento.
          </p>
        </div>
        <div></div>
      </section>
    </div>
  )
}
