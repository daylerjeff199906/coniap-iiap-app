'use client'
import { useState } from 'react'
import { IUserCreate } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IconUserSearch, IconUserCheck } from '@tabler/icons-react'
import { DrawerSelect } from '@/components/general'
import { ListPersons } from './listPersons'
import { cn } from '@/lib/utils'

export const PersonData = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<IUserCreate>()

  const onSelectedSpeaker = (row: any) => {
    setValue('person_detail', row)
    setValue('person', row.key)
    setIsOpen(false)
  }

  return (
    <>
      <div className="space-y-4 p-6 bg-muted/20 border-2 border-dashed rounded-2xl animate-in fade-in duration-500">
        <header className="flex flex-col gap-1">
          <Label className="text-sm font-black uppercase tracking-widest text-primary italic">Asignar Persona</Label>
          <p className="text-xs text-muted-foreground">Si el usuario ya está registrado como persona en el sistema, selecciónalo aquí.</p>
        </header>

        <Controller
          name="person_detail"
          control={control}
          render={({ field: { value } }) => (
            <div className="flex flex-col gap-3">
              <div className={cn(
                "flex items-center gap-4 p-4 border-2 rounded-xl transition-all",
                value ? "bg-primary/5 border-primary/20 shadow-inner" : "bg-background border-muted"
              )}>
                <div className={cn(
                  "h-12 w-12 rounded-full flex items-center justify-center shrink-0",
                  value ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                )}>
                  {value ? <IconUserCheck size={24} /> : <IconUserSearch size={24} />}
                </div>

                <div className="flex-1 min-w-0">
                  {value ? (
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-bold text-base truncate uppercase tracking-tight italic">
                        {value.name} {value.surName}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">{value.email}</span>
                    </div>
                  ) : (
                    <span className="text-sm font-medium text-muted-foreground italic">Ninguna persona seleccionada</span>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  variant={value ? "outline" : "default"}
                  className="gap-2 font-bold rounded-lg shadow-sm"
                >
                  {value ? 'Cambiar' : 'Seleccionar'}
                </Button>
              </div>

              {errors.person_detail && (
                <p className="text-xs font-bold text-destructive animate-pulse">
                  {errors.person_detail.message as string}
                </p>
              )}
            </div>
          )}
        />
      </div>

      <DrawerSelect
        isOpen={isOpen}
        setOpen={setIsOpen}
        title="Seleccionar Persona Registrada"
        content={<ListPersons onSelectedSpeaker={onSelectedSpeaker} />}
      />
    </>
  )
}
