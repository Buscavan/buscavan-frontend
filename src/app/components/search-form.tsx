'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

const searchFormSchema = z.object({
  origem: z.string().min(1, 'Por favor, informe a cidade de origem'),
  destino: z.string().min(1, 'Por favor, informe a cidade de destino'),
  startDate: z.string().min(1, 'Por favor, selecione a data de início'),
  endDate: z.string().min(1, 'Por favor, selecione a data de término'),
})

const getRandomFutureDate = (daysMin: number, daysMax: number) => {
  const today = new Date()
  const randomDays =
    Math.floor(Math.random() * (daysMax - daysMin + 1)) + daysMin
  today.setDate(today.getDate() + randomDays)
  return today.toISOString().substring(0, 10)
}

export function SearchForm() {
  const today = new Date().toISOString().substring(0, 10)
  const endDate = getRandomFutureDate(10, 20)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      startDate: today,
      endDate,
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
          <Input
            id="origem"
            placeholder="Lençóis Paulista, SP"
            {...register('origem')}
          />
          {errors.origem && (
            <p className="text-sm text-red-500">{errors.origem.message}</p>
          )}
        </fieldset>
        <fieldset className="space-y-0.5 flex-1">
          <Label htmlFor="destino">Destino</Label>
          <Input
            id="destino"
            placeholder="Campos do Jordão, SP"
            {...register('destino')}
          />
          {errors.destino && (
            <p className="text-sm text-red-500">{errors.destino.message}</p>
          )}
        </fieldset>
      </div>

      <div className="flex space-x-4">
        <fieldset className="space-y-0.5 flex-1">
          <Label htmlFor="startDate">De</Label>
          <Input
            id="startDate"
            type="date"
            className="text-zinc-500"
            min={today}
            defaultValue={watch('startDate')}
            {...register('startDate')}
          />
          {errors.startDate && (
            <p className="text-sm text-red-500">{errors.startDate.message}</p>
          )}
        </fieldset>

        <fieldset className="space-y-0.5 flex-1">
          <Label htmlFor="endDate">Até</Label>
          <Input
            id="endDate"
            type="date"
            className="text-zinc-500"
            min={watch('startDate')}
            defaultValue={watch('endDate')}
            {...register('endDate')}
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
