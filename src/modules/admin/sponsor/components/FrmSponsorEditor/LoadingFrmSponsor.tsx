/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'

export const LoadingFrmSponsor = () => {
  return (
    <Dialog open>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader className="space-y-4">
          <Skeleton className="w-1/4 h-4 rounded-md" />
          <Skeleton className="w-full h-6 rounded-md" />
        </DialogHeader>
        <div className="space-y-4 w-full py-4">
          <div className="w-full space-y-3">
            <Skeleton className="w-1/4 h-4 rounded-md" />
            <Skeleton className="w-full h-10 rounded-md" />
          </div>
          <div className="w-full space-y-3">
            <Skeleton className="w-1/4 h-4 rounded-md" />
            <Skeleton className="w-full h-32 rounded-md" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
