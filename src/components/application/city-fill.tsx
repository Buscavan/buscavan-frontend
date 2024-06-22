'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  Controller,
  Control,
  FieldValues,
  Path,
  UseFormSetValue,
} from 'react-hook-form'
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

interface State {
  id: number
  nome: string
  uf: string
}

interface City {
  id: number
  nome: string
  uf: number
  ibge: number
  lat_lon: string
  cod_tom: number
}

interface CityFillProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>
  setValue: UseFormSetValue<TFieldValues>
  name: Path<TFieldValues>
  cityKey: Path<TFieldValues>
  stateKey?: Path<TFieldValues>
  cityLabelKey?: Path<TFieldValues>
}

interface FillProps {
  value: string
  label: string
  stateId: number
}

export function CityFill<TFieldValues extends FieldValues>({
  control,
  setValue,
  name,
  cityKey,
  stateKey,
  cityLabelKey,
}: CityFillProps<TFieldValues>) {
  const [states, setStates] = useState<State[]>([])
  const [cityStateList, setCityStateList] = useState<FillProps[]>([])
  const [, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [statesLoaded, setStatesLoaded] = useState(false)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [selectedCityName, setSelectedCityName] = useState<string | null>(null)

  useEffect(() => {
    fetchStates()
  }, [])

  useEffect(() => {
    if (statesLoaded) {
      fetchCities()
    }
  }, [statesLoaded])

  const fetchStates = async () => {
    try {
      const response = await api.get(endpoints.listStates)
      const statesData: State[] = response.data

      if (!Array.isArray(statesData)) {
        console.error('Invalid states data structure:', statesData)
        return
      }

      setStates(statesData)
      setStatesLoaded(true)
    } catch (error) {
      console.error('Error fetching states:', error)
    }
  }

  const fetchCities = async (query = '') => {
    setLoading(true)
    try {
      const response = await api.get(
        `${endpoints.searchCity}${query ? '?query=' + query : ''}`,
      )
      const cities: City[] = response.data

      if (!Array.isArray(cities)) {
        console.error('Invalid cities data structure:', cities)
        setLoading(false)
        return
      }

      const formattedCities = cities.map((city) => {
        const state = states.find((state) => state.id === city.uf)
        return {
          value: city.id.toString(),
          label: `${city.nome}, ${state?.uf}`,
          stateId: city.uf,
        }
      })

      setCityStateList(formattedCities)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching cities:', error)
      setLoading(false)
    }
  }

  const debouncedFetchCities = useCallback(
    debounce((query: string) => {
      if (statesLoaded) {
        fetchCities(query)
      }
    }, 200),
    [statesLoaded, states],
  )

  const handleSearchChange = (value: string) => {
    setSearch(value)
    debouncedFetchCities(value)
  }

  const handleSelect = (
    cityState: FillProps,
    onChange: (value: string) => void,
  ) => {
    const newValue = cityState.value === selectedCity ? '' : cityState.value
    onChange(newValue)
    setSelectedCity(newValue)
    setSelectedCityName(newValue ? cityState.label : null)

    if (newValue) {
      setValue(cityKey, cityState.value as Path<TFieldValues>)
      setValue(stateKey, cityState.stateId as Path<TFieldValues>)
      setValue(cityLabelKey, cityState.label as Path<TFieldValues>)
    } else {
      setValue(cityKey, '' as Path<TFieldValues>)
      setValue(stateKey, '' as Path<TFieldValues>)
      setValue(cityLabelKey, '' as Path<TFieldValues>)
    }

    console.log('Selected State ID:', cityState.stateId)
    console.log('Selected City ID:', cityState.value)
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
                {selectedCityName || 'Selecione uma cidade...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Selecione uma cidade..."
                  onValueChange={handleSearchChange}
                />
                <CommandList>
                  <CommandEmpty>
                    {loading
                      ? 'Carregando...'
                      : 'Nenhuma cidade foi encontrada.'}
                  </CommandEmpty>
                  <CommandGroup>
                    {cityStateList.length > 0 && (
                      <>
                        {cityStateList.map((item) => (
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
