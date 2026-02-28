import { Progress } from '@/components/ui/progress'

interface IProps {
  isOpen: boolean
}

export const LoadingPages = (props: IProps) => {
  const { isOpen } = props

  if (!isOpen) return null

  return (
    <div className="fixed inset-x-0 top-0 z-[100] h-1">
      <Progress className="h-1 rounded-none" value={undefined} />
      <div className="fixed inset-0 bg-background/20 backdrop-blur-[1px]" />
    </div>
  )
}
