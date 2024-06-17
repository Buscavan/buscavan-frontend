'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ListFilter, Loader2, Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ErrorLabel from '../../../../components/application/error-label'
import { CityFill } from './city-fill'
import { DatePicker } from './date-picker'
import { useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'

const searchFormSchema = z.object({
  origin: z.string().min(1, 'Por favor, informe a cidade de origem'),
  destiny: z.string().min(1, 'Por favor, informe a cidade de destino'),
  initialDate: z
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

type SearchForm = z.infer<typeof searchFormSchema>

const getRandomFutureDate = (daysMin: number, daysMax: number) => {
  const today = new Date()
  const randomDays =
    Math.floor(Math.random() * (daysMax - daysMin + 1)) + daysMin
  today.setDate(today.getDate() + randomDays)
  return today
}

export function SearchForm() {
  const { toast } = useToast()
  const today = new Date()

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchForm>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      origin: '',
      destiny: '',
      initialDate: today,
      endDate: getRandomFutureDate(10, 20),
    },
  })

  useEffect(() => {
    const data = localStorage.getItem('searchData')

    if (data) {
      const parsedData = JSON.parse(data)
      setValue('destiny', parsedData.destiny)
    }
  }, [setValue])

  async function onSubmit(data: SearchForm) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log(data)

    toast({
      title: 'Busca confirmada',
      description: 'Separamos os melhores resultados para sua busca',
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-[1fr_auto_auto] gap-5"
    >
      <div className="grid grid-cols-4 gap-3">
        <fieldset className="flex flex-col gap-0.5">
          <CityFill control={control} name="origin" />
          {errors.origin && <ErrorLabel>{errors.origin.message}</ErrorLabel>}
        </fieldset>
        <fieldset className="flex flex-col gap-0.5">
          <CityFill control={control} name="destiny" />
          {errors.destiny && <ErrorLabel>{errors.destiny.message}</ErrorLabel>}
        </fieldset>
        <fieldset className="flex flex-col gap-0.5">
          <DatePicker
            control={control}
            name="initialDate"
            minDate={today.toISOString().substring(0, 10)}
          />
          {errors.initialDate && (
            <ErrorLabel>{errors.initialDate.message}</ErrorLabel>
          )}
        </fieldset>
        <fieldset className="flex flex-col gap-0.5">
          <DatePicker
            control={control}
            name="endDate"
            minDate={watch('endDate')}
          />
          {errors.endDate && <ErrorLabel>{errors.endDate.message}</ErrorLabel>}
        </fieldset>
      </div>

      <Separator orientation="vertical" className="h-7" />

      <div className="flex items-center gap-3">
        <Button variant="link" className="px-0">
          <ListFilter className="size-4 mr-2" />
          Filtros
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="size-4 mr-2 animate-spin" />
          ) : (
            <Search className="size-4 mr-2" />
          )}
          {isSubmitting ? 'Pesquisando...' : 'Confirmar pesquisa'}
        </Button>
      </div>
    </form>
  )
}
