'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import {
  registerFormSchema,
  RegisterFormSchema,
} from '@/schemas/register-form-schema'
import { CPFInput } from '@/components/application/cpf-input'
import ErrorLabel from '@/components/application/error-label'

export function RegisterForm() {
  const { register: registerAuth } = useAuth()
  const [ocult, setOcult] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: RegisterFormSchema) => {
    data.role = 'PASSANGER'
    await registerAuth(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <fieldset className="space-y-0.5">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" placeholder="Digite seu nome" {...register('name')} />
        {errors.name && <ErrorLabel>{errors.name?.message}</ErrorLabel>}
      </fieldset>

      <fieldset className="space-y-0.5">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          placeholder="nome@exemplo.com"
          {...register('email')}
        />
        {errors.email && <ErrorLabel>{errors.email?.message}</ErrorLabel>}
      </fieldset>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0">
        <fieldset className="space-y-0.5">
          <CPFInput
            name="cpf"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          />
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
            <ErrorLabel>{errors.password?.message}</ErrorLabel>
          )}
        </fieldset>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="size-4 mr-2 animate-spin" />}
        {isSubmitting ? 'Entrando...' : 'Cadastrar-se na Plataforma'}
      </Button>
    </form>
  )
}
