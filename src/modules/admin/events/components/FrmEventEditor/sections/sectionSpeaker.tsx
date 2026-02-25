/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// import { useEvents } from '@/hooks/admin'
import { IconLink } from '@tabler/icons-react'
import { Controller, useFormContext } from 'react-hook-form'
import { DrawerSelect } from '@/components/general'
// import { ListSpeakers } from '../list/listSummaries'
import { IEvent } from '@/types'

export const SectionSpeaker = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { control } = useFormContext<IEvent>()

  return (
    <>
      <Controller
        name="summary_name"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            aria-label="Speakers"
            label="Ponente"
            
            placeholder="Seleccionar ponente"
            value={String(value) || ''}
            onChange={onChange}
            description="Seleccione el programa al que pertenece el evento, es opcional"
            // isInvalid={errors.person_id !== undefined}
            // errorMessage={errors.person_id?.message as string}
            endContent={
              <div>
                <Button onClick={() =>
  <IconLink size={16} />
  setIsOpen(true)}
                >
                  Seleccionar
</Button>
              </div>
            }
          />
        )}
      />
      {/* <DrawerSelect
        isOpen={isOpen}
        setOpen={setIsOpen}
        title="Seleccionar programa"
        content={<ListSpeakers onSetOpen={setIsOpen} />}
      /> */}
    </>
  )
}
