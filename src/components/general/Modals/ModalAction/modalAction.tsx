'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface IProps {
  isOpen: boolean
  setOpen: (value: boolean) => void
  title: string
  message?: string
  onPress: () => void
  bodyMessage?: React.ReactNode
}

export const ModalAction = ({
  isOpen,
  setOpen,
  title,
  message,
  bodyMessage,
  onPress,
}: IProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {message ? (
            <p className="text-sm text-muted-foreground">{message}</p>
          ) : (
            bodyMessage
          )}
        </div>
        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="default"
            onClick={onPress}
          >
            Aceptar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
