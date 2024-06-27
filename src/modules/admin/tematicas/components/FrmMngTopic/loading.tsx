import { Skeleton } from '@nextui-org/react'

export const Loading = () => {
  return (
    <>
      <div className="space-y-4 w-full">
        <div className="w-full space-y-3">
          <Skeleton className="w-1/4 h-4 rounded-md" />
          <Skeleton className="w-full h-6 rounded-md" />
        </div>
        <div className="w-full space-y-3">
          <Skeleton className="w-1/4 h-4 rounded-md" />
          <Skeleton className="w-full h-12 rounded-md" />
        </div>
      </div>
    </>
  )
}
