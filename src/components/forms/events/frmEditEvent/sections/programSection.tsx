/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useState } from 'react'
import { Button, Divider, Input } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { useFormContext, Controller } from 'react-hook-form'
import { ListPrograms } from './programs/listPrograms'

export const ProgramSection = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { control, watch } = useFormContext()
  //   const programSelected: IProgram = dataPrograms.find(
  //     (program) => program.id === watch('program_id')
  //   ) as IProgram

  return (
    <>
      {/* <Controller
        name="program_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            aria-label="Programs"
            label="Programa"
            placeholder="Seleccionar programa"
            labelPlacement="outside"
            inputValue={query}
            onInputChange={(value) => setQuery(value)}
            value={value}
            onSelectionChange={(value) => onChange(value)}
            defaultSelectedKey={String(watch('program_id'))}
            isLoading={loading}
            description="Seleccione el programa al que pertenece el evento, es opcional"
          >
            {dataPrograms?.map((program) => (
              <AutocompleteItem
                key={String(program?.id)}
                value={program?.id}
              >
                {program?.title} - {program?.date}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        )}
      /> */}
      <Controller
        name="program_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            aria-label="Programs"
            label="Programa"
            labelPlacement="outside"
            placeholder="Seleccionar programa"
            value={value}
            onChange={onChange}
            description="Seleccione el programa al que pertenece el evento, es opcional"
            endContent={
              <div>
                <Button
                  size="sm"
                  radius="sm"
                  startContent={<IconLink size={16} />}
                  onPress={() => setIsOpen(true)}
                >
                  Seleccionar
                </Button>
              </div>
            }
          />
        )}
      />
      <DrawerSelect
        isOpen={isOpen}
        setOpen={setIsOpen}
      />
    </>
  )
}

interface IProps {
  isOpen: boolean
  setOpen: (value: boolean) => void
}

export const DrawerSelect = (props: IProps) => {
  const { isOpen, setOpen } = props

  const drawerClasses = `fixed top-0 right-0 z-40 h-screen overflow-y-auto transition-transform ${
    isOpen ? 'translate-x-0' : 'translate-x-full'
  } bg-white w-[520px] dark:bg-gray-800`

  const overlayClasses = `fixed top-0 right-0 bottom-0 left-0 z-40 transition-opacity ${
    isOpen ? 'opacity-50 ' : 'opacity-0 pointer-events-none'
  } bg-black`

  return (
    <>
      <div
        className={overlayClasses}
        onClick={() => setOpen && setOpen(false)}
      />
      <div
        id="drawer"
        aria-label="drawer"
        className={drawerClasses}
        tabIndex={-1}
      >
        <header className="px-4 py-2">
          <h2 className="text-lg text-gray-500">Seleccionar programa</h2>
        </header>
        <Divider />
        <main className="overflow-y-auto h-[calc(100%-6rem)] p-4">
          <ListPrograms />
        </main>
        <Divider />
        <footer className="flex justify-end gap-3 p-2">
          <Button
            size="sm"
            radius="sm"
            onPress={() => setOpen(false)}
            variant="bordered"
          >
            Cancelar
          </Button>
        </footer>
      </div>
    </>
  )
}
