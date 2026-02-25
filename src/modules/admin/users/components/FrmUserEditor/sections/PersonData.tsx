'use client'
import { useState } from 'react'
import { IUserCreate } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IconLink } from '@tabler/icons-react'
import { DrawerSelect } from '@/components/general'
import { ListPersons } from './listPersons'

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
      <Controller
        name="person_detail"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            aria-label="person_detail"
            label="Persona"
            
            
            placeholder="Seleccionar una persona"
            value={value ? value.name + ' ' + value.surName : ''}
            onChange={onChange}
            description="Si ya está registrado, seleccione la persona"
            isInvalid={errors.person_detail !== undefined}
            errorMessage={errors.person_detail?.message as string}
            endContent={
              <div>
                <Button />
  <IconLink size={16
  }
                  onClick={() => setIsOpen(true)}
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
        title="Seleccionar persona"
        content={<ListPersons onSelectedSpeaker={onSelectedSpeaker} />}
      />
    </>
  )
}
