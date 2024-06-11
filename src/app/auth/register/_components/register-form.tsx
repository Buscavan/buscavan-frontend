'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

const registerFormSchema = z.object({
  name: z
    .string({ required_error: 'Por favor, informe seu nome' })
    .min(3, 'Mínimo 3 caracteres'),
  cpf: z.string({ required_error: 'Por favor, informe seu CPF' }),
  // phone: z.string({ required_error: 'Por favor, informe seu telefone' }),
  email: z.string({ required_error: 'Por favor, informe seu e-mail' }).email(),
  password: z
    .string({ required_error: 'Por favor, informe sua senha' })
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
  // address: z.string({ required_error: 'Por favor, informe seu endereço' }),
})

export function RegisterForm() {
  const { register: registerAuth } = useAuth()
  const [ocult, setOcult] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  })

  async function onSubmit(data: z.infer<typeof registerFormSchema>) {
    await registerAuth(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <fieldset className="space-y-0.5">
        <Label htmlFor="name">Nome</Label>

        <Input id="name" placeholder="Digite seu nome" {...register('name')} />

        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </fieldset>

      <fieldset className="space-y-0.5">
        <Label htmlFor="email">E-mail</Label>

        <Input
          id="email"
          placeholder="nome@exemplo.com"
          {...register('email')}
        />

        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </fieldset>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0">
        <fieldset className="space-y-0.5">
          <Label htmlFor="cpf">CPF</Label>

          <Input id="cpf" placeholder="000.000.000-00" {...register('cpf')} />

          {errors.cpf && (
            <p className="text-sm text-red-500">{errors.cpf.message}</p>
          )}
        </fieldset>

        <fieldset className="space-y-0.5">
          <Label htmlFor="password">Senha</Label>

          <div className="relative">
            <Input
              id="password"
              type={ocult ? 'text' : 'password'}
              placeholder="Digite sua senha"
              className="pr-10"
              {...register('password')}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute top-0 right-0"
              onClick={() => setOcult(!ocult)}
            >
              {ocult ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </Button>
          </div>

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </fieldset>

        {/* <fieldset className="space-y-0.5">
          <Label htmlFor="phone">Celular</Label>

          <Input
            id="phone"
            placeholder="(00) 00000-0000"
            {...register('phone')}
          />

          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </fieldset> */}
      </div>

      {/* <fieldset className="space-y-0.5">
        <Label htmlFor="address">Endereço</Label>

        <Input
          id="address"
          placeholder="Rua das Vans, 190"
          {...register('address')}
        />

        {errors.address && (
          <p className="text-sm text-red-500">{errors.address.message}</p>
        )}
      </fieldset> */}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="size-4 mr-2 animate-spin" />}
        {isSubmitting ? 'Entrando...' : 'Cadastrar-se no Sistema'}
      </Button>
    </form>
  )
}
