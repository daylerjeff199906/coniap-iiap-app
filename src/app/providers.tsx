'use client'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastContainer
        position="top-right"
        theme="colored"
      />
      {children}
    </>
  )
}
