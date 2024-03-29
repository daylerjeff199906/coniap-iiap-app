/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { ListShedule, LoadingPages } from '@/components'
import { usePrograms } from '@/hooks/client'
import { DataNotFound } from '@/components'

export default function Page() {
  const { getPrograms, programs, loading } = usePrograms()

  useEffect(() => {
    getPrograms()
  }, [])

  return (
    <>
      <div>
        {programs !== null && programs.length > 0 ? (
          <>
            <ListShedule programs={programs} />
          </>
        ) : (
          <DataNotFound />
        )}
      </div>
      <LoadingPages isOpen={loading} />
    </>
  )
}
