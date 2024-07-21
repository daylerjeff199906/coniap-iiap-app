'use client'
import { Button, Divider, Radio, RadioGroup, cn } from '@nextui-org/react'
import { useFiles } from '@/hooks/admin'
import { useRouter } from 'next/navigation'
import {
  FormProvider,
  useForm,
  SubmitHandler,
  Controller,
} from 'react-hook-form'
import { toast } from 'react-toastify'

interface IProps {
  id: string
  path: string
  status: boolean
}

const optValues = [
  {
    value: 'TRUE',
    label: 'Activo',
    description:
      'Cualquiera dentro y fuera del sistema podrán ver tu publicación',
  },
  {
    value: 'FALSE',
    label: 'Inactivo',
    description: 'Será ocultado para el público, visible solo en el sistema',
  },
]

export const DialogStatus = (props: IProps) => {
  const { id, path, status } = props
  const { editField, loading } = useFiles()
  const router = useRouter()

  const methods = useForm<{ status: boolean }>({
    defaultValues: {
      status: status,
    },
  })

  const handleStatusChange = async (id: string, value: boolean) => {
    const res = await editField(
      id,
      `${path}`,
      'isActived',
      value ? 'TRUE' : 'FALSE',
      true
    )

    if (res) {
      toast.success('Estado actualizado correctamente')
      handleExit()
    } else {
      toast.error('Error al actualizar estado')
    }
  }

  const onSubmit: SubmitHandler<{ status: boolean }> = (data) => {
    handleStatusChange(id, data.status)
  }

  const handleExit = () => {
    router.back()
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4 w-full rounded-lg border p-4 max-w-xl bg-white"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <header className="w-full">
            <h1 className="font-bold">Configuración de privacidad</h1>
            <p className="text-xs">
              Cambia la configuración de privacidad para controlar quién puede
              ver tu publicación en la seccion de blog (o publicaciones)
            </p>
          </header>
          <main className="w-full">
            <Controller
              control={methods.control}
              name="status"
              render={({ field: { value, onChange } }) => (
                <RadioGroup
                  value={value ? 'TRUE' : 'FALSE'}
                  onValueChange={(value) => onChange(value === 'TRUE')}
                  size="sm"
                >
                  {optValues.map((opt, index) => (
                    <Radio
                      key={index}
                      value={opt.value}
                      classNames={{
                        base: cn(
                          'm-0 bg-content1 hover:bg-content2 items-center',
                          'cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent min-w-full',
                          'data-[selected=true]:border-primary'
                        ),
                        label: cn('font-semibold'),
                      }}
                      description={opt.description}
                    >
                      {opt.label}
                    </Radio>
                  ))}
                </RadioGroup>
              )}
            />
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
              type="submit"
            >
              Guardar
            </Button>
          </footer>
        </form>
      </FormProvider>
    </>
  )
}

// export const CustomRadio = (props: {
//   children: React.ReactNode
//   value: string
//   selected: boolean
//   onClick: () => void
// }) => {
//   const { children, ...otherProps } = props

//   return (
//     <Radio
//       {...otherProps}
//       classNames={{
//         base: cn(
//           'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
//           'flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
//           'data-[selected=true]:border-primary'
//         ),
//       }}
//     >
//       {children}
//     </Radio>
//   )
// }
