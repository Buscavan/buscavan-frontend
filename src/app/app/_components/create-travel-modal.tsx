'use client'

import { useState } from 'react'
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
import { useForm, FormProvider } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { DatePicker } from '@/components/application/date-picker'
import { VehicleFill } from '@/components/application/vehicle-fill'
import { CityFill } from '@/components/application/city-fill'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'
import { api } from '@/api/axios'
import { endpoints } from '@/api/endpoints'

const getRandomFutureDate = (daysMin: number, daysMax: number) => {
  const today = new Date()
  const randomDays =
    Math.floor(Math.random() * (daysMax - daysMin + 1)) + daysMin
  today.setDate(today.getDate() + randomDays)
  return today
}

export function CreateTravelModal() {
  const { toast } = useToast()
  const { user } = useAuth()
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const today = new Date()

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      origin: '',
      destiny: '',
      initialDate: today,
      endDate: getRandomFutureDate(10, 20),
      description: '',
      tripImage: '',
    },
  })

  const {
    control,
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageSrc(reader.result as string)
        setImageFile(file)
        setValue('tripImage', reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function onSubmit(data) {
    console.log(data)
    const formData = new FormData()

    const tripData = {
      origemId: data.origin,
      destinoId: data.destiny,
      dataInicial: data.initialDate.toISOString(),
      dataFinal: data.endDate.toISOString(),
      valor: data.value,
      localEmbarqueIda: data.boardingPlace,
      localEmbarqueVolta: data.landingPlace,
      descricao: data.description,
      fotoDestinoUrl: data.tripImage,
      veiculoId: data.vehicle,
    }

    formData.append('dtoString', JSON.stringify(tripData))

    if (imageFile) {
      formData.append('file', imageFile)
    }

    try {
      await api.post(endpoints.createTrip, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      toast({
        title: 'Viagem Criada!',
        description: 'Verifique na tela anterior todas as suas viagens.',
      })
    } catch (error) {
      console.error('Error creating trip:', error)
      toast({
        title: 'Erro!',
        description: 'Houve um erro ao criar a viagem.',
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus className="size-4 mr-2" />
          Criar Viagem
        </Button>
      </DialogTrigger>
      <FormProvider {...methods}>
        <form>
          <DialogContent className="max-w-5xl w-full">
            <DialogHeader>
              <DialogTitle>Nova Viagem</DialogTitle>
              <DialogDescription>
                Preencha os dados abaixo para criar uma nova viagem
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-4 gap-x-2 gap-y-4">
              {/* FOTO DA VIAGEM */}
              <div className="h-60 col-span-full bg-zinc-200 relative">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt="Trip Image"
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    Nenhuma imagem selecionada
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              <fieldset className="col-span-2 space-y-0.5">
                <Label>Origem</Label>
                <CityFill
                  control={control}
                  setValue={setValue}
                  name="origin"
                  cityKey="origin"
                />
              </fieldset>

              <fieldset className="col-span-2 space-y-0.5">
                <Label>Destino</Label>
                <CityFill
                  control={control}
                  setValue={setValue}
                  name="destiny"
                  cityKey="destiny"
                />
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
              </fieldset>

              <fieldset className="col-span-1 space-y-0.5">
                <Label>Valor (R$)</Label>
                <Input placeholder="Digite um valor" {...register('value')} />
              </fieldset>

              <fieldset className="col-span-1 space-y-0.5">
                <Label>Local Embarque Ida</Label>
                <Input
                  placeholder="Digite o local de embarque"
                  {...register('boardingPlace')}
                />
              </fieldset>

              <fieldset className="col-span-1 space-y-0.5">
                <Label>Local Desembarque Volta</Label>
                <Input
                  placeholder="Digite o local de desembarque"
                  {...register('landingPlace')}
                />
              </fieldset>

              <div className="col-span-full grid grid-cols-2 gap-x-2">
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
              </div>

              <div className="col-span-full grid grid-cols-3 gap-x-2">
                <fieldset className="col-span-1 space-y-0.5">
                  <Label>Veículo</Label>
                  <VehicleFill
                    control={control}
                    name="vehicle"
                    setValue={setValue as any}
                    userId={user?.cpf ? user.cpf : ''}
                  />
                </fieldset>

                <fieldset className="col-span-1 space-y-0.5">
                  <Label>Placa</Label>
                  <Input
                    placeholder="Digite uma cidade"
                    {...register('plate')}
                    disabled
                  />
                </fieldset>

                <fieldset className="col-span-1 space-y-0.5">
                  <Label>Passageiros</Label>
                  <Input
                    placeholder="Digite uma cidade"
                    {...register('passengers')}
                    disabled
                  />
                </fieldset>
              </div>

              <fieldset className="col-span-full space-y-0.5">
                <Label>Descrição</Label>
                <Textarea
                  className="min-h-20 resize-none"
                  {...register('description')}
                />
              </fieldset>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button
                type="button"
                onClick={() => handleSubmit(onSubmit)()}
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <Loader2 className="size-4 mr-2 animate-spin" />
                )}
                {isSubmitting ? 'Criando...' : 'Confirmar'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </FormProvider>
    </Dialog>
  )
}
