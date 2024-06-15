'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, ChangeEvent, useEffect } from 'react'
import {
  useForm,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

const registerFormSchema = z.object({
  name: z
    .string({ required_error: 'Por favor, informe seu nome' })
    .min(3, 'Mínimo 3 caracteres'),
  cpf: z
    .string({ required_error: 'Por favor, informe seu CPF' })
    .min(14, 'CPF inválido'),
  email: z
    .string({ required_error: 'Por favor, informe seu e-mail' })
    .email('Por favor, informe um e-mail válido'),
  password: z
    .string({ required_error: 'Por favor, informe sua senha' })
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

type RegisterFormSchema = z.infer<typeof registerFormSchema>

function formatCPF(value: string): string {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

interface CPFInputProps {
  register: UseFormRegister<RegisterFormSchema>
  name: keyof RegisterFormSchema
  errors: FieldErrors<RegisterFormSchema>
  setValue: UseFormSetValue<RegisterFormSchema>
  getValues: UseFormGetValues<RegisterFormSchema>
}

function CPFInput({
  register,
  name,
  errors,
  setValue,
  getValues,
}: CPFInputProps) {
  const [value, setValueState] = useState<string>('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCPF(event.target.value)
    setValueState(formattedValue)
    setValue(name, formattedValue, { shouldValidate: true }) // Trigger validation
  }

  useEffect(() => {
    setValueState(getValues(name) || '')
  }, [getValues, name])

  return (
    <div>
      <Label htmlFor={name}>CPF</Label>
      <Input
        id={name}
        placeholder="000.000.000-00"
        value={value}
        {...register(name)}
        onChange={handleChange}
      />
      {errors[name] && (
        <p className="text-sm text-red-500">{errors[name]?.message}</p>
      )}
    </div>
  )
}

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
  })

  const onSubmit = async (data: RegisterFormSchema) => {
    await registerAuth(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <fieldset className="space-y-0.5">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" placeholder="Digite seu nome" {...register('name')} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name?.message}</p>
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
          <p className="text-sm text-red-500">{errors.email?.message}</p>
        )}
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
            <p className="text-sm text-red-500">{errors.password?.message}</p>
          )}
        </fieldset>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="size-4 mr-2 animate-spin" />}
        {isSubmitting ? 'Entrando...' : 'Cadastrar-se no Sistema'}
      </Button>
    </form>
  )
}
