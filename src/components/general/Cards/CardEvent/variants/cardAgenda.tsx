'use client'
import { IEvent } from '@/types'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  User,
} from '@nextui-org/react'
import Link from 'next/link'

interface IProps {
  event: IEvent
}

export const CardAgendaEvent = (props: IProps) => {
  return (
    <>
      <Card shadow="none">
        <CardBody>
          <h2>Hora</h2>
          <h3>Sala</h3>
          <h1>TITULO</h1>
          <div>
            <User
              name="Nombre del ponente"
              description="Descripción del ponente"
            />
          </div>
          <Divider />
          <p>Fecha con icono</p>
          <p>Hora con icono</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            variant="light"
            as={Link}
            href={`/agenda/${props.event.id}`}
          >
            Leer más
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
