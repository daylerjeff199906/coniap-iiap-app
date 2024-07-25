/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useSalas } from '@/hooks/admin'
import { useEffect } from 'react'
import { CardRoom } from '../components'

export const ListRooms = () => {
  const { loading, listRooms, getRooms } = useSalas()

  useEffect(() => {
    getRooms('')
  }, [])

  return (
    <main>
      {loading && <p>Cargando...</p>}
      <section className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
        {listRooms?.map((room) => (
          <CardRoom
            key={room.id}
            room={room}
          />
        ))}
      </section>
    </main>
  )
}
