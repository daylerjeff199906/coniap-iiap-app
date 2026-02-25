'use client'
import { useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ISummary } from '@/types'
import { cn } from '@/lib/utils'

interface IProps {
  isEdit: boolean
  summary: ISummary
  children?: React.ReactNode
}

export const ModalSummary = (props: IProps) => {
  const { summary, children, isEdit } = props
  const router = useRouter()

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back()
    }
  }

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent className={cn("p-0 overflow-hidden", isEdit ? "sm:max-w-3xl" : "sm:max-w-2xl")}>
        <DialogHeader className="px-6 py-4">
          <DialogTitle>
            {isEdit ? summary.title : 'Detalles del resumen'}
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="px-6 py-4 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
