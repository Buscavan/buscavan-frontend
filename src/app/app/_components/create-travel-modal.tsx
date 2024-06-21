import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CirclePlus, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import { DatePicker } from '@/components/application/date-picker'
import ErrorLabel from '@/components/application/error-label'

const createTravelSchema = z.object({
  destiny: z.string({
    required_error: 'Por favor, informe a cidade de destino',
  }),
  type: z.string({ required_error: 'Por favor, selecione o tipo' }),
  value: z.coerce.number(),
  boardingPlace: z.string({
    required_error: 'Por favor, informe o local de embarque',
  }),
  landingPlace: z.string({
    required_error: 'Por favor, informe o local de desembarque',
  }),
  initialDate: z.date().refine((val) => val !== null, {
    message: 'Por favor, selecione a data de início',
  }),
  endDate: z.date().refine((val) => val !== null, {
    message: 'Por favor, selecione a data de término',
  }),
  vehicle: z.string(),
  plate: z.string(),
  passengers: z.coerce.number(),
  description: z.string().optional(),
})

type CreateTravelSubmit = z.infer<typeof createTravelSchema>

const getRandomFutureDate = (daysMin: number, daysMax: number) => {
  const today = new Date()
  const randomDays =
    Math.floor(Math.random() * (daysMax - daysMin + 1)) + daysMin
  today.setDate(today.getDate() + randomDays)
  return today
}

export function CreateTravelModal() {
  const { toast } = useToast()
  const today = new Date()

  const {
    control,
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTravelSubmit>({
    resolver: zodResolver(createTravelSchema),
    defaultValues: {
      destiny: '',
      initialDate: today,
      endDate: getRandomFutureDate(10, 20),
      description: '',
    },
  })

  async function onSubmit(data: CreateTravelSubmit) {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log(data)

    toast({
      title: 'Viagem Criada!',
      description: 'Verifique na tela anterior todas as suas viagens.',
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus className="size-4 mr-2" />
          Criar Viagem
        </Button>
      </DialogTrigger>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="max-w-5xl w-full">
          <DialogHeader>
            <DialogTitle>Nova Viagem</DialogTitle>
            <DialogDescription>
              Preencha os dados abaixo para criar uma nova viagem
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-4 gap-x-2 gap-y-4">
            {/* FOTO DA VIAGEM */}
            <div className="h-60 col-span-full bg-zinc-200" />

            <fieldset className="col-span-2 space-y-0.5">
              <Label>Destino</Label>
              <Input placeholder="Digite uma cidade" {...register('destiny')} />
              {errors.destiny && (
                <ErrorLabel>{errors.destiny.message}</ErrorLabel>
              )}
            </fieldset>

            <fieldset className="col-span-1 space-y-0.5">
              <Label>Tipo</Label>
              <Select onValueChange={(value) => setValue('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="roundTrip">Ida e Volta</SelectItem>
                  <SelectItem value="going">Ida</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <ErrorLabel>{errors.type.message}</ErrorLabel>}
            </fieldset>

            <fieldset className="col-span-1 space-y-0.5">
              <Label>Valor (R$)</Label>
              <Input placeholder="Digite um valor" {...register('value')} />
              {errors.value && <ErrorLabel>{errors.value.message}</ErrorLabel>}
            </fieldset>

            <fieldset className="col-span-1 space-y-0.5">
              <Label>Local Embarque Ida</Label>
              <Input
                placeholder="Digite o local de embarque"
                {...register('boardingPlace')}
              />
              {errors.boardingPlace && (
                <ErrorLabel>{errors.boardingPlace.message}</ErrorLabel>
              )}
            </fieldset>

            <fieldset className="col-span-1 space-y-0.5">
              <Label>Local Desembarque Volta</Label>
              <Input
                placeholder="Digite o local de desembarque"
                {...register('landingPlace')}
              />
              {errors.landingPlace && (
                <ErrorLabel>{errors.landingPlace.message}</ErrorLabel>
              )}
            </fieldset>

            <fieldset className="col-span-1 space-y-0.5">
              <Label>Data Ida</Label>
              <DatePicker
                control={control}
                name="initialDate"
                minDate={today.toISOString().substring(0, 10)}
              />
            </fieldset>

            <fieldset className="col-span-1 space-y-0.5">
              <Label>Data Volta</Label>
              <DatePicker
                control={control}
                name="endDate"
                minDate={watch('endDate')}
              />
            </fieldset>

            <div className="col-span-full grid grid-cols-3 gap-x-2">
              <fieldset className="col-span-1 space-y-0.5">
                <Label>Veículo</Label>
                <Input
                  placeholder="Digite uma cidade"
                  {...register('vehicle')}
                />
                {errors.vehicle && (
                  <ErrorLabel>{errors.vehicle.message}</ErrorLabel>
                )}
              </fieldset>

              <fieldset className="col-span-1 space-y-0.5">
                <Label>Placa</Label>
                <Input placeholder="Digite uma cidade" {...register('plate')} />
                {errors.plate && (
                  <ErrorLabel>{errors.plate.message}</ErrorLabel>
                )}
              </fieldset>

              <fieldset className="col-span-1 space-y-0.5">
                <Label>Passageiros</Label>
                <Input
                  placeholder="Digite uma cidade"
                  {...register('passengers')}
                />
                {errors.passengers && (
                  <ErrorLabel>{errors.passengers.message}</ErrorLabel>
                )}
              </fieldset>
            </div>

            <fieldset className="col-span-full space-y-0.5">
              <Label>Descrição</Label>
              <Textarea
                className="min-h-20 resize-none"
                {...register('description')}
              />
              {errors.description && (
                <ErrorLabel>{errors.description.message}</ErrorLabel>
              )}
            </fieldset>
          </div>

          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="size-4 mr-2 animate-spin" />}
              {isSubmitting ? 'Criando...' : 'Confirmar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
