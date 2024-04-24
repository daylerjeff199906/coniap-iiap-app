import { ISummary } from '@/types'
import { Avatar, Button, Chip, Divider } from '@nextui-org/react'
import Link from 'next/link'
import { IconPdf } from '@tabler/icons-react'

interface IProps {
  summary: ISummary
}
export const FrmDetailSummary = (props: IProps) => {
  const { summary } = props
  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <Chip
            size="sm"
            radius="sm"
            variant="flat"
            color={summary?.isApproved ? 'success' : 'warning'}
          >
            {summary?.isApproved ? 'Aprobado' : 'Pendiente'}
          </Chip>
          <h1 className="text-2xl font-bold">{summary?.title}</h1>
          <p className="text-xs">
            <span className="font-semibold">Fecha de creación:</span>{' '}
            {summary?.created_at}
          </p>
        </div>
        <h1 className="font-semibold">Autor | Ponente</h1>
        <Divider />
        <div className="flex items-center gap-4">
          <Avatar
            src={summary?.person?.image}
            alt={summary.person?.name}
            size="lg"
          />
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">{summary.person?.name}</p>
              <p className=" font-medium ">{summary.person?.surName}</p>
            </div>
            <p className="text-slate-500 font-medium text-sm">
              {summary.person?.email}
            </p>
          </div>
        </div>
        <div>
          <Button
            size="lg"
            radius="sm"
            color="danger"
            as={Link}
            href={summary?.file}
            target='_blank'
            isDisabled={!summary?.file}
            fullWidth
            startContent={<IconPdf size={20} />}
          >
            Ver resumen
          </Button>
        </div>
      </div>
    </div>
  )
}
