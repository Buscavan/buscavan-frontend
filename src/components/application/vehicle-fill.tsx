'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { api } from '@/api/axios'
import debounce from 'lodash.debounce'
import { endpoints } from '@/api/endpoints'

interface Vehicle {
  id: number
  modelo: string
  placa: string
  capacidade: number
  fotoVeiculoUrl: string
  createdAt: string
  updatedAt: string
  motoristaCPF: string
}

interface VehicleFillProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  setValue: <TFieldName extends Path<TFieldValues>>(
    name: TFieldName,
    value: TFieldValues[TFieldName],
    options?: {
      shouldValidate?: boolean
      shouldDirty?: boolean
      shouldTouch?: boolean
    },
  ) => void
  userId: string
}

interface FillProps {
  value: string
  label: string
}

export function VehicleFill<TFieldValues extends FieldValues>({
  control,
  name,
  setValue,
  userId,
}: VehicleFillProps<TFieldValues>) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [vehicleList, setVehicleList] = useState<FillProps[]>([])
  const [, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)
  const [selectedVehicleName, setSelectedVehicleName] = useState<string | null>(
    null,
  )

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async (query = '') => {
    setLoading(true)
    try {
      const response = await api.get(
        `${endpoints.listVehicles.replace('{id}', userId)}${query ? '?query=' + query : ''}`,
      )
      const vehicles: Vehicle[] = response.data

      if (!Array.isArray(vehicles)) {
        console.error('Invalid vehicles data structure:', vehicles)
        setLoading(false)
        return
      }

      const formattedVehicles = vehicles.map((vehicle) => ({
        value: vehicle.id.toString(),
        label: `${vehicle.modelo}, ${vehicle.placa}`,
      }))

      setVehicles(vehicles)
      setVehicleList(formattedVehicles)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching vehicles:', error)
      setLoading(false)
    }
  }

  const debouncedFetchVehicles = useCallback(
    debounce((query: string) => {
      fetchVehicles(query)
    }, 200),
    [],
  )

  const handleSearchChange = (value: string) => {
    setSearch(value)
    debouncedFetchVehicles(value)
  }

  const handleSelect = (
    vehicle: FillProps,
    onChange: (value: string) => void,
  ) => {
    const newValue = vehicle.value === selectedVehicle ? '' : vehicle.value
    onChange(newValue)
    setSelectedVehicle(newValue)
    setSelectedVehicleName(newValue ? vehicle.label : null)

    if (newValue) {
      const selectedVehicle = vehicles.find((v) => v.id.toString() === newValue)
      if (selectedVehicle) {
        setValue(
          'vehicle' as Path<TFieldValues>,
          selectedVehicle.id as TFieldValues[Path<TFieldValues>],
        )
        setValue(
          'plate' as Path<TFieldValues>,
          selectedVehicle.placa as TFieldValues[Path<TFieldValues>],
        )
        setValue(
          'passengers' as Path<TFieldValues>,
          selectedVehicle.capacidade as TFieldValues[Path<TFieldValues>],
        )
      }
    } else {
      setValue(
        'vehicle' as Path<TFieldValues>,
        null as TFieldValues[Path<TFieldValues>],
      )
      setValue(
        'plate' as Path<TFieldValues>,
        null as TFieldValues[Path<TFieldValues>],
      )
      setValue(
        'passengers' as Path<TFieldValues>,
        null as TFieldValues[Path<TFieldValues>],
      )
    }

    console.log('Selected Vehicle ID:', vehicle.value)
    console.log('Selected Vehicle Name:', vehicle.label)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full flex items-center justify-between"
              >
                {selectedVehicleName || 'Selecione um veículo...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Selecione um veículo..."
                  onValueChange={handleSearchChange}
                />
                <CommandList>
                  <CommandEmpty>
                    {loading
                      ? 'Carregando...'
                      : 'Nenhum veículo foi encontrado.'}
                  </CommandEmpty>
                  <CommandGroup>
                    {vehicleList.length > 0 && (
                      <>
                        {vehicleList.map((item) => (
                          <CommandItem
                            key={item.value}
                            value={item.value}
                            onSelect={() => handleSelect(item, onChange)}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                value === item.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {item.label}
                          </CommandItem>
                        ))}
                      </>
                    )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </>
      )}
    />
  )
}
