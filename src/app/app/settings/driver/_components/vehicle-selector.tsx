'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Check, ChevronsUpDown } from 'lucide-react'
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
import { cn } from '@/lib/utils'

interface Brand {
  codigo: string
  nome: string
}

interface Model {
  codigo: string
  nome: string
}

interface Year {
  codigo: string
  nome: string
}

interface VehicleType {
  value: string
  label: string
}

const vehicleTypes: VehicleType[] = [
  { value: 'carros', label: 'Carro' },
  { value: 'caminhoes', label: 'Ônibus' },
]

export function VehicleSelector() {
  const [vehicleType, setVehicleType] = useState<string>('carros')
  const [brands, setBrands] = useState<Brand[]>([])
  const [models, setModels] = useState<Model[]>([])
  const [years, setYears] = useState<Year[]>([])
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [selectedModel, setSelectedModel] = useState<string>('')
  const [selectedModelId, setSelectedModelId] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [typeOpen, setTypeOpen] = useState(false)
  const [brandOpen, setBrandOpen] = useState(false)
  const [modelOpen, setModelOpen] = useState(false)
  const [yearOpen, setYearOpen] = useState(false)

  useEffect(() => {
    const fetchBrands = async () => {
      const response = await axios.get(
        `https://parallelum.com.br/fipe/api/v1/${vehicleType}/marcas`,
      )
      setBrands(response.data)
    }
    fetchBrands()
  }, [vehicleType])

  useEffect(() => {
    if (selectedBrand) {
      const fetchModels = async () => {
        const response = await axios.get(
          `https://parallelum.com.br/fipe/api/v1/${vehicleType}/marcas/${selectedBrand}/modelos`,
        )
        setModels(response.data.modelos)
      }
      fetchModels()
    }
  }, [selectedBrand, vehicleType])

  useEffect(() => {
    if (selectedModelId) {
      const fetchYears = async () => {
        const response = await axios.get(
          `https://parallelum.com.br/fipe/api/v1/${vehicleType}/marcas/${selectedBrand}/modelos/${selectedModelId}/anos`,
        )
        setYears(response.data)
      }
      fetchYears()
    }
  }, [selectedModelId, selectedBrand, vehicleType])

  return (
    <div className="space-y-4 space-x-3">
      <Popover open={typeOpen} onOpenChange={setTypeOpen}>
        <PopoverTrigger asChild className="flex-1">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={typeOpen}
            className="min-w-[200px] flex-1 justify-between"
          >
            {vehicleTypes.find((type) => type.value === vehicleType)?.label}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[200px] flex-1 p-0">
          <Command>
            <CommandInput placeholder="Buscar tipo de veículo..." />
            <CommandList>
              <CommandEmpty>Nenhum tipo encontrado.</CommandEmpty>
              <CommandGroup>
                {vehicleTypes.map((type) => (
                  <CommandItem
                    key={type.value}
                    value={type.value}
                    onSelect={(currentValue) => {
                      setVehicleType(currentValue)
                      setSelectedBrand('')
                      setSelectedModel('')
                      setSelectedModelId('')
                      setSelectedYear('')
                      setTypeOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        vehicleType === type.value
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                    {type.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={brandOpen} onOpenChange={setBrandOpen}>
        <PopoverTrigger asChild className="flex-1">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={brandOpen}
            className="min-w-[200px] flex-1 justify-between"
            disabled={!brands.length}
          >
            {selectedBrand
              ? brands.find((brand) => brand.codigo === selectedBrand)?.nome
              : 'Selecione a marca...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[200px] flex-1 p-0">
          <Command>
            <CommandInput placeholder="Buscar marca..." />
            <CommandList>
              <CommandEmpty>Nenhuma marca encontrada.</CommandEmpty>
              <CommandGroup>
                {brands.map((brand) => (
                  <CommandItem
                    key={brand.codigo}
                    value={brand.codigo}
                    onSelect={(currentValue) => {
                      setSelectedBrand(
                        currentValue === selectedBrand ? '' : currentValue,
                      )
                      setSelectedModel('')
                      setSelectedModelId('')
                      setSelectedYear('')
                      setBrandOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedBrand === brand.codigo
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                    {brand.nome}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={modelOpen} onOpenChange={setModelOpen}>
        <PopoverTrigger asChild className="flex-1">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={modelOpen}
            className="min-w-[200px] flex-1 justify-between"
            disabled={!selectedBrand}
          >
            {selectedModel
              ? models.find((model) => model.codigo === selectedModelId)?.nome
              : 'Selecione o modelo...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[200px] flex-1 p-0">
          <Command>
            <CommandInput placeholder="Buscar modelo..." />
            <CommandList>
              <CommandEmpty>Nenhum modelo encontrado.</CommandEmpty>
              <CommandGroup>
                {models.map((model) => (
                  <CommandItem
                    key={model.codigo}
                    value={model.codigo}
                    onSelect={(currentValue) => {
                      setSelectedModel(
                        currentValue === selectedModelId ? '' : model.nome,
                      )
                      setSelectedModelId(
                        currentValue === selectedModelId ? '' : model.codigo,
                      )
                      setSelectedYear('')
                      setModelOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedModelId === model.codigo
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                    {model.nome}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={yearOpen} onOpenChange={setYearOpen}>
        <PopoverTrigger asChild className="flex-1">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={yearOpen}
            className="min-w-[200px] flex-1 justify-between"
            disabled={!selectedModelId}
          >
            {selectedYear
              ? years.find((year) => year.codigo === selectedYear)?.nome
              : 'Selecione o ano...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[200px] flex-1 p-0">
          <Command>
            <CommandInput placeholder="Buscar ano..." />
            <CommandList>
              <CommandEmpty>Nenhum ano encontrado.</CommandEmpty>
              <CommandGroup>
                {years.map((year) => (
                  <CommandItem
                    key={year.codigo}
                    value={year.codigo}
                    onSelect={(currentValue) => {
                      setSelectedYear(
                        currentValue === selectedYear ? '' : currentValue,
                      )
                      setYearOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedYear === year.codigo
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                    {year.nome}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
