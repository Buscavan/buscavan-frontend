'use client'

import { Control, Controller, ControllerRenderProps } from 'react-hook-form'
import * as React from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DatePickerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  minDate?: Date | string
  maxDate?: Date | string
}

export function DatePicker({
  control,
  name,
  minDate,
  maxDate,
}: DatePickerProps) {
  const parsedMinDate = minDate && new Date(minDate)
  const parsedMaxDate = maxDate && new Date(maxDate)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }: { field: ControllerRenderProps }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full text-left font-normal flex items-center justify-between',
                !field.value && 'text-muted-foreground',
              )}
            >
              {field.value ? (
                <span>
                  {format(field.value, "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </span>
              ) : (
                <span>Escolha uma data...</span>
              )}
              <CalendarIcon className="h-4 w-4 text-black/50 dark:text-white/50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={
                field.value < (minDate as string) ? minDate : field.value
              }
              fromDate={parsedMinDate as undefined}
              toDate={parsedMaxDate as undefined}
              onSelect={field.onChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )}
    />
  )
}
