'use client'
import { Button } from '@nextui-org/react'
import { InfoGeneral, MoreInfo } from './sections'

export const FrmAddEvent = () => {
  return (
    <>
      <form className="space-y-3">
        <h1 className="text-2xl font-bold">Agregar Evento</h1>
        <InfoGeneral />
        <MoreInfo />
        <div className="flex items-center gap-4">
          <Button color="primary">Agregar evento</Button>
          <Button>Cancelar</Button>
        </div>
      </form>
    </>
  )
}
