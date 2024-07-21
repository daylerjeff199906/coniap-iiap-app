'use client'
import { Select, SelectItem, Selection } from '@nextui-org/react'

interface ITypesSearch {
  selectedKey?: string[] | undefined
  onSelectionChange?: (value: Selection) => void
}

export const TypesSearch = (props: ITypesSearch) => {
  const { onSelectionChange, selectedKey } = props

  return (
    <>
      <Select
        aria-label="Select"
        size="sm"
        radius="sm"
        defaultSelectedKeys={['name']}
        popoverProps={{
          radius: 'sm',
          size: 'sm',
        }}
        classNames={{
          base: 'h-8',
          value: 'text-tiny radius-sm',
        }}
        disallowEmptySelection
        selectedKeys={selectedKey}
        onSelectionChange={onSelectionChange}
      >
        <SelectItem
          key="name"
          classNames={{
            title: 'text-tiny',
          }}
        >
          por nombres
        </SelectItem>
        <SelectItem
          key="surname"
          classNames={{
            title: 'text-tiny',
          }}
        >
          por apellido
        </SelectItem>
        <SelectItem
          key="email"
          classNames={{
            title: 'text-tiny',
          }}
        >
          por correo
        </SelectItem>
      </Select>
    </>
  )
}
