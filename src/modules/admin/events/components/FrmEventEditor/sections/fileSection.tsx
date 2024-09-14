'use client'
import { useState } from 'react'
import { Button, Checkbox, Input, cn } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { useFormContext, Controller } from 'react-hook-form'
import { DrawerSelect } from '@/components'
import { IEvent } from '@/types'

export const FileSection = () => {
  const { control, watch, setValue } = useFormContext<IEvent>()

  return (
    <section className="flex flex-col gap-3 w-full section-admin"></section>
  )
}
