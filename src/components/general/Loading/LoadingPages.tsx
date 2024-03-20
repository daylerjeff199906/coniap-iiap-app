import { Progress } from '@nextui-org/react'

interface IProps {
  isOpen: boolean
}

export const LoadingPages = (props: IProps) => {
  const { isOpen } = props
  return (
    <>
      {isOpen && (
        <div className="absolute z-30 top-0 right-0 left-0">
          <Progress
            aria-label="loading"
            size="sm"
            isIndeterminate
          />
        </div>
      )}
    </>
  )
}
