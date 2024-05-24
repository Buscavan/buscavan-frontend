'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { CityFill } from './city-fill'
import { DatePicker } from './date-picker'

const searchFormSchema = z.object({
  origem: z.string().min(1, 'Por favor, informe a cidade de origem'),
  destino: z.string().min(1, 'Por favor, informe a cidade de destino'),
  startDate: z
    .date()
    .nullable()
    .refine((val) => val !== null, {
      message: 'Por favor, selecione a data de início',
    }),
  endDate: z
    .date()
    .nullable()
    .refine((val) => val !== null, {
      message: 'Por favor, selecione a data de término',
    }),
})

const getRandomFutureDate = (daysMin: number, daysMax: number) => {
  const today = new Date()
  const randomDays =
    Math.floor(Math.random() * (daysMax - daysMin + 1)) + daysMin
  today.setDate(today.getDate() + randomDays)
  return today
}

export function SearchForm() {
  const today = new Date()

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      startDate: today,
      endDate: getRandomFutureDate(10, 20),
      origem: '',
      destino: '',
    },
  })

  const { toast } = useToast()

  async function onSubmit(data: z.infer<typeof searchFormSchema>) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log(data)

    toast({
      title: 'Busca confirmada',
      description: 'Separamos os melhores resultados para sua busca',
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full space-y-4">
      <div className="w-full">
        <h1 className="text-xl font-semibold text-zinc-950">Busque por Aqui</h1>
        <p className="text-sm text-zinc-500">Preencha os campos abaixo</p>
      </div>

      <div className="flex space-x-4">
        <fieldset className="space-y-0.5 flex-1">
          <Label htmlFor="origem">Origem</Label>
          <CityFill control={control} name="origem" />
          {errors.origem && (
            <p className="text-sm text-red-500">{errors.origem.message}</p>
          )}
        </fieldset>
        <fieldset className="space-y-0.5 flex-1">
          <Label htmlFor="destino">Destino</Label>
          <CityFill control={control} name="destino" />
          {errors.destino && (
            <p className="text-sm text-red-500">{errors.destino.message}</p>
          )}
        </fieldset>
      </div>

      <div className="flex space-x-4">
        <fieldset className="space-y-0.5 flex-1">
          <Label htmlFor="startDate">De</Label>
          <DatePicker
            control={control}
            name="startDate"
            minDate={today.toISOString().substring(0, 10)}
          />
          {errors.startDate && (
            <p className="text-sm text-red-500">{errors.startDate.message}</p>
          )}
        </fieldset>

        <fieldset className="space-y-0.5 flex-1">
          <Label htmlFor="endDate">Até</Label>
          <DatePicker
            control={control}
            name="endDate"
            minDate={watch('startDate')}
          />
          {errors.endDate && (
            <p className="text-sm text-red-500">{errors.endDate.message}</p>
          )}
        </fieldset>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 mr-2 animate-spin" />
            Confirmar Busca...
          </>
        ) : (
          'Confirmar Busca'
        )}
      </Button>
    </form>
  )
}
