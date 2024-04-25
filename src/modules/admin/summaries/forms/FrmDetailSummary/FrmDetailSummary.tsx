import { ISummary } from '@/types'
import { Avatar, Button, Chip, Divider } from '@nextui-org/react'
import { IconCheck } from '@tabler/icons-react'
import Link from 'next/link'
import { useSummaries } from '@/hooks/admin'
import { useRouter } from 'next/navigation'
import { LoadingPages } from '@/components'

interface IProps {
  summary: ISummary
}
export const FrmDetailSummary = (props: IProps) => {
  const { summary } = props
  const { approveSummary, loading } = useSummaries()
  const router = useRouter()

  const handelApprove = async () => {
    const res = await approveSummary(summary.id)
    if (res) {
      router.push('/admin/participantes/resumenes?status=approved')
    }
  }
  return (
    <>
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
          <div className="flex flex-col gap-3">
            <Button
              variant="light"
              radius="sm"
              color="primary"
              as={Link}
              href={summary?.file}
              target="_blank"
              isDisabled={!summary?.file}
              fullWidth
            >
              Ver resumen
            </Button>
            <Button
              variant="solid"
              radius="sm"
              color="success"
              target="_blank"
              isDisabled={!summary?.file || loading || summary?.isApproved}
              fullWidth
              startContent={<IconCheck size={20} />}
              onPress={handelApprove}
              className="text-white"
              isLoading={loading}
            >
              {summary?.isApproved ? 'Aprobado' : 'Aprobar'}
            </Button>
          </div>
        </div>
      </div>
      <LoadingPages isOpen={loading} />
    </>
  )
}
