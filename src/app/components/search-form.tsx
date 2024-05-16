'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'

const searchFormSchema = z.object({
  origem: z.string().min(1, 'Por favor, informe a cidade de origem'),
  destino: z.string().min(1, 'Por favor, informe a cidade de destino'),
  startDate: z.string().min(1, 'Por favor, selecione a data de início'),
  endDate: z.string().min(1, 'Por favor, selecione a data de término'),
})

export function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
  })

  async function onSubmit(data: z.infer<typeof searchFormSchema>) {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log(data)
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
