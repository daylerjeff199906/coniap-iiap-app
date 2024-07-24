import { IGeneralData } from '@/types'
import { FrmComiteEditor, FrmInfoGeneral } from '../../components'

interface IProps {
  data?: IGeneralData
}

export const CommitteInfo = (props: IProps) => {
  const { data } = props
  return (
    <div className="flex flex-col gap-3 w-full">
      <section className="section-admin grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
        <div className="col-span-1">
          <h1 className="font-bold text-sm">Comité organizador</h1>
          <p className="text-xs text-gray-500">
            Información sobre el comité organizador del evento.
          </p>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <FrmComiteEditor
            typeComite="c_organizador"
            list={data?.c_organizador}
          />
        </div>
      </section>
      <section className="section-admin grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
        <div className="col-span-1 ">
          <h1 className="font-bold text-sm">Comité científico</h1>
          <p className="text-xs text-gray-500">
            Información sobre el comité científico del evento.
          </p>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <FrmComiteEditor
            typeComite="c_cientifico"
            list={data?.c_cientifico}
          />
        </div>
      </section>
      <section className="section-admin grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
        <div className="col-span-1 ">
          <h1 className="font-bold text-sm">
            Comité de informática y difusión
          </h1>
          <p className="text-xs text-gray-500">
            Información sobre el comité de informática y difusión del evento.
          </p>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <FrmComiteEditor
            typeComite="c_informatica"
            list={data?.c_informatica}
          />
        </div>
      </section>
    </div>
  )
}
