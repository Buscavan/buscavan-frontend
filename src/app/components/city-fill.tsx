'use client'

import React from 'react'
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
import { CommandList } from 'cmdk'

const frameworks = [
  {
    value: 'LencoisPaulistaSP',
    label: 'Lençóis Paulista, SP',
  },
  {
    value: 'CamposdoJordaoSP',
    label: 'Campos do Jordão, SP',
  },
  {
    value: 'BauruSP',
    label: 'Bauru, SP',
  },
]

interface CityFillProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
}

export function CityFill<TFieldValues extends FieldValues>({
  control,
  name,
}: CityFillProps<TFieldValues>) {
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
                ? frameworks.find((framework) => framework.value === value)
                    ?.label
                : 'Selecione uma cidade...'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
            <Command>
              <CommandList>
                <CommandInput placeholder="Selecione uma cidade..." />
                <CommandEmpty>Nenhuma cidade foi encontrada.</CommandEmpty>
                {frameworks.length && (
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={() => {
                          onChange(
                            framework.value === value ? '' : framework.value,
                          )
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            value === framework.value
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    />
  )
}
