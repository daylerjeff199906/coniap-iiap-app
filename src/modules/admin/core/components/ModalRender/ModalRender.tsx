'use client'

import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface IProps {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | '2xl' | '3xl'
}

export const ModalRender = (props: IProps) => {
  const { children, footer, header, size } = props
  const router = useRouter()

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back()
    }
  }

  // Map size to max-width classes
  const sizeClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
    '3xl': 'sm:max-w-3xl',
    full: 'sm:max-w-[95vw]',
  }

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent className={cn("p-0 overflow-hidden", size ? sizeClasses[size] : sizeClasses.md)}>
        {header && (
          <>
            <DialogHeader className="px-6 py-4">
              <DialogTitle>{header}</DialogTitle>
            </DialogHeader>
            <Separator />
          </>
        )}
        <div className="px-6 py-4 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
        {footer && (
          <>
            <Separator />
            <DialogFooter className="px-6 py-4">
              {footer}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
