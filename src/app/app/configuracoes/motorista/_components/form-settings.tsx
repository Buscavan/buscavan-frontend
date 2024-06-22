'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import ErrorLabel from '@/components/application/error-label'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import Image from 'next/image'
import { api } from '@/api/axios'
import { endpoints } from '@/api/endpoints'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dropzone } from '@/components/application/dropzone'
import { WebcamCapture } from '@/components/application/webcam-capture'

const formSchema = z.object({
  nomeMotorista: z.string().min(1, 'Nome do motorista é obrigatório'),
  veiculo: z.string().min(1, 'Veículo é obrigatório'),
  placa: z
    .string({
      message: 'Valor deve ser texto',
      required_error: 'Placa é obrigatória',
    })
    .regex(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/, 'Placa inválida')
    .min(7, 'Placa deve ter 7 caracteres')
    .max(7, 'Placa deve ter 7 caracteres'),
  modelo: z.string().min(1, 'Modelo é obrigatório'),
  capacidade: z
    .number({
      message: 'Capacidade deve ser um número',
      required_error: 'Capacidade é obrigatória',
    })
    .min(2, 'A capacidade mínima é de 2 passageiros')
    .max(200, 'A capacidade máxima é de 200 passageiros')
    .nonnegative('Capacidade deve ser um número positivo'),
})

type FormData = z.infer<typeof formSchema>

export default function FormSettings() {
  const { toast } = useToast()
  const [placaValue, setPlacaValue] = useState('')
  const [vehicleImage, setVehicleImage] = useState<File | string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      nomeMotorista: '',
      veiculo: '',
      placa: '',
      modelo: '',
      capacidade: 0,
    },
  })

  async function onSubmit(data: FormData) {
    try {
      const formData = new FormData()
      const jsonData = JSON.stringify(data)
      formData.append('dtoString', jsonData)
      if (vehicleImage) {
        if (typeof vehicleImage === 'string') {
          const response = await fetch(vehicleImage)
          const blob = await response.blob()
          formData.append(
            'file',
            new File([blob], 'vehicle.jpg', { type: 'image/jpeg' }),
          )
        } else {
          formData.append('file', vehicleImage)
        }
      }

      const response = await api.post(endpoints.registerVehicle, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response) {
        toast({
          title: 'Veículo cadastrado!',
          description:
            'As informações do veículo foram cadastradas com sucesso.',
        })
      } else {
        throw new Error('Failed to register vehicle')
      }
    } catch (err) {
      toast({
        title: 'Algo deu errado!',
        description: 'Verifique os dados e tente novamente.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Cadastre seu(s) veículo(s)</CardTitle>
          <CardDescription>
            Insira as informações abaixo atentamente e comece a fazer viagens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-[10rem_1fr] gap-3">
            <div className="flex items-center justify-center relative">
              <div className="space-y-0.5 gap-4 flex items-center justify-center flex-col w-full h-full">
                <Image
                  src={'/van-placeholder2.png'}
                  alt="Imagem do Veículo"
                  width={160}
                  height={160}
                  className="w-32 h-20 aspect-square bg-zinc-700 rounded-md"
                />
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant={'secondary'} type="button">
                      Alterar imagem
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Alterar Imagem</DialogTitle>
                      <DialogDescription>
                        Arraste e solte uma imagem ou clique para selecionar um
                        arquivo.
                      </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="upload" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="upload">Upload</TabsTrigger>
                        <TabsTrigger value="camera">Câmera</TabsTrigger>
                      </TabsList>
                      <TabsContent value="upload">
                        <Dropzone
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          onChange={(files: any) => {
                            setVehicleImage(files[0])
                            setIsDialogOpen(false)
                          }}
                          onClose={() => {}}
                        />
                      </TabsContent>
                      <TabsContent value="camera">
                        <WebcamCapture
                          onSave={(image) => {
                            setVehicleImage(image)
                            setIsDialogOpen(false)
                          }}
                          onRemove={() => setVehicleImage(null)}
                          onClose={() => {}}
                        />
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <fieldset className="flex-1 space-y-0.5">
                <Label>Nome do Motorista</Label>
                <Input
                  type="text"
                  placeholder="Digite o nome do motorista"
                  {...register('nomeMotorista')}
                />
                {errors.nomeMotorista && (
                  <ErrorLabel>{errors.nomeMotorista.message}</ErrorLabel>
                )}
              </fieldset>
              <div className="flex-1 flex gap-2">
                <fieldset className="flex-1 space-y-0.5">
                  <Label>Veículo</Label>
                  <Input
                    type="text"
                    placeholder="Digite o veículo"
                    {...register('veiculo')}
                  />
                  {errors.veiculo && (
                    <ErrorLabel>{errors.veiculo.message}</ErrorLabel>
                  )}
                </fieldset>
                <fieldset className="flex-1 space-y-0.5">
                  <Label>Placa</Label>
                  <Input
                    type="text"
                    placeholder="Digite a placa"
                    value={placaValue}
                    onChange={(event) => {
                      const inputValue = event.target.value
                        .toUpperCase()
                        .replace(/[^A-Z0-9]/g, '')
                      if (inputValue.length <= 7) {
                        setPlacaValue(inputValue)
                        setValue('placa', inputValue)
                      }
                    }}
                  />
                  {errors.placa && (
                    <ErrorLabel>{errors.placa.message}</ErrorLabel>
                  )}
                </fieldset>
                <fieldset className="flex-1 space-y-0.5">
                  <Label>Modelo</Label>
                  <Input
                    type="text"
                    placeholder="Digite o modelo"
                    {...register('modelo')}
                  />
                  {errors.modelo && (
                    <ErrorLabel>{errors.modelo.message}</ErrorLabel>
                  )}
                </fieldset>
                <fieldset className="flex-1 space-y-0.5">
                  <Label>Capacidade</Label>
                  <Input
                    type="number"
                    min={2}
                    max={200}
                    placeholder="Digite a capacidade"
                    {...register('capacidade', { valueAsNumber: true })}
                  />
                  {errors.capacidade && (
                    <ErrorLabel>{errors.capacidade.message}</ErrorLabel>
                  )}
                </fieldset>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar veículo'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
