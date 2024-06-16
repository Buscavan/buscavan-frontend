'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Section from '../../components/section'
import Card from '../../components/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { VehicleSelector } from './vehicle-selector'
import ErrorLabel from '../../_components/error-label'

const formSchema = z.object({
  placa: z
    .string({
      message: 'Valor deve ser texto',
      required_error: 'Placa é obrigatória',
    })
    .regex(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/, 'Placa inválida')
    .min(7, 'Placa deve ter 7 caracteres')
    .max(7, 'Placa deve ter 7 caracteres'),
  capacidade: z
    .number({
      message: 'Capacidade deve ser um número',
      required_error: 'Capacidade é obrigatória',
    })
    .min(2, 'A capacidade mínima é de 2 passageiros')
    .max(200, 'A capacidade máxima é de 200 passageiros')
    .nonnegative('Capacidade deve ser um número positivo'),
  marca: z.string().min(1, 'Marca é obrigatória'),
  modelo: z.string().min(1, 'Modelo é obrigatório'),
  ano: z
    .number({
      message: 'Ano deve ser um número',
      required_error: 'Ano é obrigatório',
    })
    .min(1886, 'Ano inválido')
    .max(new Date().getFullYear(), 'Ano inválido')
    .nonnegative('Ano deve ser um número positivo'),
  placeholder: z.string().min(1, 'Campo obrigatório'),
})

type FormData = z.infer<typeof formSchema>

export default function FormSettings() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })
  const { toast } = useToast()
  const [placaValue, setPlacaValue] = useState('')

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(data)

    toast({
      title: 'Formulário enviado',
      description: 'As informações do veículo foram cadastradas com sucesso!',
    })
  }

  const handlePlacaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
    if (inputValue.length <= 7) {
      setPlacaValue(inputValue)
      setValue('placa', inputValue)
    }
  }

  return (
    <>
      <Section>
        <Card className="shadow-2xl">
          <div className="w-full h-fit">
            <h3 className="text-lg text-zinc-950 font-semibold">
              Cadastre seu Veículo
            </h3>
            <p className="text-sm text-zinc-500">
              Preencha as informações abaixo
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="w-full min-h-fit flex flex-row py-4 pb-2 gap-3">
              <div className="flex-1">
                <Label>Placa</Label>
                <Input
                  type="text"
                  placeholder="Digite a placa"
                  value={placaValue}
                  onChange={handlePlacaChange}
                />
                {errors.placa && (
                  <ErrorLabel>{errors.placa.message}</ErrorLabel>
                )}
              </div>
              <div className="flex-1">
                <Label>Capacidade</Label>
                <Input
                  type="number"
                  placeholder="Quantidade de passageiros"
                  className="remove-arrow"
                  {...register('capacidade', { valueAsNumber: true })}
                />
                {errors.capacidade && (
                  <ErrorLabel>{errors.capacidade.message}</ErrorLabel>
                )}
              </div>
            </div>
            <div className="w-full min-h-fit flex flex-row py-4 pb-2 gap-3">
              <VehicleSelector />
            </div>
            <div className="flex w-full justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </Button>
            </div>
          </form>
        </Card>
      </Section>
    </>
  )
}
