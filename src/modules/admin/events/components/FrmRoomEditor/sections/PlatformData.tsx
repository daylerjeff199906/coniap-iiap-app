'use client'
import { ISala } from '@/types'
import { Avatar, Select, SelectItem } from '@nextui-org/react'
import { Controller, useFormContext } from 'react-hook-form'
import socialNetworks from '@/utils/json/social_networks.json'

export const PlatformData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ISala>()
  return (
    <div>
      <Controller
        control={control}
        name="platform"
        rules={{
          required: 'Selecione una plataforma para la sala',
        }}
        render={({ field: { value, onChange } }) => (
          <Select
            aria-label="Plataforma"
            label="Plataforma"
            labelPlacement="outside"
            placeholder="Plataforma"
            radius="sm"
            defaultSelectedKeys={['1']}
            disallowEmptySelection
            selectedKeys={[String(value)] || ['']}
            onChange={onChange}
            isInvalid={errors.platform !== undefined}
            items={socialNetworks}
            renderValue={(items) => {
              return items.map((item) => {
                return (
                  <div
                    className="w-full flex gap-2 items-center"
                    key={item.data?.id}
                  >
                    <Avatar
                      src={item?.data?.logo}
                      size="sm"
                    />
                    {item?.data?.name}
                  </div>
                )
              })
            }}
          >
            {(dataList) => (
              <SelectItem
                aria-label="modalidad-item"
                key={dataList.id}
                value={String(dataList.id)}
              >
                <div className="w-full flex gap-2 items-center">
                  <Avatar
                    src={dataList.logo}
                    size="sm"
                  />
                  {dataList.name}
                </div>
              </SelectItem>
            )}
          </Select>
        )}
      />
    </div>
  )
}
