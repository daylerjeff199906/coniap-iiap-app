interface IProps {
  type: 'success' | 'error' | 'warning' | 'info'
  title?: React.ReactNode
  message: string
}

export const AlertCustom = (props: IProps) => {
  const { message, type, title } = props

  const types = {
    success: 'bg-green-50 border-green-400 text-green-700',
    error: 'bg-red-50 border-red-400 text-red-700',
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-700',
    info: 'bg-blue-50 border-blue-400 text-blue-700',
  }

  return (
    <div
      className={`p-4 border-l-8 rounded-md font-medium flex flex-col gap-2 ${types[type]}`}
    >
      <div className="flex flex-col gap-1">
        <div className="text-sm font-semibold">{title}</div>
        {message && <p className="text-xs">{message}</p>}
      </div>
    </div>
  )
}
