'use client'
import { DatesEvent, InfoGeneral } from './sections'

export const FrmAddEvent = () => {
  return (
    <>
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Agregar Evento</h1>
        <InfoGeneral />
        <DatesEvent />
      </div>
    </>
  )
}
