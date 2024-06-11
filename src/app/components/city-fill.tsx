'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface City {
  nome: string
  microrregiao: {
    mesorregiao: {
      UF: {
        sigla: string
      }
    }
  }
}

interface CityFillProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
}
 
interface FillProps {
  value: string
  label: string
}

export function CityFill<TFieldValues extends FieldValues>({
  control,
  name,
}: CityFillProps<TFieldValues>) {
  const [cities, setCities] = useState<FillProps[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (search.length >= 2) {
      fetchCities(search)
    } else {
      setCities([])
    }
  }, [search])

  const fetchCities = async (searchTerm: string) => {
    try {
      const statesResponse = await axios.get(
        'https://brasilapi.com.br/api/ibge/uf/v1',
      )
      const states: State[] = statesResponse.data

      const cityPromises = states.map(async (state: State) => {
        const response = await axios.get(
          `https://brasilapi.com.br/api/ibge/municipios/v1/${state.sigla}`,
        )
        const data: City[] = response.data
        return data
          .filter((city) =>
            city.nome.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .map((city) => ({
            value: `${city.nome}${city.microrregiao.mesorregiao.UF.sigla}`,
            label: `${city.nome}, ${city.microrregiao.mesorregiao.UF.sigla}`,
          }))
      })

      const citiesData = await Promise.all(cityPromises)
      const flattenedCities = citiesData.flat()
      setCities(flattenedCities)
    } catch (error) {
      console.error('Error fetching cities:', error)
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Popover onOpenChange={(open) => open}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full flex items-center justify-between"
            >
              {value
                ? cities.find((city) => city.value === value)?.label
                : 'Selecione uma cidade...'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
            <Command>
              <CommandInput
                placeholder="Selecione uma cidade..."
                onValueChange={setSearch}
              />
              <CommandEmpty>Nenhuma cidade foi encontrada.</CommandEmpty>
              {cities && cities.length > 0 && (
                <CommandGroup>
                  {cities.map((city: FillProps) => (
                    <CommandItem
                      key={city.value}
                      value={city.value}
                      onSelect={() => {
                        onChange(city.value === value ? '' : city.value)
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === city.value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      {city.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </Command>
          </PopoverContent>
        </Popover>
      )}
    />
  )
}
