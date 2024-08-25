'use client'
import {
  IconInfoCircle,
  IconXboxX,
  IconCircleCheck,
  IconExclamationCircle,
} from '@tabler/icons-react'

interface IProps {
  type: 'success' | 'error' | 'warning' | 'info'
  title: React.ReactNode
  message?: React.ReactNode
  showIcon?: boolean
}

export const AlertCustom = (props: IProps) => {
  const { message, type, title, showIcon } = props

  const types = {
    success: 'bg-green-50 border-green-400 text-green-700',
    error: 'bg-red-50 border-red-400 text-red-700',
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-700',
    info: 'bg-blue-50 border-blue-400 text-blue-700',
  }

  const icons = {
    success: <IconCircleCheck size={20} />,
    error: <IconXboxX size={20} />,
    warning: <IconExclamationCircle size={20} />,
    info: <IconInfoCircle size={20} />,
  }

  return (
    <div
      className={`p-4 sm:p-6 border-l-8 rounded-md font-medium flex flex-row items-start gap-4 lg:gap-8 ${types[type]}`}
    >
      {showIcon && (
        <section>
          <div className={`p-2 rounded-md shadow-lg`}>
            <div className="flex items-center justify-center">
              {icons[type]}
            </div>
          </div>
        </section>
      )}
      <div className="flex flex-col gap-1">
        <div className="text-sm font-semibold">{title}</div>
        {message && <div className="text-xs">{message}</div>}
      </div>
    </div>
  )
}
