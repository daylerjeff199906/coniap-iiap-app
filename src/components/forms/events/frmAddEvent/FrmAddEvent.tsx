'use client'
import { Button } from '@nextui-org/react'
import { InfoGeneral, MoreDescription, MoreInfo } from './sections'

export const FrmAddEvent = () => {
  return (
    <>
      <form className="space-y-3">
        <h1 className="text-2xl font-bold">Agregar Evento</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InfoGeneral />
          <MoreInfo />
        </div>
        <MoreDescription />
        <div className="flex items-center gap-4">
          <Button color="primary">Agregar evento</Button>
          <Button>Cancelar</Button>
        </div>
      </form>
    </>
  )
}
