'use client'
import { useEffect, useState } from 'react'
import { Button, Divider, Switch, cn } from '@nextui-org/react'
import { useFiles } from '@/hooks/admin'
import { useRouter } from 'next/navigation'

interface IProps {
  id: string
  path: string
  status: boolean
}

export const DialogStatus = (props: IProps) => {
  const [newStatus, setNewStatus] = useState<boolean>()

  const { id, path, status } = props
  const { editField, loading } = useFiles()
  const router = useRouter()

  useEffect(() => {
    setNewStatus(status)
  }, [status])

  const handleStatusChange = async (id: string, value: boolean) => {
    await editField(id, `${path}`, 'isActived', value ? 'TRUE' : 'FALSE')
    handleExit()
  }

  const handleExit = () => {
    router.back()
  }

  return (
    <>
      <article>
        <header>
          <h1>Cambiar estado</h1>
        </header>
        <Divider />
        <main className="py-4">
          <Switch
            classNames={{
              base: cn(
                'inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center',
                'justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
                'data-[selected=true]:border-primary'
              ),
              wrapper: 'p-0 h-4 overflow-visible',
              thumb: cn(
                'w-6 h-6 border-2 shadow-lg',
                'group-data-[hover=true]:border-primary',
                //selected
                'group-data-[selected=true]:ml-6',
                // pressed
                'group-data-[pressed=true]:w-7',
                'group-data-[selected]:group-data-[pressed]:ml-4'
              ),
            }}
            isSelected={newStatus}
            onValueChange={(value) => setNewStatus(value)}
          >
            <div className="flex flex-col gap-1">
              <p className="text-medium">Activar </p>
              <p className="text-tiny text-default-400">
                Se activará el programa y será visible para los usuarios
              </p>
            </div>
          </Switch>
        </main>
        <Divider />
        <footer className="flex justify-end gap-2">
          <Button
            radius="sm"
            onPress={handleExit}
          >
            Cancelar
          </Button>
          <Button
            radius="sm"
            isLoading={loading}
            isDisabled={loading}
            className="button-dark"
            onPress={() => handleStatusChange(id, !status)}
          >
            Guardar
          </Button>
        </footer>
      </article>
    </>
  )
}
