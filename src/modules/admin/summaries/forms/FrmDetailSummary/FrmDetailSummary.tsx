import { ISummary } from '@/types'
import { Avatar, Divider } from '@nextui-org/react'

interface IProps {
  summary: ISummary
}
export const FrmDetailSummary = (props: IProps) => {
  const { summary } = props
  return (
    <div>
      <div className="space-y-3">
        <h1 className="text-lg">Detalles</h1>
        <Divider />
        <p className="text-slate-500 font-medium">{summary.title}</p>
      </div>
      <div className="space-y-3">
        <h1 className="text-lg">Autor | Ponente</h1>
        <Divider />
        <div className="flex items-center gap-4">
          <Avatar
            src={summary?.person?.image}
            alt={summary.person?.name}
            size="md"
          />
          <div>
            <p className="font-semibold text-lg">{summary.person?.name}</p>
            <p className=" font-medium ">{summary.person?.surName}</p>
            <p className="text-slate-500 font-medium text-sm">
              {summary.person?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
