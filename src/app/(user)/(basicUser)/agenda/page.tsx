/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { LoadingPages } from '@/components'
import { usePrograms } from '@/hooks/client'
import { DataNotFound } from '@/components'

export default function Page() {
  const { getPrograms, programs, loading } = usePrograms()

  useEffect(() => {
    getPrograms()
  }, [])

  return (
    <>
      <main className="container">
        {programs !== null && programs.length > 0 ? (
          <>
            <section className="py-4">
              <h1>Eventos</h1>
            </section>
          </>
        ) : (
          <DataNotFound />
        )}
      </main>
      <LoadingPages isOpen={loading} />
    </>
  )
}
